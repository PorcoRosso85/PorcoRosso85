/**
 * このファイルは
 * テスト関数を生成するファクトリー関数
 * 生成するためのテスト対象のマッピング定義
 * 生成するためのテスト一覧
 * を含みます。
 * インポートする全オブジェクトはすでにテストが完了しているものとします
 */
import { TFeatures, TTest } from '@PorcoRosso85/core'
import { browserWokerConn } from './browserWorkerConn'

/**
 * 生成するためのテスト一覧
 * すべてのテストを含む
 */
// []各keyの型を定義する
const testFunctions: TTest.TestFunctionImplement = {
  // 各testを書くのではなく、各describeについて書くことにした、要件次第ではtestに戻す
  browserWorkerConn: browserWokerConn,
}
