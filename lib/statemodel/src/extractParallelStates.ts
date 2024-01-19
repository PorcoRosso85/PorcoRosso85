export function extractParallelStates(machine: any, baseKey = ''): string[][] {
  let results: string[][] = []
  for (const key in machine.states) {
    const state = machine.states[key]
    const fullKey = baseKey ? `${baseKey}.${key}` : key
    if (state.type === 'parallel') {
      for (const innerKey in state.states) {
        results.push([fullKey, innerKey])
      }
    }
    // ネストされた状態を処理するための再帰呼び出し
    if (state.states) {
      results = [...results, ...extractParallelStates(state, fullKey)]
    }
  }
  return results
}
