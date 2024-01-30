import { describe, test, expect } from 'vitest'
import { createMachine, assign, createActor } from 'xstate'

const countMachine = createMachine(
  //   context: {
  //     count: 0,
  //   },
  //   on: {
  //     INC: {
  //       actions: assign({
  //         count: ({ context }) => context.count + 1,
  //       }),
  //     },
  //     DEC: {
  //       actions: assign({
  //         count: ({ context }) => context.count - 1,
  //       }),
  //     },
  //     SET: {
  //       actions: assign({
  //         count: ({ event }) => event.value,
  //       }),
  //     },
  //   },
  // })
  {
    context: {
      count: 1,
    },
    id: 'countMachine',
    on: {
      INC: {
        actions: {
          type: 'increment',
        },
      },
      DEC: {
        actions: {
          type: 'decrement',
        },
      },
      SET: {
        actions: {
          type: 'set',
        },
      },
    },
    types: {
      events: {} as { type: 'INC' } | { type: 'DEC' } | { type: 'SET' },
      context: {} as { count: number },
    },
  },
  {
    actions: {
      increment: assign({
        count: ({ context }) => context.count + 1,
      }),
      decrement: assign({
        count: ({ context }) => context.count - 1,
      }),
      set: assign({
        count: () => 10,
      }),
    },
    actors: {},
    guards: {},
    delays: {},
  },
)

export { countMachine }

describe('count', () => {
  test('should increment', async () => {
    const countActor = createActor(countMachine).start()
    setTimeout(() => {
      countActor.send({ type: 'INC' })
    }, 1)

    await new Promise<void>((resolve) => {
      countActor.subscribe((state) => {
        console.debug(state.context.count)
        expect(state.context.count).toBe(2)
        resolve()
      })
    })
  })

  test('should increment, then gotten with snapshot', async () => {
    const countActor = createActor(countMachine).start()
    // console.debug(countActor.getSnapshot())
    expect(countActor.getSnapshot().context.count).toBe(1)
  })

  test('should increment, then gotten with snapshot', async () => {
    const countActor = createActor(countMachine).start()
    countActor.send({ type: 'INC' })
    // console.debug(countActor.getSnapshot())
    expect(countActor.getSnapshot().context.count).toBe(2)
  })

  test('should decrement', async () => {
    const countActor = createActor(countMachine).start()
    setTimeout(() => {
      countActor.send({ type: 'DEC' })
    }, 1)

    await new Promise<void>((resolve) => {
      countActor.subscribe((state) => {
        expect(state.context.count).toBe(0)
        resolve()
      })
    })
  })

  test('should set', async () => {
    const countActor = createActor(countMachine).start()
    setTimeout(() => {
      countActor.send({ type: 'SET', value: 10 })
    }, 1)

    await new Promise<void>((resolve) => {
      countActor.subscribe((state) => {
        expect(state.context.count).toBe(10)
        resolve()
      })
    })
  })
})
