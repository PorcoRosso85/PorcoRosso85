import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    context: {
      status: 'isNotAuthenticated',
    },
    id: '/auth',
    initial: '/status',
    states: {
      '/status': {
        invoke: {
          input: {},
          src: '/auth/status',
          onDone: [
            {
              target: 'isSession',
            },
          ],
          onError: [
            {
              target: 'isNotSession',
            },
          ],
        },
      },
      isSession: {
        initial: '/logout',
        states: {
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
        },
      },
      isNotSession: {
        initial: '/login',
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
        },
      },
    },
    types: { events: {} as { type: '' }, context: {} as { status: string } },
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
      '/auth/status': fromPromise({
        /* ... */
      }),
    },
    guards: {},
    delays: {},
  },
)
