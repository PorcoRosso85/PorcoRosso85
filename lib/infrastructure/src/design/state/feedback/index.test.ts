/**
 * countアクターからのメッセージを受け取る
 */
import { assign, createActor, createMachine } from 'xstate'
import { countMachine } from '../count/index.test'
import { describe, test, expect } from 'vitest'

const returnHelloMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QCcwBcCuyB2AJMANgQPYB0AFoSQMQDaADALqKgAOxsAlmp8diyAAeiAIwA2AEykAzAA4A7ABYAnAFZpqiZLH0JAGhABPRLMWl50pauUjpt+fIC+zg9mIQ4A1Jhz4ixAXYuHj4BYQQAWjEDY0ixFxBvLDwqMkp-QI5uXn4kIURFfSMTKWUJEVlpaV1LCydHAyTfVNIAd2JkAghM4JywxAlVVVJZCRVZMTENRUUxMpiTEVIxJTUbWVl6ehFFEWdnIA */
    id: 'returnHello',
    initial: 'hello',
    states: {
      hello: {
        always: {
          target: 'world',
        },
      },
      world: {
        type: 'final',
      },
    },
    types: {},
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
)

const feedbackMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QDMyQEYEMDGBrAdDAC4DKRmRArrAMQQD2AdmPgJaMBu9uLxZF1ANoAGALqJQAB3qxWRVkwkgAHogDMADgCM+AEwBONQHYNGgCzCArGctHdAGhABPRNvwA2I2f3uNa4WZaavomAL6hjqgYOAR85FS0YABOSfRJ+JIANhTIaQC2hGCk8UJiStKy8opIKupuBsamFta2Ds6Iusb4ltpBZjYaRkaWQeGRaBBYePjImKyZlElgNABKAKIAKisAmiLiNRVyCoxKqgiewh7C7p1a+mZGwoOOLghapvhG7+76+rYalhuPnCERAjHoEDgSiikxi5RkR2qoDOAFp3C9EGj8MIcbi8XijGMQDCprEivwEvDKsdTogzG1XlphPpumozGo1FpdBYgl59ESSTF8LBKNhsHB4AcEVUTjUziZLu53vo7sJOsImUYMW8mfgbIY1DduQZvAKJqSZnMFksqYjZcjEAqPMrVerNdq7u49SqepZdMI7PoNAEQaEgA */
    context: {
      count: 0,
    },
    id: 'feedback',
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: {
            target: 'getStatus',
          },
        },
      },
      getStatus: {
        invoke: {
          input: {},
          src: 'returnHelloMachine',
          id: 'getStatus',
          onDone: [
            {
              target: 'success',
              actions: {
                type: 'inline:feedback.getStatus#done.invoke.getStatus[-1]#transition[0]',
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
      failure: {
        on: {
          RETRY: {
            target: 'getStatus',
          },
        },
      },
    },
    types: {
      events: {} as { type: 'RETRY' | 'START' },
      context: {} as { count: number },
    },
  },
  {
    actions: {
      'inline:feedback.getStatus#done.invoke.getStatus[-1]#transition[0]': assign({
        count: ({ event }) => event.output,
      }),
    },
    actors: {
      returnHelloMachine: returnHelloMachine,
    },
    guards: {},
    delays: {},
  },
)

describe('feedbackMachine', () => {
  test('初期状態はgetStatus', () => {
    const actor = createActor(feedbackMachine).start()
    // console.debug(actor.getSnapshot())
    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().status).toBe('active')
  })

  // returnHelloMachineからのメッセージを受け取ったテストをしたい
  test('returnHelloMachineがonDoneを返したらsuccessに遷移する', () => {
    const actor = createActor(feedbackMachine).start()
    actor.send({ type: 'START' })
    console.debug(actor.getSnapshot())
    // returnHelloがfinalまで無事に到達したのでonDoneが発火する
    expect(actor.getSnapshot().value).toBe('success')
    expect(actor.getSnapshot().status).toBe('active')
  })
})
