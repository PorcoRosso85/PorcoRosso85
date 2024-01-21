import { TTest, TFeatures, TMethodEnds } from '@PorcoRosso85/core'
import { testMap } from '../route.test'

export const testFactory: TTest.TestFactory = (testMapImplement: TTest.TestMapImplement) => {
  // [K in keyof Features]: TestMap[], MethodEnds
  const methodEnds: string[] = Object.keys(testMapImplement)
  // extract testFunctions from testFunctionMap
  for (const methodEnd of methodEnds) {
    // console.debug('methodEnd', methodEnd)
    const extractedEnd = (methodEnd) => methodEnd.split('__')
    let [method, end] = extractedEnd(methodEnd)
    method = method.toUpperCase()

    // [] ignore
    // @ts-ignore
    for (const testComponent of testMapImplement[methodEnd]) {
      const { testFunction, testTarget, textContexts }: TTest.TestComponent = testComponent

      for (const textContext of textContexts) {
        const { type, params } = textContext

        for (const p of params) {
          testFunction({
            method,
            end,
            context: { type, params: [p] },
          })
        }
      }
    }
  }
}
