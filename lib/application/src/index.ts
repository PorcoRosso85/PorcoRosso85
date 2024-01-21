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

export {
  Features,
  MethodEnds,
  features,
} from './feature'
export * as TTest from './test'
export { app } from './route'
