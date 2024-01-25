import { createMachine, fromTransition, fromPromise } from 'xstate'

export const machine = createMachine(
  {
    id: '/auth/login',
    initial: 'verifyJwt',
    states: {
      '401': {
        exit: {
          type: 'Result',
        },
        type: 'final',
      },
      '500': {
        entry: {
          type: 'Result',
        },
        type: 'final',
      },
      verifyJwt: {
        invoke: {
          input: {},
          src: 'verifyJwt',
          onDone: [
            {
              target: 'hasLogined',
            },
          ],
          onError: [
            {
              target: '-- name: GetUser :one',
            },
          ],
        },
      },
      hasLogined: {
        entry: {
          type: 'Result',
        },
        type: 'final',
      },
      '-- name: GetUser :one': {
        invoke: {
          src: 'getUser',
          input: {},
          onDone: [
            {
              target: 'checkIsUserOrNot',
            },
          ],
          onError: [
            {
              target: '500',
            },
          ],
        },
      },
      checkIsUserOrNot: {
        invoke: {
          input: {},
          src: 'checkIsUserOrNot',
          onDone: [
            {
              target: 'isUser',
            },
          ],
          onError: [
            {
              target: 'isNotUser',
            },
          ],
        },
      },
      isUser: {
        always: {
          target: 'signJwt',
        },
      },
      isNotUser: {
        always: {
          target: '401',
        },
      },
      signJwt: {
        invoke: {
          input: {},
          src: 'signJwt',
          onDone: [
            {
              target: 'sendJwtToClient',
            },
          ],
          onError: [
            {
              target: 'isNotAuthenticated',
            },
          ],
        },
      },
      sendJwtToClient: {
        invoke: {
          input: {},
          src: 'sentJwtToClient',
          onDone: [
            {
              target: 'hasLogined',
            },
          ],
          onError: [
            {
              target: 'isNotAuthenticated',
            },
          ],
        },
      },
      isNotAuthenticated: {
        always: {
          target: '401',
        },
      },
    },
    on: {
      loginRequest: {
        target: '.verifyJwt',
      },
    },
    types: { events: {} as { type: 'loginRequest' } | { type: '' } },
  },
  {
    actions: {
      Result: ({ context, event }) => {},
    },
    actors: {
      getUser: fromPromise({
        /* ... */
      }),
      sentJwtToClient: fromPromise({
        /* ... */
      }),
      verifyJwt: fromPromise({
        /* ... */
      }),
      checkIsUserOrNot: fromTransition(
        (state, event) => {
          switch (event.type) {
            case 'increment': {
              return { count: state.count + 1 }
            }
            default: {
              return state
            }
          }
        },
        { count: 0 },
      ),
      signJwt: fromPromise(async () => {
        // ...
      }),
    },
    guards: {},
    delays: {},
  },
)
