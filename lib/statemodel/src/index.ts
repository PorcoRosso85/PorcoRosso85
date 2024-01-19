import { extractParallelStates } from './extractParallelStates'
import { writeToSQLFile } from './writeToSQLFile'

// 外部から抽出と生成を実行するための関数
function stateModel(machine: any, filePath: string) {
  const comments = extractParallelStates(machine)
  writeToSQLFile(comments, filePath)
}

export default stateModel

// mainの使い方
// import machine from './structure'
// import main from './index'
//
// const filePath = path.resolve(__dirname, 'fromState.sql')
