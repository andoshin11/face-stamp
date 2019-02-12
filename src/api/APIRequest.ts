import { HTTPMethod } from './APIClient'

export interface APIRequest<R> {
  response: R
  path: string
  method: HTTPMethod
  params?: any
  baseURL?: string
  parse?: (data: any) => R
}
