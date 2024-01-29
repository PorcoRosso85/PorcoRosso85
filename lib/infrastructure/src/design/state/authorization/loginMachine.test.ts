import { describe, test, expect } from 'vitest'
import { createActor, createMachine } from 'xstate'

export const machine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QHoCGBXALgC2QGwHsoBLAOwDoAnMAR3Tk0gGIBtABgF1FQAHA2YpmIFS3EAA9EARgDsbcmwCsANgBMygMwAWJVsWKNigDQgAnolUbl5AJxaAHDZmXZztcoC+Hk2iy5CJBTUdAzMLFJcSCB8AkIiYpIIsvJK7tq6+oYm5kkyMuSqqnI2qlK6hcr2Xj4YOPhEZOQAxthgTQDWAJKkPFhMqHgA7qimsOyRvPyCwqJRiYps9uT2lTI2jspaWqr2bFrZ0kq29pZsUpraNhqL1SC+dQGNLW1dPX0Dw6PhE9FTcbOgeaLZardY2TbbXb7MwWbTkZRg5xSSwaKQnLS3e7+BoUZ4dbq9TD9IYjMaqH4xabxOaIBZLFb2NYbLY7PYHBAaGRLRSWJxcxS7FSY2rYwLNaioRgAZTgAhErE4Ykp-wSFjOqnh9ik23U+jYqPs7LKNgUyhUhnOyO0Giq3juIvqYqaEulspmrAiSr+M1VCFU6s12oqeoN7NK+X9djYbBsUkUaPBnjtWMdjQEUFIAClBkTxl7Yj6aUlriarKpFFG8ooZNsw5zyFzTip40pwRphX5UxR01mcx6Kd7qYDpCXyGWKzoqzXVOyNFdyFopIYK-Z7FoazIOw8ceQALS7gAEpFQAFswAgDwBxMCYACqsDAlAPCBEYAVA4LQ4kiCcGlsbE0Mo1xLFZZ2UawtERZRtUWNdbRqTtHgofcj1Pc8rxve9H2fV9+3zKkAW-BBf3-QDFi0EDlHZeMpAUOwtTjTlXBkRQt1FNMwFICBs0wAAVAgAGE8GITjc0VKJlULYckk2axY1XexDCcM4shhP1UTHBEoRKGtFC0M02K7cgHy4nj+KEkTSFzT0JMHQjEnOfTbDRVclLkJdjDUopFAbDRThOPzUTULw7VIAgIDgMQUyQ-CVSLXcqLUhKFGjVK0rSzdkwdJCFzOWKpKItF9HIJcYPUPz-SkMMZFotQZGgtd9PLLVMoQ7cxW2Gx8q-RJDA1BxkXseM9H0ZwjRkP9tjnM0as0WT4PtRCdwWNhuvsix-R85QAK2Aw2EsGqjUcZY0Xq8EbB2nZDJy4J6FgRgIDW31azUtFaMWDRtBcHbDCTNr2NxVp8TeTAnqLKw5K1HYzR2pcNDrLQxx08MbCuHVrp3Z0wElMAZVgOVCMknrpCGnzSp0crCjOI1kVsUpVwMcCRtUGwMbFHseLB6SpA801Vx2GrGJsTyckKHzY2XbRdk+tEMSypaxRQ48zwva87wfJ8X1IMAuaIliljWTkhrXcD3FnPT4WuQo53c6s2caYhYDxgndcSKmtp2vQraY9ktXhFjoznCHGX0e3u047ic3M4TRNd6R13kHkaKkOxtrjGcvMMAp1CUeM-OUFjQ5CoA */
    context: {},
    meta: {
      name: 'login',
      version: '1.0.0',
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
      context: {} as {
        status: string
      },
      input: {} as {
        status: string
        email: string
      },
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
        const rateLimitation = 5
        return rateLimitation <= 10 ? true : false
      },
      isUser: ({ context, event, input }, params) => {
        const result = {
          userId: 'test',
          email: 'test@mail.com',
        }
        return input.email === result.email ? true : false
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
      isNotJwt: ({ context, event, input }, params) => {
        return input.status === 'isNotJwt' ? true : false
      },
    },
    delays: {},
  },
)

describe('loginMachine', () => {
  test('should be defined', () => {
    expect(machine).toBeDefined()
  })

  test('should have a initial state', () => {
    const actor = createActor(machine).start()
    expect(actor.getSnapshot().value).toBe('requested')
  })
})
