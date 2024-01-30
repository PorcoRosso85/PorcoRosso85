import { createActor, createMachine } from 'xstate'
import { createModel } from '@xstate/test'
import { describe, test, expect } from 'vitest'

export const toggleMachine = createMachine(
  {
    id: 'toggle',
    initial: 'inactive',
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: 'active',
          },
        },
      },
      active: {
        on: {
          TOGGLE: {
            target: 'inactive',
          },
        },
      },
    },
    types: { events: {} as { type: 'TOGGLE' } },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
)

const toggleModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: () => {
      console.log('exec')
    },
  },
})

// describe('toggle machine', () => {
//   console.debug(toggleModel)
//   const testPlans = toggleModel.getSimplePathPlans()

//   // testPlans.forEach((plan) => {
//   for (const plan of testPlans) {
//     describe(plan.description, () => {
//       // plan.paths.forEach((path) => {
//       for (const path of plan.paths) {
//         test(path.description, () => {
//           // テストセットアップと実行
//           path.test({}) // ここでは簡単なオブジェクトを使用
//         })
//       }
//     })
//   }

//   test('should have full coverage', () => {
//     toggleModel.testCoverage()
//   })
// })

describe('toggle machine', () => {
  const toggleActor = createActor(toggleMachine)
  toggleActor.start()

  test('should initial state is inactive', () => {
    expect(toggleActor.getSnapshot().value).toBe('inactive')
  })

  test('toggled then, should be active', () => {
    console.debug(toggleActor.getSnapshot())
    toggleActor.send({ type: 'TOGGLE' })
    console.debug(toggleActor.getSnapshot())

    expect(toggleActor.getSnapshot().value).toBe('active')
  })
})
