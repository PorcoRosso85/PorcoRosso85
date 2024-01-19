import { SQLComment } from './types'
import { blockFormatFunction } from './blockFormat'
import { extractCommentBlock } from './extractCommentBlock'
import fs from 'fs'
import { promisify } from 'util'

export async function main(state: any, filePath: string) {
  const comments: SQLComment[] = extractCommentBlock(state)

  const blockFormat = [
    '-- BEGIN------------------------------\n',
    '-- ------------------------------END\n\n',
  ]

  const readFile = promisify(fs.readFile)
  const appendFile = promisify(fs.appendFile)

  try {
    const newData = []
    if (fs.existsSync(filePath)) {
      /**
       * @example

-- BEGIN------------------------------
-- /user_account./:user_id./user_info.name: GetUser :one
-- name: GetUser :one
-- ユーザー情報を取得するクエリ { users }

-- ------------------------------END


-- BEGIN------------------------------
-- /user_account./:user_id./user_info.name: GetUser :one
-- name: GetUserRole :one
-- ユーザー情報を取得するクエリ { users }

-- ------------------------------END


       */
      const data = await readFile(filePath, 'utf8')

      const regex = new RegExp(`${blockFormat[0]}([\\s\\S]*?)${blockFormat[1]}`, 'gm')
      const dataBlocks: string[] = data.match(regex) || []

      for (const comment of comments) {
        comment.description = comment.description || ''
        const formattedCommentBlock = blockFormatFunction(comment, blockFormat)

        // formattedCommentBlodkがdataBlocksに含まれていない場合のみ追加
        if (!dataBlocks.includes(formattedCommentBlock)) {
          newData.push(formattedCommentBlock)
        }
      }
    } else {
      for (const comment of comments) {
        comment.description = comment.description || ''
        const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
        newData.push(formattedCommentBlock)
      }
    }

    appendFile(filePath, `${newData.join('\n')}`, 'utf8')
  } catch (err) {
    console.error(err)
  }
}
