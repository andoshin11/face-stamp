import * as emojme from 'emojme'
import * as dotenv from 'dotenv'
import { APIClient } from './api/APIClient'
import { GetEmojiList, GetUserList } from './api/requests/Slack'

dotenv.config()

const main = async () => {
  const client = new APIClient()

  // Get Emoji List
  const emojiRes = await client.request(new GetEmojiList())
  const emojiList = emojiRes.emoji
  console.log(Object.keys(emojiList))

  // Get User List
  const userRes = await client.request(new GetUserList())
  const userList = userRes.members.filter(user => !user.is_bot)

  // Filter Out registered emoji
  const unregistered = userList.filter(user => !emojiList[user.name])

  console.log(unregistered.map(user => user.profile.image_24))
  console.log(unregistered.map(user => user.name))
  try {
    const response = await emojme.add(
      [process.env.SLACK_DOMAIN!],
      [process.env.SLACK_USER_TOKEN!],
      {
        src: unregistered.map(user => user.profile.image_24),
        name: unregistered.map(user => user.name),
        bustCache: false,
        avoidCollisions: true,
        output: true
      }
    )
    console.log('response')
    console.log(JSON.stringify(response))
  } catch (e) {
    console.log('error')
    console.log(e)
  }
}

main()
