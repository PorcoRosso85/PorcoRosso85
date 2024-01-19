import fs from 'fs'

// 抽出した情報をSQLファイルに書き込む関数
export function writeToSQLFile(comments: string[][], filePath: string) {
  // ファイルが存在する場合は内容を読み込む、存在しない場合は空文字列を設定
  const existingContent = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''

  // コメントをフォーマットする
  const newComments = comments
    .filter((comment) => {
      const formattedComment = comment.map((c) => `-- ${c}`).join('\n')
      return !existingContent.includes(formattedComment)
    }) // 重複チェック
    .map((comment) => comment.map((c) => `-- ${c}`).join('\n')) // コメントを整形
    .join('\n\n')

  // 新しいコメントがある場合のみファイルに追加
  if (newComments) {
    fs.appendFileSync(filePath, newComments)
  }
}
