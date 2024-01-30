import { describe, test, expect } from 'vitest'

let session = {}

const addSession = (store: any, sessionId: string, sessionData: any) => {
  return { ...store, [sessionId]: sessionData }
}

const updateSession = (store: any, sessionId: string, newSessionData: any) => {
  return { ...store, [sessionId]: { ...store[sessionId], ...newSessionData } }
}

const getSession = (store: any, sessionId: string) => {
  return store[sessionId]
}

const destroySession = (store: any, sessionId: string) => {
  const { [sessionId]: _, ...rest } = store
  return rest
}

describe('session', () => {
  const sessionId = crypto.randomUUID()
  session = addSession(session, sessionId, {
    userId: 'test',
    email: 'test@mail.com',
  })

  test('should be defined', () => {
    expect(session).toBeDefined()
  })

  test('session added exacly', () => {
    expect(session).toEqual({
      [sessionId]: {
        userId: 'test',
        email: 'test@mail.com',
      },
    })
  })

  test('session updated exacly', () => {
    session = updateSession(session, sessionId, { email: 'test2@mail.com' })
    console.debug('### session updated exacly', session)
    expect(session).toEqual({
      [sessionId]: {
        userId: 'test',
        email: 'test2@mail.com',
      },
    })
  })

  test('session destroyed exacly', () => {
    session = destroySession(session, sessionId)
    console.debug('### session destroyed exacly', session)
    expect(session).toEqual({})
  })
})
