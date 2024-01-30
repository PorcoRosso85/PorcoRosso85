import { type createActor, createMachine } from 'xstate'
import { describe, test, expect } from 'vitest'
import { match } from 'ts-pattern'

/**
 * jwtトークンは最初に生成し認証に使用するが
 * 都度認証するのは負荷が高いので
 * 認証済みのセッションIDを保存しておき
 * それを使って認証する
 * durable objectにセッションIDを保存する
 *
 * このマシンは
 * durable objectにセッションIDがあるかどうかを確認し
 * なければ認証を行う
 * 認証に成功したらセッションIDをdurable objectに保存する
 * 認証を行うにあたり
 * まずはユーザーの情報を取得する
 * 無事取得できたら
 * jwtトークンを生成し
 * クライアントに返す
 * トークンの設計内容は
 * 有効期限は1時間
 * トークンの中身は
 * ユーザーのID
 * ユーザーの名前
 * ユーザーのメールアドレス
 * ユーザーの権限
 * トークンの署名は
 * サーバーの秘密鍵で行う
 *
 * 返すと同時にdurable objectにセッションIDを保存する
 * セッションIDは
 * クライアントのcookieに保存する
 *
 */
export const authLoginMachine = createMachine(authLoginStates, {
  actions: {},
  actors: {},
  guards: {},
  delays: {},
})

const authLoginStates = {
  id: '/auth/login',
  initial: 'verifyJwt',
  states: {
    '401': {
      exit: {
        type: 'error',
      },
      type: 'final',
    },
    verifyJwt: {
      invoke: {
        input: {},
        src: 'verifyJwt',
      },
    },
    hasLogined: {
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
  types: { events: {} as { type: 'loginRequest' } },
} as const

type States = keyof (typeof authLoginStates)['states']
type Events = (typeof authStates.types)['events']['type']

const authMatch = (state: States, event: Events) =>
  match([state, event])
    .with(['isNotAuthenticated', 'loginRequest'], () => 'isNotUser')
    .with(['isNotUser', ''], () => 'isUser')
    .exhaustive()

const getUser = () => ''

describe('authMachine', () => {
  test('authMachine.config', () => {
    console.debug('### autoMachine.config', authMachine.config)
    console.debug('### autoMachine.config.states', authMachine.config.states)
    console.debug('### autoMachineActor.getSnapshot()', authMachineActor.getSnapshot())
    // expect(authMachine.initialState.value).toBe('isNotUser')
  })

  authActor.subscribe((snapshot) => console.debug('### snapshot', snapshot))
})
