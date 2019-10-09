declare module 'emojme' {
  function add(
    subdomains: string[],
    tokens: string[],
    addOptions: {
      src: string[]
      name: string[]
      bustCache: boolean
      avoidCollisions: boolean
      output: boolean
    }
  ): Promise<{ [organization: string]: {
    emojiList: Array<{
      is_alias: number
      url: string
      name: string
    }>
    errorList: any[]
    collisions: any[]
  }}>
}
