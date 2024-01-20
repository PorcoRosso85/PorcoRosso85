/**
 * このディレクトリは、アプリケーションの設定を管理するためのディレクトリです。
 */

import { Design } from './constants'

/**
 * この型で
 * このディレクトリで出力するインターフェースを管理します。
 *
 */
export interface Config {}

// 環境変数の読み込み
// cloufflare workers からの環境変数の読み込み
export interface Env {
  NODE_ENV: string
  PORT: string
  DB_HOST: string
  DB_PORT: string
  DB_USER: string
  DB_PASSWORD: string
  DB_NAME: string
  DB_LOGGING: string
  DB_SYNC: string
  JWT_SECRET: string
  JWT_EXPIRES_IN: string
  JWT_REFRESH_SECRET: string
  JWT_REFRESH_EXPIRES_IN: string
  MAIL_HOST: string
  MAIL_PORT: string
  MAIL_USER: string
  MAIL_PASSWORD: string
  MAIL_FROM: string
  MAIL_TO: string
  MAIL_SUBJECT: string
  MAIL_TEXT: string
  MAIL_HTML: string
  MAIL_RESET_PASSWORD_URL: string
}

/**
 * この型で
 * アプリケーション内で使用する定数を管理します。
 */
export interface Constants {
  design: Design
}
