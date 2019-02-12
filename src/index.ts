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
  console.log(`${Object.keys(emojiList).length} emojis found.`)

  // Get User List
  const userRes = await client.request(new GetUserList())
  const userList = userRes.members.filter(user => !user.is_bot && !user.deleted)

  // // Filter Out registered emoji
  const unregistered = userList.filter(
    user => !emojiList[user.name.replace(/\./, '_')]
  )

  console.log(
    `${unregistered.length} of ${userList.length} users are not registered.`
  )

  try {
    console.log(`Registering ${unregistered.length} users...`)
    const response = await emojme.add(
      [process.env.SLACK_DOMAIN!],
      [process.env.SLACK_USER_TOKEN!],
      {
        src: unregistered.map(user => user.profile.image_72),
        name: unregistered.map(user => user.name.replace(/\./, '_')),
        bustCache: false,
        avoidCollisions: true,
        output: true
      }
    )
    console.log('Done')
    console.log(JSON.stringify(response))
  } catch (e) {
    console.log('error')
    console.log(e)
  }
}

main()
