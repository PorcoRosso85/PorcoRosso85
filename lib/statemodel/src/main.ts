import { SQLComment } from './types'
import { blockFormatFunction } from './blockFormat'
import { extractCommentBlock } from './extractCommentBlock'
import fs from 'fs'
import { promisify } from 'util'

export async function main(state: any, filePath: string) {
  const comments: SQLComment[] = extractCommentBlock(state)

  const blockFormat = ['BEGIN------------------------------', '------------------------------END']

  const readFile = promisify(fs.readFile)
  const appendFile = promisify(fs.appendFile)

  try {
    const newData = []
    if (fs.existsSync(filePath)) {
      const data = await readFile(filePath, 'utf8')
      for (const comment of comments) {
        comment.description = comment.description || ''
        const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
        // formattedCommentBlockを使用した処理をここに書く
        newData.push(formattedCommentBlock)
      }
    } else {
      fs.writeFileSync(filePath, '')
      for (const comment of comments) {
        comment.description = comment.description || ''
        const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
        newData.push(formattedCommentBlock)
      }
    }

    appendFile(filePath, newData.join('\n'), 'utf8')
  } catch (err) {
    console.error(err)
  }
}
