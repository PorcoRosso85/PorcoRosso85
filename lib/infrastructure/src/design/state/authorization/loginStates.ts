export const authLoginStates = {
  id: '/auth/login',
  initial: 'verifyJwt',
  states: {
    '401': {
      exit: {
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
            target: 'getUser',
          },
        ],
      },
    },
    hasLogined: {
      exit: {
        type: 'Result',
      },
      type: 'final',
    },
    getUser: {
      invoke: {
        input: {},
        src: 'getUser',
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
      on: {
        result: {
          target: 'hasLogined',
          actions: {
            type: 'Result',
          },
        },
      },
    },
    isNotAuthenticated: {
      always: {
        target: '401',
      },
      on: {
        loginRequest: {
          target: 'getUser',
        },
      },
    },
  },
  on: {
    loginRequest: {
      target: '.verifyJwt',
    },
  },
  types: { events: {} as { type: 'loginRequest' } | { type: 'result' } },
}
