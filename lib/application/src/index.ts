/**
 * このディレクトリは、
 * このディレクトリは、アプリケーションの構造を定義するためのディレクトリです。
 * 構造の定義に型を使用し、各種実装に制約を与えます。
 *
 * 具体的には、
 * ・設計構造
 * ・各アプリケーションレイヤー間の型契約
 * ・アプリケーション定数
 *
 * ./types/structure/ に定義することから始めます。
 */

import { Hono, Env } from 'hono'
import { Features, MethodEnds, features, HttpMethod, Handler } from './feature'
export {
  Features,
  MethodEnds,
  features,
} from './feature'
export * as TTest from './test'
// export { app } from './route'

/**
 * Featuresから
 * Hono Appを構成する各機能を表現する型です。
 *
 * ```typescript
 * {
 *  [K in MethodEnds]: Feature
 * }
 * ```
 */
export interface App {
  func: <T extends Env = {}>(app: Hono<T>, features: Features) => Hono<Env, {}, string>
}

// 純粋関数: featuresからメソッドとハンドラのリストを生成
export const extractFeatureMethods = (
  features: Features,
): Array<{ method: HttpMethod; end: string; handler: Handler }> => {
  return Object.entries(features).map(([path, feature]) => {
    const method = feature.method
    const handler =
      feature.handler !== undefined ? feature.handler : async (c: any) => c.html('Hello World')

    return { method, end: feature.end, handler }
  })
}

// 非純粋関数: appに対してメソッドとハンドラを適用
export const applyFeaturesToApp = <T extends Env>(
  app: Hono<T>,
  featureMethods: Array<{
    method: HttpMethod
    end: string
    handler: Handler
  }>,
) => {
  // featureMethods.forEach(({ method, end, handler }) => {
  for (const { method, end, handler } of featureMethods) {
    app[method](end, handler)
  }

  return app
}

// createApp関数はこれらを組み合わせて使用
export const createApp = <T extends Env>(app: Hono<T>, features: Features) => {
  const featureMethods = extractFeatureMethods(features)
  return applyFeaturesToApp(app, featureMethods)
}

const hono = new Hono<Env>()
export const app = createApp(hono, features)
