/**
 * このディレクトリは
 *
 */
import { states } from '@PorcoRosso85/infrastructure'

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

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

type Endpoint = string
//
// [] Endpointを設計依存にする
export type MethodEndFormat = `${HttpMethod}__${Endpoint}`

type ExtractPaths<S> = S extends { states: infer States }
  ? {
      [K in keyof States]: K extends string ? K | ExtractPaths<States[K]> : never
    }[keyof States]
  : never

// [] test, MethodEndsを実装（抽出）したとき、MethodEndsはMethodEndFormatに従っているか型テストする
/**
 * @example
 * const methodEnds: {
 *   [K in MethodEnds]: {}
 * } = {
 *  'GET__/': {}
 * }
 */
export type MethodEnds = ExtractPaths<typeof states>

export type Features = {
  [K in MethodEnds]: Feature
}

export type Events = (typeof states)['types']['events'] extends { type: infer T } ? T : never

export const features: Features = {
  '/': {
    end: '/',
    error: '',
    query: {},
    handler: async (c) => c.html('Hello World'),
  },
}
