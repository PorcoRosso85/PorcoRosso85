import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    context: {
      status: '',
    },
    id: '/auth/status',
    initial: 'checkSessionIs',
    states: {
      checkSessionIs: {
        always: [
          {
            target: 'redirectLogin',
            guard: 'checkSessionIs',
          },
          {
            target: 'isNotSession',
          },
        ],
      },
      redirectLogin: {
        type: 'final',
      },
      isNotSession: {
        always: [
          {
            target: 'isJwt',
            guard: 'checkJwt',
          },
          {
            target: 'redirectLogin',
          },
        ],
      },
      isJwt: {
        type: 'final',
      },
    },
    types: { events: {} as { type: '' }, context: {} as { status: string } },
  },
  {
    actions: {},
    actors: {},
    guards: {
      checkSessionIs: ({ context, event }, params) => {
        return false
      },
      checkJwt: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
