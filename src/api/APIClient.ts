import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'
import { NetworkClient } from './NetworkClient'
import { APIRequest } from './APIRequest'
import { APIError } from './APIError'

dotenv.config()

export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT'
}

// APIClient is client class for xhr request
export class APIClient implements NetworkClient {
  baseURL: string = 'https://slack.com/api/'
  timeout: number = 15 * 1000

  request<U>(request: APIRequest<U>): Promise<U> {
    const isRead = request.method === HTTPMethod.GET

    return new Promise<U>((resolve, reject) => {
      axios
        .request({
          url: request.path,
          method: request.method,
          params: isRead && this.applyAPIKey(request.params),
          data: !isRead && request.params,
          withCredentials: false,
          timeout: this.timeout,
          baseURL: request.baseURL || this.baseURL,
          headers: this.createHeaders()
        })
        .then(data => {
          const response = request.parse
            ? request.parse(data)
            : this.parse<U>(data)
          resolve(response)
        })
        .catch(err => {
          const apiError = this.normalizeError(err)
          reject(apiError)
        })
    })
  }

  // Default parser
  private parse<U>(data: AxiosResponse): U {
    return data.data
  }

  // Convert axios error into APIError
  private normalizeError(error: any): APIError {
    return {
      status: error.response && error.response.status,
      message: error.message,
      raw: error
    }
  }

  // Add API Key to the params
  private applyAPIKey(params: any): any {
    return {
      ...params,
      token: process.env.SLACK_TOKEN
    }
  }

  // Create headers
  private createHeaders() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      xhrFields: true,
      withCredentials: true,
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + process.env.SLACK_TOKEN
    }
  }
}
