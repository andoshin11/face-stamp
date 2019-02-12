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

interface GetUserListResponse {
  ok: boolean
  members: {
    id: string
    name: string
    deleted: boolean
    real_name: string
    profile: {
      display_name: string
      display_name_normalized: string
      image_24: string
    }
    is_bot: boolean
  }[]
}

export class GetUserList implements APIRequest<GetUserListResponse> {
  response: GetUserListResponse
  path = '/users.list'
  method = HTTPMethod.GET
}
