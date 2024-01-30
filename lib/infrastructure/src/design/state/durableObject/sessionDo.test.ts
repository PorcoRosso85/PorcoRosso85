import { describe, test, expect } from 'vitest'
// import { DurableObject } from './do.test'
import * as session from './session.test'
import { unstable_dev, UnstableDevWorker } from 'wrangler'

interface CallbackFunction {
  (sessionStore: session.SessionStore): session.SessionStore
}

/**
 * このファイルは
 * DurableObjectクラスを委譲し
 * sessionデータを基底クラスに持たせる
 * ためのSessionDoクラスを定義します
 */
class SessionDo {
  state: DurableObjectState
  sessionStore: session.SessionStore = {
    sessionId: '',
    sessionData: {
      userId: '',
      email: '',
    },
  }

  constructor(state: DurableObjectState) {
    this.state = state
    /**
     * このコードは、blockConcurrencyWhileメソッドを使用して非同期の操作を行っています。このメソッドは、指定した非同期関数が完了するまで他の操作をブロックします。これにより、データの整合性を保つことができます。
非同期関数内では、まずthis.state.storage?.get<session.SessionStore>('sessionStore')を使用して、ストレージからsessionStoreというキーのデータを取得しています。この操作は非同期で行われ、Promiseが返されます。そのPromiseが解決されたとき、その結果がstoredに格納されます。
次に、stored || this.sessionStoreという式を使用して、storedがnullまたはundefinedである場合にはthis.sessionStoreを使用するようにしています。これにより、ストレージからデータが取得できなかった場合でも、this.sessionStoreの値が保持されます。
最後に、この結果をthis.sessionStoreに代入しています。これにより、this.sessionStoreは常に最新のデータを保持することが保証されます。
     */
    this.state.blockConcurrencyWhile(async () => {
      // [] getメソッドは出力にジェネリクス型使用、ただ保証はされない
      const stored = await this.state.storage?.get<session.SessionStore>('sessionStore')
      this.sessionStore = stored || this.sessionStore
    })
  }

  async update(callback: CallbackFunction) {
    const updatedSessionStore = await callback(this.sessionStore)
    this.sessionStore = updatedSessionStore
  }
}

/**
 * Class.update()を使用して
 * sessionデータを更新するためのコールバック関数
 */
const updateCallback: CallbackFunction = (sessionStore: session.SessionStore) => {}

describe('SessionDo', () => {
  let state: DurableObjectState = {}
  const sessionDo = new SessionDo(state)

  let session: session.SessionStore

  test('should be defined', () => {
    expect(sessionDo).toBeDefined()
  })

  test('should update', async () => {
    await sessionDo.update(updateCallback)
  })
})

// [] miniflareによるテストを待つ
// https://discord.com/channels/595317990191398933/891052295410835476/1176838864472637460
describe('DurableObject', () => {})
