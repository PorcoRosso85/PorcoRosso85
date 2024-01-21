import { TTest } from '@PorcoRosso85/core'
import { testFunctionsImplement as tfi } from './tests/testFunctionsImplement'
import { features } from '../features'
import { testFactory } from './tests/testFactory'
import { browserWokerConn } from './tests/functions/browserWorkerConn'

export const testMap: TTest.TestMapImplement = {
  'GET__/': [
    {
      testFunction: browserWokerConn,
      testTarget: features['/'].end,
      textContexts: [
        {
          type: 'toContain',
          params: ['Hello World'],
        },
      ],
    },
  ],
}

testFactory(testMap)
