import path from 'path'
import { Miniflare } from 'miniflare'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { unstable_dev } from 'wrangler'
import type { UnstableDevWorker } from 'wrangler'
import { TTest } from '@PorcoRosso85/core'

  /** queryの単体テストであり、統合テストは別で行う */
export default const queryToMiniflareD1: TTest.TestFunction =  async ({ body }) => {
    const mf = new Miniflare({
      name: 'main',
      modules: true,
      script: `
                    export default {
                    async fetch(request, env, ctx){
                        return new Response('Hello World!');
                    },};
                    `,
      d1Databases: ['D1'],
    })
    const d1db = await mf.getD1Database('D1')

    // [] table should be added
    const table = ''
    // [] table should be added
    const query = ''
    // [] extract tableName from query
    const tableName = ''
    const ddl = schema.genDdl(table)
    await d1db.exec(ddl)

    /** genDdl関数の結合テスト */
    test('assert table', async () => {
      const { results } = await d1db.prepare('SELECT * FROM sqlite_master;').all()
      const tableNames = results.map((result) => result.name)
      expect(tableNames).toContain(tableName)
    })

    describe('after table asserted...', async () => {
      const { results } = await d1db.prepare(`PRAGMA table_info(${tableName});`).all()
      const columnNames = results.map((result) => result.name)

      test(`${tableName} column should be created`, async () => {
        for (const columnName of columnNames) {
          expect(columnNames).toContain(columnName)
        }
        // // []手動のテスト
        // expect(columnNames).toContain(toContain)
      })

      describe('after column asserted...', async () => {
        // [] extract queryOperation from query
        const queryOperation = ''
        switch (queryOperation) {
          case 'insert':
            beforeAll(async () => {
              // [] query should be added
              await d1db.prepare(query).run()
            })

            test('query to contain expected', async () => {
              // const query = `insert into user (user_id, user_name, user_role, email, created_at, other_info) values ('user_id', 'user_name', 'user_role', 'email', 'created_at', 'other_info');`
              expect(query).toContain(toContain)
            })

            test('validate inserted user.register', async () => {
              const { results } = await d1db.prepare('SELECT * FROM user;').all()
              expect(results.length).toEqual(1)
              expect(results[0].email).toEqual('email')
              expect(results[0].user_id).toEqual('user_id')
              expect(results[0].user_name).toEqual('user_name')
              expect(results[0].user_role).toEqual('user_role')
            })
            break
          case 'update':
            break
          case 'delete':
            break
          case 'select':
            break
          default:
            throw new Error('queryOperation is invalid')
        }
      })
    })

    describe('query is invalid', async () => {
      test('if query is empty', async () => {
        const query = ''
        // [] should throw error
      })

      test('if query is invalid', async () => {})
    })

    describe('transaction', async () => {
      test('transaction management', async () => {})
    })
  }