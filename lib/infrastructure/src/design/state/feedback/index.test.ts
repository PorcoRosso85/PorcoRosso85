/**
 * countアクターからのメッセージを受け取る
 */
import { assign, createActor, createMachine } from 'xstate'
import { countMachine } from '../count/2.test'
import { returnHelloMachine } from './hello'
import { describe, test, expect } from 'vitest'

const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdAJYQA2YAxAMoAqAggErUDaADALqKgAOA9rIQBdCPAHacQAD0QBGAGwB2fAGYAHPIAsKgKyzd0liukAaEAE8Z82csMAmG+q0rD6luvkBfdydQYcBGAIAEmAkJDzkEKJgRCIAbjy40QHBoTysHEggvPxCouJSCLLq0vjqsvYAnBVaWjauNsZmMiws+BU2hixKNjVF8jae3mgQWHj4ySFh5GAATjM8M-hcJJgCyAsAtuNgQZNp7OLZgsJimQVyiqoa2rqy+oYm5giG+ArqFYaWSmV3FYMgPhGfnwyEwhBIAFcZhR6ABRaj0ACa6UOfGOeTOMgU1muOj0BkaT2kNkUWmkankWiU8g+Sjk0k8XhAIh4EDg4kBo1wqJyJ3yiAAtLJHoLZP9OcDiGQeejTqACuobCKENJLPgWJSWq47rIarVxcMudtdqkZbk5ZJEN0tKUNBVZFU7nZ7Mr9FZiVoWhU3T0imKmRKxrAIdhsHB4Jkjub+SrXK15GotA46QYKuolK6bBV8PJie9ajrcyoDb4xqDwVCwGa+ZiEIrldpSqok3UKiw3SwtIz3EA */
    context: {
      count: 0,
      greeting: '',
      countChild: 0,
    },
    id: 'feedback',
    initial: 'idle',
    states: {
      idle: {
        on: {
          HELLO: {
            target: 'getHello',
          },
          COUNT: {
            target: 'getCount',
          },
        },
      },
      getHello: {
        invoke: {
          input: {},
          src: 'returnHelloMachine',
          id: 'getHello',
          onDone: [
            {
              target: 'success',
              actions: {
                type: 'hello',
              },
            },
          ],
          onError: [
            {
              target: 'failure',
            },
          ],
        },
      },
      success: {},
      getCount: {
        invoke: {
          src: 'countMachine',
          id: 'count',
          onSnapshot: {
            actions: {
              type: 'updateCountFromCountMachine',
            },
          },
          onDone: {
            target: 'success',
          },
        },
      },
      failure: {
        on: {
          RETRY: {
            target: 'getHello',
          },
        },
      },
    },
    types: {
      events: {} as { type: 'RETRY' | 'HELLO' | 'COUNT' },
      context: {} as { count: number; greeting: string; countChild: number },
    },
  },
  {
    actions: {
      hello: assign({ greeting: () => 'hello' }),
      updateCountFromCountMachine: assign(({ context, event }) => {
        console.debug('### updateCountFromCountMachine.event.snapshot')
        console.debug(event.snapshot.context.count)
        context.countChild = event.snapshot.context.count
      }),
    },
    actors: {
      returnHelloMachine: returnHelloMachine,
      countMachine: countMachine,
    },
    guards: {},
    delays: {},
  },
)

describe('feedbackMachine', () => {
  test('初期状態はgetHello', () => {
    const actor = createActor(feedbackMachine).start()
    // console.debug("inital state actor.getSnapshot()")
    // console.debug(actor.getSnapshot())
    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().status).toBe('active')
  })

  test('returnHelloMachineがonDoneを返したらsuccessに遷移する', () => {
    const actor = createActor(feedbackMachine).start()
    actor.send({ type: 'HELLO' })
    // console.debug("hello event actor.getSnapshot()")
    // console.debug(actor.getSnapshot())
    // returnHelloがfinalまで無事に到達したのでonDoneが発火する
    expect(actor.getSnapshot().value).toBe('success')
    expect(actor.getSnapshot().status).toBe('active')
  })

  test('contextがhelloになっている', () => {
    const actor = createActor(feedbackMachine).start()
    actor.send({ type: 'HELLO' })
    // console.debug("hello event actor.getSnapshot()")
    // console.debug(actor.getSnapshot())
    expect(actor.getSnapshot().value).toBe('success')
    expect(actor.getSnapshot().context.greeting).toBe('hello')
    expect(actor.getSnapshot().status).toBe('active')
  })

  test('get context from countMachine', () => {
    const actor = createActor(feedbackMachine).start()
    actor.send({ type: 'COUNT' })
    console.debug('### count event actor.getSnapshot()')
    console.debug(actor.getSnapshot())
    // returnHelloがfinalまで無事に到達したのでonDoneが発火する
    expect(actor.getSnapshot().value).toBe('getCount')
    // feedbackMachineのcontext.count
    expect(actor.getSnapshot().context.count).toBe(0)
    // [] countMachineのcontext.countを取得したい
    expect(actor.getSnapshot().context.countChild).toBe(10)
    expect(actor.getSnapshot().status).toBe('active')
  })
})
