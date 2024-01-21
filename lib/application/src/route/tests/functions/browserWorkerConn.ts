import path from 'path'
import { Miniflare } from 'miniflare'
/**
 * このファイルは
 * テスト関数を生成するファクトリー関数
 * 生成するためのテスト対象のマッピング定義
 * 生成するためのテスト一覧
 * を含みます。
 * インポートする全オブジェクトはすでにテストが完了しているものとします
 */
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { unstable_dev } from 'wrangler'
import type { UnstableDevWorker } from 'wrangler'
import { TTest } from '@PorcoRosso85/core'

export const browserWokerConn: TTest.TestFunction = ({
  method,
  end,
  context: { type, params },
}) => {
  let res: any
  let worker: UnstableDevWorker

  beforeAll(async () => {
    // relative path from project root to app file
    // index.ts/x should export app as default
    const filePath = path.resolve(__dirname, '../../route.ts')
    // console.debug('filePath', filePath)
    worker = await unstable_dev(filePath, {
      experimental: { disableExperimentalWarning: false },
    })
    // console.debug('worker', filePath, worker)
  })

  afterAll(async () => {
    if (worker) {
      await worker.stop()
    }
  })

  test(`responseToContain ${end} ${params}`, async () => {
    switch (method) {
      case 'GET':
        // console.debug('end', end)
        res = await worker.fetch(end)
        // console.debug('res', res)
        break
      case 'POST':
        res = await worker.fetch(end, {
          method: 'POST',
          // body: new URLSearchParams(body).toString(),
        })
        break
      case 'PUT':
        res = await worker.fetch(end, {
          method: 'PUT',
          // body: new URLSearchParams(body).toString(),
        })
        break
      case 'DELETE':
        res = await worker.fetch(end, {
          method: 'DELETE',
          // body: new URLSearchParams(body).toString(),
        })
        break
      default:
        break
    }

    expect(res.status).toBe(200)
    expect(res.statusText).toBe('OK')

    switch (type) {
      case 'toContain':
        expect(await res.text()).toContain(params)
        break
      case 'toEqual':
        expect(await res.text()).toEqual(params)
        break
      default:
        break
    }
  })
}
