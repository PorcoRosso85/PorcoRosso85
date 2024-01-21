/**
 * このディレクトリは、インフラストラクチャ層のエントリーポイントです。
 */
export { Design, Feature, Test, states, TestComponent, TestTypes } from './design'
export { Features, MethodEnds, Events } from './feature'
export { Config, Env } from './config'

export interface Infrastructure {
  design: {
    Design: Design
    Feature: Feature
    Test: Test
    states: typeof states
  }
  feature: {
    Features: Features
    MethodEnds: MethodEnds
    Events: Events
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
