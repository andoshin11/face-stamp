import { APIClient } from './api/APIClient'
import { GetEmojiList } from './api/requests/Slack'

const main = async () => {
  const client = new APIClient()
  console.log('fetching')
  const response = await client.request(new GetEmojiList())
  console.log(Object.keys(response.emoji))
}

main()
