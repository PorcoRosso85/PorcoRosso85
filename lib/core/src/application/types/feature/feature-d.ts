import { Feature, states } from '../structure'

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

// [] queryプロパティに、design内の関数名により制約するか検討する
export type Features = {
  [K in MethodEnds]: Feature
}

export type Events = (typeof states)['types']['events'] extends { type: infer T } ? T : never
