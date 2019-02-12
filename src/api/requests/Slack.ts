import { APIRequest } from '../APIRequest'
import { HTTPMethod } from '../APIClient'

interface GetEmojiListResponse {
  ok: boolean
  emoji: {
    [key: string]: string
  }
}

export class GetEmojiList implements APIRequest<GetEmojiListResponse> {
  response: GetEmojiListResponse
  path = '/emoji.list'
  method = HTTPMethod.GET
}
