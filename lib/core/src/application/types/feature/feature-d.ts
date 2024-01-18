import { Feature, states } from '../structure'

type ExtractPaths<S> = S extends { states: infer States }
  ? {
      [K in keyof States]: K extends string ? K | ExtractPaths<States[K]> : never
    }[keyof States]
  : never

export type MethodEnds = ExtractPaths<typeof states>

export type Features = {
  [K in MethodEnds]: Feature
}
