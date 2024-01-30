import { createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHoCGBXALgC2QGwHsoBLAOwAIA3AJgDoAnMAR3Tk0gGIBtABgF1EoAA4FYxTMQKlBIAB6IAjAHYetHgFYAbNSUAWAJw8AzEc1L91ADQgAnomqna+3QA59Cl9R7VNF3eoBfAOs0LFxCEgoaBmZWWHYIbgUBJBARMQkpGXkEZVUNbT1DEzMLaztcpSVaah0eBXq9F3UjQOCQUJx8IjIqOgBjbDB+gGsAKQB3TG5+GXTxSWlUnPUeF1oXTRc3JRcjJSMLBXLFNZqjWs1W300FBX0lIJCMLoje6MHh8amklOFRBZZZaIVbrTbbB57A5HE4IByaJyudyeby+aj+J4dF7hHpRAZDUaTaZcah-NIAzJLUArM7gnZQw7UY62RBGFyqKqHHj1dQOBQXTGdHGRPq0fqMVDsADKcDEUhmZPmlOyimc+loLTuSgULRcuiMrlhDXVPE06nU+l83mcLWogux3RFHwl0tli1+cwpixVuTVGqMWp1bP1hpZcOUNR4+kOh30vOj6l09rCjvedDEUFIRIVnoy3uBuXR6loDVuKj2mkasIc1V2tXUQcr1HUe2Tr1xoozWZ+XGSucBVLkiiLJdNeQrVbDMdoun5LVWs9ulqT7SFqbxtAAtJvyKRUABbMAIcgAcTAmAAqrAwPRyAgpGAc6klfnqYhDOqzd4GubnAdmRUpgIgYbhjr4pbNm2wppluO57oex5npe163vepCPr2ipekCb4IB+tBfkyGgWro-6wg2ChqH+cYuAo1CGJsUHrp2YCkBARIACoEAAwngxCscSszPthg45Dqey0EoWzqP+UlGJOFR8rQpgPLySg6EoalMW8G7XmxnE8XxAkesJeY4UOuQtkYknSbJVwKfYmmSRcOi6HUJimpoQTtKQBAQHAMhrjpfT9sqBabposKbsW+ixXF8XxUY2kdtEuj1KFr4Wco7hOLRax6ComhXJFYY6JRhQtjJ0kXF5q4OsFqX0Rl5k5K0dCuPyPDapoaVSeoRoHDODjuBcaUtAajx1SmDV0KsPDNaJ9gKG5M5aOiVRMqUJUVB46q0S4mnaF4aV6slTp0IwLBsJAC0+m5Rq0Woew6CY9EWlcZ0wZ8hJTLdBb7MWaz8vc2y6FcC7VgaykWNomwNppy2Tc800pQMLpgDKsByoOL4tYo5iUfoeUHaRnmmEadFOEynizj4axRvon26cQmZEn9uENCoGx0baRQqJp1bNk4c7ogaUbcnGTOituu4Hkep7nleN53g+7MWb4uj+nJDZvVJAGsomBHycoOyHLRK7I+2520MQsCY9jas5EyK3+NopHqQoW2wo9ZgGBadHspWHhS9EensVMXG8fxpCYI7ii9cpBV6M27LxpDxaXDy2zonG5reQEQA */
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
