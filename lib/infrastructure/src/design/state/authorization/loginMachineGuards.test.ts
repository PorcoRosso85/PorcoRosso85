import { describe, test, expect } from 'vitest'

export const guards = {
  isUser: ({ context, event, input }, params) => {
    const result = {
      userId: 'test',
      email: '',
    }
    return input.email === result.email ? true : false
  },
  // [] hono Jwt Middleware, not required implementation
  isJwt: ({ context, event }, params) => {
    return 'Hono Return true/false'
  },
  isNotJwt: ({ context, event, input }, params) => {
    return input.status === 'isNotJwt' ? true : false
  },
  jwtHasBeenSent: ({ context, event }, params) => {
    return false
  },
  rateLimitation: ({ context, event }, params) => {
    const rateLimitation = 5
    return rateLimitation <= 10 ? true : false
  },
  sessionCreated: ({ context, event }, params) => {
    return false
  },
  createSession: ({ context, event }, params) => {},
}

describe('loginMachineGuards', () => {
  describe('isJwt', () => {
    test('should be defined', () => {
      expect(guards.isJwt).toBeDefined()
    })

    test('isJwt will check if the input is a jwt', () => {})
  })
})
