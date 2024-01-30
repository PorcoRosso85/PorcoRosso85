import { describe, test, expect } from 'vitest'
import { machine } from './loginMachine'
import { createActor } from 'xstate'

const guards = {
  isUser: ({ context, event, input }, params) => {
    const result = {
      userId: 'test',
      email: '',
    }
    return input.email === result.email ? true : false
  },
  isJwt: ({ context, event }, params) => {
    return false
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
}

describe('loginMachine', () => {
  test('should be defined', () => {
    expect(machine).toBeDefined()
  })

  test('should have a initial state', () => {
    const actor = createActor(machine).start()
    expect(actor.getSnapshot().value).toBe('requested')
  })
})
