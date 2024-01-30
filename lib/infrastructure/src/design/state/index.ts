/**
 * このディレクトリは
 * 状態管理に関する処理をまとめたディレクトリです。
 * 配下の各ディレクトリは
 * index.tsをエントリーポイントとして
 * index.tsに定義されたContextを管理するMachineを実装します。
 */
export { machine as authLoginMachine } from './authorization/loginMachine'
