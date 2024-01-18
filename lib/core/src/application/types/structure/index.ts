/**
 * このディレクトリは、
 * このディレクトリは、アプリケーションの構造を定義するためのディレクトリです。
 * 構造の定義に型を使用し、各種実装に制約を与えます。
 *
 * 具体的には、
 * ・設計構造
 * ・各アプリケーションレイヤー間の型契約
 * ・アプリケーション定数
 */
import { Context } from 'hono'
import { states } from './states'
export { states }

/**
 * この型は、設計を反映したオブジェクトを表現する型です。
 */
export interface Design {
  on?: {
    [event: string]:
      | {
          target: string
          cond?: string
          actions?: string[]
        }
      | string
  }
  initial?: string
  states?: {
    [subStateName: string]: Designs
  }
  description?: string
}

type Designs = {
  [stateName: string]: Design
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Endpoint = string

// [] Endpointを設計依存にする
export type MethodEndFormat = `${HttpMethod}__${Endpoint}`

const design: Design = {
  on: {
    'GET__///': {
      target: 'GET__/'
    }
  },
  }

/**
 * この型は、Web機能を表現する型です。
 */
export interface Feature {
  method: HttpMethod
  end: Endpoint
  error?: {}
  validate?: (c: Context) => void
  query?: {
    [queryName: string]: (params: any) => string
  }
  client?: {
    anchors: string[]
    elements: {
      [elementName: string]: any
    }
  }
  handler?: (c: Context) => any | Promise<any>
}

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
