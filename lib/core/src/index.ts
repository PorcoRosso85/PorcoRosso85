/**
 * このディレクトリはdomain層の実装を提供します。
 * configやerror, loggerなどははシステムで一意であるため, statesは設計をオブジェクト化しておりシステム全体が依存するため、などの理由でここに置いている
 *
 *
 */
// []修正, ビジネスの解決に設定やエラーなどの実装は必要ない
// infra層: 接続など技術的な問題解決
// app層：ビジネスロジックやユースケースの実装
export { Bindings } from './application/types/config'
export { TFeatures, TTest, TMethodEnds } from './application'
