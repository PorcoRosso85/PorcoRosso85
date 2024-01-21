import { describe, test, expect } from 'vitest'
import { extractFeatureMethods, applyFeaturesToApp } from './index'
import { Features } from './index'
import { Env, Hono } from 'hono'

type Bindings = Env

/**
 * extractFeatureMethods関数のテスト
 */
describe('extractFeatureMethods', () => {
  const features: Features = {
    '/': {
      method: 'get',
      end: '/',
      error: '',
      query: {},
      handler: async (c) => c.html('Hello World'),
    },
  }

  const app = new Hono<Bindings>()

  test('extractFeatureMethods関数は、featuresからメソッドとハンドラのリストを生成する', () => {
    const featureMethods = extractFeatureMethods(features)

    expect(featureMethods).toEqual([
      {
        method: 'get',
        end: '/',
        handler: expect.any(Function),
      },
    ])
  })

  test('applyFeaturesToApp関数は、appに対してメソッドとハンドラを適用する', () => {
    const featureMethods = extractFeatureMethods(features)
    const appWithFeatures = applyFeaturesToApp(app, featureMethods)

    /**
     * expected is:
+ Hono {
+   "_basePath": "/",
+   "all": [Function anonymous],
    "delete": Any<Function>,
+   "errorHandler": [Function errorHandler],
+   "fetch": [Function anonymous],
+   "fire": [Function anonymous],
    "get": Any<Function>,
+   "getPath": [Function getPath],
+   "handleEvent": [Function anonymous],
+   "head": [Function anonymous],
+   "notFound": [Function anonymous],
+   "notFoundHandler": [Function notFoundHandler],
+   "on": [Function anonymous],
+   "onError": [Function anonymous],
+   "options": [Function anonymous],
+   "patch": [Function anonymous],
    "post": Any<Function>,
    "put": Any<Function>,
+   "request": [Function anonymous],
+   "router": SmartRouter {
+     "name": "SmartRouter",
+     "routers": Array [
+       RegExpRouter {
+         "middleware": Object {
+           "ALL": Object {},
+         },
+         "name": "RegExpRouter",
+         "routes": Object {
+           "ALL": Object {},
+         },
+       },
+       TrieRouter {
+         "name": "TrieRouter",
+         "node": Node {
+           "children": Object {},
+           "methods": Array [],
+           "name": "",
+           "order": 0,
+           "params": Object {},
+           "patterns": Array [],
+         },
+       },
+     ],
+     "routes": Array [
+       Array [
+         "GET",
+         "/",
+         Array [
+           [Function handler],
+           Object {
+             "handler": [Function handler],
+             "method": "GET",
+             "path": "/",
+           },
+         ],
+       ],
+     ],
+   },
+   "routes": Array [
+     Object {
+       "handler": [Function handler],
+       "method": "GET",
+       "path": "/",
+     },
+   ],
+   "use": [Function anonymous],
     */

    // [] honoを返すテスト
    expect(appWithFeatures).toEqual({
      get: expect.any(Function),
      post: expect.any(Function),
      put: expect.any(Function),
      delete: expect.any(Function),
    })
  })
})
