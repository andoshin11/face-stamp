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
  ): Promise<any>
}
