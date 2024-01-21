import path from 'path'
import { Miniflare } from 'miniflare'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { unstable_dev } from 'wrangler'
import type { UnstableDevWorker } from 'wrangler'
import { TTest } from '@PorcoRosso85/core'

export default const  performanceOptimizationTests:TTest.TestFunction= () => {
    test.skip('パフォーマンスの測定（レイテンシ、スループット）', async () => {
      const start = performance.now()

      // APIリクエストの実行
      // deloy先にアクセスする
      // const url = 'https://example.com'
      // const app = new URL(url)
      const response = await fetch(app, url)
      const end = performance.now()

      // レスポンスタイムの計測
      const responseTime = end - start

      // レスポンスタイムが500ミリ秒未満であることを確認
      expect(responseTime).toBeLessThan(500)
    })
  },