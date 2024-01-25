import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    id: '/auth/logout',
    initial: 'verifyJwt',
    states: {
      verifyJwt: {
        entry: {
          type: 'verifyJwt',
        },
        on: {
          success: {
            target: 'deleteUserSessionInDurableObject',
          },
          failure: {
            target: 'alreadyNotAuthenticated',
          },
        },
      },
      deleteUserSessionInDurableObject: {
        entry: [
          {
            type: 'deleteSessionIdFromStore',
          },
          {
            type: 'updateHSTSAnd',
          },
          {
            type: 'execSessionTimeout',
          },
        ],
        always: {
          target: 'sendHeaderToDeleteCookieToClient',
        },
      },
      alreadyNotAuthenticated: {
        type: 'final',
      },
      sendHeaderToDeleteCookieToClient: {
        exit: {
          type: 'sendHeaderToDeleteCookieToClient',
        },
        type: 'final',
      },
    },
    on: {
      logoutRequest: {
        target: '.verifyJwt',
      },
    },
    types: {
      events: {} as
        | { type: 'logoutRequest' }
        | { type: '' }
        | { type: 'success' }
        | { type: 'failure' },
    },
  },
  {
    actions: {
      deleteSessionIdFromStore: ({ context, event }) => {},
      execSessionTimeout: ({ context, event }) => {},
      verifyJwt: ({ context, event }) => {},
      updateHSTSAnd: ({ context, event }) => {},
      sendHeaderToDeleteCookieToClient: ({ context, event }) => {},
    },
    actors: {},
    guards: {},
    delays: {},
  },
)
