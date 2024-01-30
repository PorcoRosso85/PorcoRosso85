import { describe, test, expect } from 'vitest'
import { machine } from './loginMachine'
import { createActor } from 'xstate'

describe('loginMachine', () => {
  test('should be defined', () => {
    expect(machine).toBeDefined()
    const actor = createActor(machine).start()
    expect(actor).toBeDefined()
  })

  test('should have a initial state', () => {
    const actor = createActor(machine).start()
    expect(actor.getSnapshot().value).toBe('requested')
  })
})
