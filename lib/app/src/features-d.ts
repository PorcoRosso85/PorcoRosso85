import { describe, test, expect, expectTypeOf } from 'vitest'
import { features } from './features'
import { TFeatures } from '@PorcoRosso85/core'

// features実装をTFeatures型でテストできる
describe('features', () => {
  test('should be defined', () => {
    expectTypeOf(features).toEqualTypeOf<TFeatures>()
  })
})
