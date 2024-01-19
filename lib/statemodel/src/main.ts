import { SQLComment } from './types'
import { blockFormatFunction } from './blockFormat'
import { extractCommentBlock } from './extractCommentBlock'
import fs from 'fs'

export function main(state: any, filePath: string) {
  const comments: SQLComment[] = extractCommentBlock(state)

  const blockFormat = ['BEGIN------------------------------', '------------------------------END']

  for (const comment of comments) {
    const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
    fs.existsSync(filePath)
      ? fs.appendFileSync(filePath, formattedCommentBlock)
      : fs.writeFileSync(filePath, formattedCommentBlock)
  }
}
