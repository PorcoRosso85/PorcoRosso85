import { SQLComment } from './types'
/**
 *
 * @param machine
 * @param baseKey
 * @returns
 *
 * @example
 * output:
 * [
 * { endpointKey: 'parallel', keyInParallel: 'parallel', description: 'parallel' },
 * { endpointKey: 'parallel', keyInParallel: 'parallel', description: 'parallel' },
 * ...
 * ]
 */
export function extractCommentBlock(state: any, baseKey = ''): SQLComment[] {
  let results: SQLComment[] = []
  for (const key in state.states) {
    const newState = state.states[key]
    const endpointKey = baseKey ? `${baseKey}.${key}` : key
    if (state.type === 'parallel') {
      for (const keyInParallel in state.states) {
        results.push({ endpointKey, keyInParallel, description: newState.description })
      }
    }
    // ネストされた状態を処理するための再帰呼び出し
    if (state.states) {
      results = [...results, ...extractCommentBlock(newState, endpointKey)]
    }
  }
  return results
}
