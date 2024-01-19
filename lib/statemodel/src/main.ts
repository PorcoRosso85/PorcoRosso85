import { SQLComment } from './types'
import { blockFormatFunction } from './blockFormat'
import { extractCommentBlock } from './extractCommentBlock'
import fs from 'fs'

export function main(state: any, filePath: string) {
  const comments: SQLComment[] = extractCommentBlock(state)

  const blockFormat = ['BEGIN------------------------------', '------------------------------END']

  for (const comment of comments) {
    // commentの値がundefinedの場合、空文字に変換する
    comment.description = comment.description || ''
    const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
    // [] 照合機能: 既存ファイルに、フォーマット通りのコメントブロックが存在するか
    fs.existsSync(filePath)
      ? fs.appendFileSync(filePath, formattedCommentBlock)
        fs.writeFileSync(filePath, formattedCommentBlock)
  }
}
