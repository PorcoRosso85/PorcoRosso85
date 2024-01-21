/**
 * このディレクトリは
 * テスト関数を実装する
 *
 * @example
 * interface FeatureTest {}
 * interface
 */
import { Features } from '../feature'

/**
 * テスト関数の契約を定義する
 * この契約は、このプロジェクトのすべてのテスト関数が満たすべきものです。
 */
export interface Test {
  (params: {
    method: string
    end: string
    body?: string
    query?: string | string[]
    context: {
      type: string
      params: string[]
    }
  }): void
}

export interface TestComponent {
  testFunction: Test
  testTarget: any
  textContexts: {
    type: TestTypes
    params: string[]
  }[]
}
export type TestTypes = 'toBe' | 'toEqual' | 'toMatchObject' | 'toContain' | 'toContainEqual'

type TestFunction = Test

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

type TestFunctionItems =
  // initialDevelopmentPhaseTests
  // - browserClient
  | 'unitTests' // コンポーネントや機能のユニットテスト
  | 'uiUxTests' // UI/UXテスト、初期モックアップの評価
  | 'browserWorkerConn' // 追加: ブラウザとワーカー間の通信テスト
  | 'queryToMiniflareD1'
  | 'notFound' // 追加: 404と500のテスト
  | 'renderingContain' // レンダリングのテスト
  | 'frameworkFunctionalityTests' // ルーティングやリクエスト処理の基本機能テスト
  | 'moduleIntegrationTests' // 他のライブラリやモジュールとの統合テスト
  | 'basicPerformanceTests' // Cloudflare Workersの基本パフォーマンステスト
  | 'crossBrowserTesting' // 異なるブラウザでの動作テスト
  | 'accessibilityTests' // アクセシビリティテスト
  | 'e2e' // ユーザーのシナリオに沿ったE2Eテスト
  | 'apiIntegrationTests' // 外部APIとの統合テスト
  | 'errorHandlingTests' // エラー処理テスト
  | 'loadTesting' // 負荷テスト
  | 'securityTesting' // セキュリティテスト（XSS、CSRFなど）
  | 'performanceOptimizationTests' // パフォーマンス最適化テスト
  | 'finalUserTesting' // 最終ユーザーテスト
  | 'crossDeviceConsistencyTests' // 追加: 異なるブラウザとデバイスでの表示の一貫性テスト
  | 'stressTesting' // ストレステスト
  | 'finalIntegrationTesting' // 最終統合テスト
  | 'disasterRecoveryTests' // 災害復旧テスト
  | 'scalingTests' // スケーリングテスト
  | 'continuousMonitoring' // 継続的なモニタリング
  | 'userFeedbackAnalysis' // ユーザーフィードバック分析
  | 'dependencyUpdateTests' // 依存関係更新テスト
  | 'performanceMonitoring' // パフォーマンスモニタリング
  | 'infrastructureAudit' // 基盤の監査
  | 'complianceTesting' // コンプライアンステスト

