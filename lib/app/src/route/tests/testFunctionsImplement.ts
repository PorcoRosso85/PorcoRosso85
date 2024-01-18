import * as tf from './functions/browserWorkerConn'
import { TTest, TFeatures } from '@PorcoRosso85/core'

export const testFunctionsImplement: TTest.TestFunctionImplement = {
  browserWorkerConn: tf.browserWokerConn,
}
