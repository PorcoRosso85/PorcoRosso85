import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    context: {
      status: 'isNotSession',
    },
    id: '/auth/status',
    initial: 'checkSessionIs',
    states: {
      checkSessionIs: {
        invoke: {
          input: {},
          src: 'checkSessionIdIs',
        },
      },
      isSession: {
        exit: {
          type: 'updateContext',
        },
        type: 'final',
      },
      isNotSession: {
        exit: {
          type: 'updateContext',
        },
        type: 'final',
      },
    },
    types: { context: {} as { status: string } },
  },
  {
    actions: {
      updateContext: ({ context, event }) => {},
    },
    actors: {
      checkSessionIdIs: fromPromise({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
)
