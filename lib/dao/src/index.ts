/**
 * このディレクトリは
 * このアプリケーションで使用するDAOを定義する
 * DAOはデータベースとのやり取りを行う
 *
 * 構成
 * - states（@../infrastructure/states）の定義
 * - stateModelスクリプトの依存と実行,
 * - sqlの生成
 * - sqlからtsの生成
 */

export interface StateModel {}
export interface SQL {}

export { getUser, GetUserArgs, GetUserRow } from './query_design.sql'
