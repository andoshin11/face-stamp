import * as emojme from 'emojme'
import * as dotenv from 'dotenv'
import { APIClient } from './api/APIClient'
import { GetEmojiList, GetUserList } from './api/requests/Slack'

dotenv.config()

const LIMIT = 30

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
    let compact = unregistered
    if (unregistered.length >= LIMIT) {
      console.log(`Only ${LIMIT} users can be added at one time`)
      compact = compact.slice(0, LIMIT)
    }
    console.log(`Registering ${compact.length} users...`)
    const response = await emojme.add(
      [process.env.SLACK_DOMAIN!],
      [process.env.SLACK_USER_TOKEN!],
      {
        src: compact.map(user => user.profile.image_72),
        name: compact.map(user => user.name.replace(/\./, '_')),
        bustCache: false,
        avoidCollisions: true,
        output: true
      }
    )
    console.log('Done')
    console.log(response[process.env.SLACK_DOMAIN!].emojiList.map(i => i.name).join('\n'))
  } catch (e) {
    console.log('error')
    console.log(e)
  }
}

main()
