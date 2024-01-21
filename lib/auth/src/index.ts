/**
 * このディレクトリは
 * このライブラリのエントリーポイントです。
 * このライブラリは
 * authの機能を提供します。
 * authの機能では
 * 最終的にMiddlewareHandler型を返します。
 *
 * authの機能は
 * 以下のようになっています。
 * - 認証
 * - 認可
 * - ログイン
 * - ログアウト
 * - ユーザー管理
 * - セッション管理
 * - パスワード管理
 * - ロール管理
 * - パーミッション管理
 * - ログ管理
 * - ログイン履歴管理
 * - ログアウト履歴管理
 * - ユーザー履歴管理
 * - ロール履歴管理
 *
 * このライブラリユーザーはこのライブラリを使用することで
 * 認証機能を実装することができます。
 * 使用方法は
 * エンドポイントにmiddlewareとして追加するだけです。
 */
import { Context, Next, MiddlewareHandler } from 'hono'
import { jwt } from 'hono/jwt'

/**
 * この型は
 * Authの型を定義しています。
 *
 * @example
 * ```typescript
 * import { auth } from '@xxx/auth'
 * import Hono from 'hono'
 *
 * const app = new Hono()
 * app.
 *  .use('/auth',
 *  auth({
 *   jwt: {
 *    secret: '...',
 *   },
 *  )
 * ```
 *
 */
export interface Auth {
  jwt: Jwt
  otp: any
}

export interface Jwt {
  middleware: typeof jwt
  sign: (payload: any, secret: string) => Promise<string>
  decode: (token: string) => { header: any; payload: any }
}
