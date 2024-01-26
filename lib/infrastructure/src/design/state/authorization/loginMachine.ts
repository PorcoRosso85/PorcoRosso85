import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    context: {
      input: '',
    },
    id: '/auth/login',
    initial: 'requested',
    states: {
      '401': {
        exit: {
          type: 'Result',
        },
        type: 'final',
      },
      '429': {
        type: 'final',
      },
      '500': {
        entry: {
          type: 'Result',
        },
        type: 'final',
      },
      requested: {
        always: [
          {
            target: 'checkInput',
            guard: 'rateLimitation',
          },
          {
            target: '429',
          },
        ],
      },
      checkInput: {
        on: {
          checkInput: [
            {
              target: 'createSession',
              guard: 'isJwt',
            },
            {
              target: 'signJwt',
              guard: 'isNotJwt',
            },
            {
              target: '-- name: GetUser :one',
            },
          ],
        },
      },
      createSession: {
        always: [
          {
            target: 'isSession',
            guard: 'sessionCreated',
          },
          {
            target: '500',
          },
        ],
      },
      signJwt: {
        entry: {
          type: 'singJwt',
        },
        always: [
          {
            target: 'sendJwtToClient',
            guard: 'isJwt',
          },
          {
            target: '401',
          },
        ],
      },
      '-- name: GetUser :one': {
        entry: {
          type: 'getUser',
        },
        always: [
          {
            target: 'signJwt',
            guard: 'isUser',
          },
          {
            target: '401',
          },
        ],
      },
      isSession: {
        entry: {
          type: 'Result',
        },
        type: 'final',
      },
      sendJwtToClient: {
        always: [
          {
            target: 'createSession',
            guard: 'jwtHasBeenSent',
          },
          {
            target: '401',
          },
        ],
      },
    },
    types: {
      events: {} as { type: '' } | { type: 'checkInput' },
      context: {} as { input: string },
    },
  },
  {
    actions: {
      Result: ({ context, event }) => {},
      getUser: ({ context, event }) => {},
      singJwt: ({ context, event }) => {},
    },
    actors: {},
    guards: {
      rateLimitation: ({ context, event }, params) => {
        return false
      },
      isUser: ({ context, event }, params) => {
        return false
      },
      isJwt: ({ context, event }, params) => {
        return false
      },
      jwtHasBeenSent: ({ context, event }, params) => {
        return false
      },
      sessionCreated: ({ context, event }, params) => {
        return false
      },
      isNotJwt: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
