/**
 * このディレクトリは、インフラストラクチャ層のエントリーポイントです。
 */
export { Design, states } from './design'
export { Config, Env } from './config'

export interface Infrastructure {
  design: {
    Design: Design
    Feature: Feature
    Test: Test
    states: typeof states
  }
  config: {
    Constants: Constants
    Config: Config
    Env: Env
  }
  logger: {
    Logger: Logger
    LoggerConfig: LoggerConfig
    LoggerConfigImplement: LoggerConfigImplement
    LoggerImplement: LoggerImplement
    LoggerLevel: LoggerLevel
    LoggerType: LoggerType
  }
}