type TestItems = {
  initialDevelopmentPhaseTests: {
    browserClient: {
      unitTests: string // コンポーネントや機能のユニットテスト
      uiUxTests: string // UI/UXテスト、初期モックアップの評価
      browserWorkerConn: string // 追加: ブラウザとワーカー間の通信テスト
      notFound: string // 追加: 404と500のテスト
      renderingContain: string
    }
    webFramework: {
      frameworkFunctionalityTests: string // ルーティングやリクエスト処理の基本機能テスト
      moduleIntegrationTests: string // 他のライブラリやモジュールとの統合テスト
    }
    infrastructure: {
      basicPerformanceTests: string // Cloudflare Workersの基本パフォーマンステスト
    }
  }
  midDevelopmentPhaseTests: {
    browserClient: {
      crossBrowserTesting: string // 異なるブラウザでの動作テスト
      accessibilityTests: string // アクセシビリティテスト
      e2e: string // ユーザーのシナリオに沿ったE2Eテスト
    }
    webFramework: {
      apiIntegrationTests: string // 外部APIとの統合テスト
      errorHandlingTests: string // エラー処理テスト
    }
    infrastructure: {
      loadTesting: string // 負荷テスト
      securityTesting: string // セキュリティテスト（XSS、CSRFなど）
    }
  }
  preReleasePhaseTests: {
    browserClient: {
      performanceOptimizationTests: string // パフォーマンス最適化テスト
      finalUserTesting: string // 最終ユーザーテスト
      crossDeviceConsistencyTests: string // 追加: 異なるブラウザとデバイスでの表示の一貫性テスト
    }
    webFramework: {
      stressTesting: string // ストレステスト
      finalIntegrationTesting: string // 最終統合テスト
    }
    infrastructure: {
      disasterRecoveryTests: string // 災害復旧テスト
      scalingTests: string // スケーリングテスト
    }
  }
  operationPhaseTests: {
    browserClient: {
      continuousMonitoring: string // 継続的なモニタリング
      userFeedbackAnalysis: string // ユーザーフィードバック分析
    }
    webFramework: {
      dependencyUpdateTests: string // 依存関係更新テスト
      performanceMonitoring: string // パフォーマンスモニタリング
    }
    infrastructure: {
      infrastructureAudit: string // 基盤の監査
      complianceTesting: string // コンプライアンステスト
    }
  }
}

const testItems = {
  initialDevelopmentPhaseTests: {
    browserClient: {
      unitTests: '', // コンポーネントや機能のユニットテスト
      uiUxTests: '', // UI/UXテスト、初期モックアップの評価
      browserWorkerConn: '', // 追加: ブラウザとワーカー間の通信テスト
      notFound: '', // 追加: 404と500のテスト
      renderingContain: '',
    },
    webFramework: {
      frameworkFunctionalityTests: '', // ルーティングやリクエスト処理の基本機能テスト
      moduleIntegrationTests: '', // 他のライブラリやモジュールとの統合テスト
    },
    infrastructure: {
      basicPerformanceTests: '', // Cloudflare Workersの基本パフォーマンステスト
    },
  },

  midDevelopmentPhaseTests: {
    browserClient: {
      crossBrowserTesting: '', // 異なるブラウザでの動作テスト
      accessibilityTests: '', // アクセシビリティテスト
      e2e: '', // ユーザーのシナリオに沿ったE2Eテスト
    },
    webFramework: {
      apiIntegrationTests: '', // 外部APIとの統合テスト
      errorHandlingTests: '', // エラー処理テスト
    },
    infrastructure: {
      loadTesting: '', // 負荷テスト
      securityTesting: '', // セキュリティテスト（XSS、CSRFなど）
    },
  },

  preReleasePhaseTests: {
    browserClient: {
      performanceOptimizationTests: '', // パフォーマンス最適化テスト
      finalUserTesting: '', // 最終ユーザーテスト
      crossDeviceConsistencyTests: '', // 追加: 異なるブラウザとデバイスでの表示の一貫性テスト
    },
    webFramework: {
      stressTesting: '', // ストレステスト
      finalIntegrationTesting: '', // 最終統合テスト
    },
    infrastructure: {
      disasterRecoveryTests: '', // 災害復旧テスト
      scalingTests: '', // スケーリングテスト
    },
  },

  operationPhaseTests: {
    browserClient: {
      continuousMonitoring: '', // 継続的なモニタリング
      userFeedbackAnalysis: '', // ユーザーフィードバック分析
    },
    webFramework: {
      dependencyUpdateTests: '', // 依存関係更新テスト
      performanceMonitoring: '', // パフォーマンスモニタリング
    },
    infrastructure: {
      infrastructureAudit: '', // 基盤の監査
      complianceTesting: '', // コンプライアンステスト
    },
  },
}
