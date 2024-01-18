import { describe, test, expect, assertType, expectTypeOf } from 'vitest'
import { MethodEnds, Features } from './feature-d'
import { MethodEndFormat } from '../structure'

describe('MethodEnds', () => {
    test('MethodEnds', () => {
        const isMethodEndFormat = (key: string): key is MethodEndFormat => {
            return /^GET__|POST__|PUT__|DELETE__|PATCH__/.test(key);
        }
        
        const methodEnds: Features = {
            'GET__/': {}
        }
        const methodEndsKeys = Object.keys(methodEnds)
        for ( const key of methodEndsKeys ) {
            // [] どうしてもkeyを文字列型でしかとれない、あるいは型ガード関数を作るしかない？
            expectTypeOf<MethodEndFormat>(key).toMatchTypeOf<MethodEndFormat>()
        }

    })
})