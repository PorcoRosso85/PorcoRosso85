import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    context: {
      auth_status: '',
    },
    id: '/auth',
    initial: 'idle',
    states: {
      idle: {
        on: {
          '/*': {
            target: '/status',
          },
        },
      },
      '/status': {
        always: [
          {
            target: 'isSession',
            guard: 'authStatus',
          },
          {
            target: 'isNotSession',
          },
        ],
      },
      isSession: {
        after: {
          '500': {
            target: '#/auth.idle',
            actions: [],
          },
        },
        initial: '/logout',
        states: {
          '/logout': {
            after: {
              '500': {
                target: '#/auth.isSession.deleteCookieFollowingHeader',
                actions: [],
              },
            },
          },
          deleteCookieFollowingHeader: {},
        },
      },
      isNotSession: {
        after: {
          '500': {
            target: '#/auth.idle',
            actions: [],
          },
        },
        initial: '/login',
        states: {
          '/login': {
            after: {
              '500': {
                target: '#/auth.isNotSession.saveCookieWithHttponlyAndSecureFlag',
                actions: [],
              },
            },
          },
          saveCookieWithHttponlyAndSecureFlag: {},
        },
      },
    },
    types: {
      events: {} as { type: '' } | { type: '/*' },
      context: {} as { auth_status: string },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {
      authStatus: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
