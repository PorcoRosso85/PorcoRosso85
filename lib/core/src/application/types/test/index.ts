/**
 * このファイルは、テスト関数の契約を定義するファイルです。
 *
 * @example
 * interface FeatureTest {}
 * interface
 */
import { Test, TestComponent } from '../../../infrastructure/config/constants'
import { Features } from '../feature'

type TestFunction = Test
export { TestComponent, TestFunction }

/**
 * テスト関数の実装一覧を格納するオブジェクトを定義する
 */
export type TestFunctionImplement = {
  [key in string]: TestFunction
}

/**
 * テストマップ実装は
 * 各機能ごとに必要なテストを網羅する
 * オブジェクトの型を定義する
 *
 */
export type TestMapImplement = {
  // このkeyは、Types.Featuresのkeyを表現する文字列
  // ViewTransitionのkeyを表現する文字列そのままではあるが、Featuresに依存させる
  [K in keyof Features]: TestComponent[]
}

/**
 * テストファクトリーの型を定義する
 * テストファクトリは、テストマップ実装を受け取り、
 * テスト関数を返す関数である
 *
 * 使用方法
 * @usage
 * const testFactory: TestFactory = (testMap: TestMapImplement) => {
 * ...
 * }
 * testFactory(testMap)
 *
 */
export type TestFactory = (testMap: TestMapImplement) => void
