import { Feature, states } from '../../../infrastructure/config/constants'

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
