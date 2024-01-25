import { describe, test, expect } from 'vitest'

import { createActor, createMachine } from 'xstate'
import { createModel } from '@xstate/test'

import { machine } from './loginMachine'
import { authLoginStates } from './loginStates'

const result = ({ context, event }) => {
  console.debug('Result', { context, event })
  return 'result'
}

describe('auth/login', () => {
  test('should be defined', () => {
    expect(machine).toBeDefined()
  })

  const model = createModel(machine).withEvents({
    result: {
      exec: async () => {
        console.debug('Result')
      },
    },
  })

  const testPlans = model.getShortestPathPlans()
  for (const plan of testPlans) {
    describe(plan.description, () => {
      // plan.paths.forEach((path) => {
      for (const path of plan.paths) {
        test(path.description, async () => {
          await path.test({})
        })
      }
    })
  }
})
