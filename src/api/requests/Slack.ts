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
      image_48: string
      image_72: string
    }
    is_bot: boolean
    is_restricted: boolean
  }[]
}

export class GetUserList implements APIRequest<GetUserListResponse> {
  response: GetUserListResponse
  path = '/users.list'
  method = HTTPMethod.GET
}
