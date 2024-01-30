import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHoCGBXALgC2QGwHsoBLAOwAIA3AJgDoAnMAR3Tk0gGIBtABgF1EoAA4FYxTMQKlBIAB6IAjADYAzLQCcAFhUB2TQFZq+nQoUAOFZoA0IAJ6JqKpRs3rTPfQuMKeSpQF9-GzQsXEISChoGZlZYdghuBQEkEBExCSkZeQRlNS1dAyMTc0sbexydHVpqahMtTQ8dfX0DQOCMHHwiMio6AGNsMD6AawApAHdMbn4ZNPFJaRTszQtaJVd1fMd1-RUVMsUeM2qVak0dal8FHT3NAKCQEM7wnqiBobHJxOThUXnMpaIFZqdabLZOAx7A4IbYuNw+TzeXz3dqhLoRXq0d4jCZTLjUH6pP4ZRagZarUGbbTbSH7OyIFRmHi0SqaM5KI48VzUMxtR4dMLdSL9RiodgAZTgYik00JcxJWUUZk8tFMZzMZzc6iUzWhPnUtF8+iZu3U+mRlT5T0FGLeoolUoW31mxIWipyyoUqoU6s1Cm1uvpMOu1R4ZouPMcLQUVoF6NedDEUFIuNlLvSbsBOXM+hZmrMlXUBdOSmhjiqOg1mm0ZlcXM0sbRL2FtCTKa+XCS6f+pLkihzedcBZ0RZu1FLQZU6jUmgUKmM898ez2jeeQsxAFoN+RSKgALZgBDkADiYEwAFVYGB6OQEFIwGmUvLM2TEGZ1izfOyp249NRoU4zgbJcRzqDUpw8Doq42gmtBbju+6HieZ6Xtet73s6T6ugCr4IO+mifko36bNcbLQp4XphucypTgoBjvio0Hxi2V6kBAuIACoEAAwngxBgKQeIzFhGY4X2OTmrms5GDwPLqJBRxlioXpOJsujKmGC5QQ81rMZirHsZMXG8fxgmYb8om9tkXgeLQ0nmnJClmGWTQsqcTjKNQPpHIEDykAQEBwDIunNr03YKlmG4TuUUVMaFUQNAo4UvuJ1xcrQGk8MidxKD4zlBrUXpEToHJmnWlitDpcbxXQbLqMlYnZJYRVEdRhi5WYbj6HqNx2WcWVmNcnjKtocXrlE5o8A1VkODwewaAW5yVMUTL-kG5gGoNnUGP61FFtQY22nQjAsGwkDTe6ZHrYNhoWAY2hKGaHheIdsHYp8mAXVmTjMk4JhMiVEbbUpBFTjy9ZGiVPqvS2fT2mAkqwNKvbPo1ig6OlmXZX4eV6j6Gg1Flhi1jw5gFjD+nEMmuJfbhPj+iy05NCO5xhmWRgaHOSgWFo3PGpWFNRPBu4Hkep4XleN53qQYC0+JOOqkR5oNMznjqABLRrCoc01A0Rzzmagt0MQsCI8jcvZJc82jktlSmKt0I3UoTSgU4zT5NpqJrkdrYCYZmDGXxAmfSJPbunOs52T6Ky1JYhhKbmNS5boNybFRjG+UAA */
    id: '/auth/login v2',
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
            target: 'checkJwt',
            guard: 'rateLimitation',
          },
          {
            target: '429',
          },
        ],
      },
      checkJwt: {
        always: [
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
            guard: 'signedJwt',
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
    types: { events: {} as { type: '' } },
  },
  {
    actions: {
      Result: ({ context, event }) => {},
      getUser: ({ context, event }) => {},
      singJwt: ({ context, event }) => {},
    },
    actors: {},
    guards: {
      isJwt: ({ context, event }, params) => {
        return false
      },
      isUser: ({ context, event }, params) => {
        return false
      },
      isNotJwt: ({ context, event }, params) => {
        return false
      },
      jwtHasBeenSent: ({ context, event }, params) => {
        return false
      },
      rateLimitation: ({ context, event }, params) => {
        return false
      },
      sessionCreated: ({ context, event }, params) => {
        return false
      },
      signedJwt: ({ context, event }, params) => {
        return false
      },
    },
    delays: {},
  },
)
