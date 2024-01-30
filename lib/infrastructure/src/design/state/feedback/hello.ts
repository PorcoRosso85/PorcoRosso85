import { createMachine, assign } from 'xstate'
export const returnHelloMachine = createMachine(
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
