import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    id: '/auth',
    states: {
      '/login': {
        invoke: {
          input: {},
          src: '/auth/login',
          onDone: [
            {
              target: 'saveCookieWithHttponlyAndSecureFlag',
            },
          ],
        },
      },
      saveCookieWithHttponlyAndSecureFlag: {},
      '/logout': {
        invoke: {
          input: {},
          src: '/auth/logout',
          onDone: [
            {
              target: 'deleteCookieFollowingHeader',
            },
          ],
        },
      },
      deleteCookieFollowingHeader: {},
      '/': {
        on: {
          loginRequest: {
            target: '/login',
          },
          logoutRequest: {
            target: '/logout',
          },
        },
      },
    },
    type: 'parallel',
    types: {
      events: {} as { type: 'loginRequest' } | { type: 'logoutRequest' },
    },
  },
  {
    actions: {},
    actors: {
      '/auth/login': fromPromise({
        /* ... */
      }),
      '/auth/logout': fromPromise({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
)
