import { SQLComment } from './types'
import { blockedSQLComment } from './blockedSQLComment'
import { extractCommentBlock } from './extractCommentBlock'
import fs from 'fs'
import { promisify } from 'util'

export async function stateModel(
  state: any,
  filePath: {
    query: string
    schema: string
  },
) {
  const comments: SQLComment[] = extractCommentBlock(state)

  const blockFormat = [
    '-- BEGIN------------------------------',
    '-- ------------------------------END',
  ]

  const readFile = promisify(fs.readFile)
  const appendFile = promisify(fs.appendFile)

  try {
    const newQuery = []
    const newSchema = []
    if (fs.existsSync(filePath.query)) {
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
      const data = await readFile(filePath.query, 'utf8')

      const regex = new RegExp(`${blockFormat[0]}([\\s\\S]*?)${blockFormat[1]}`, 'gm')
      const dataBlocks: string[] = data.match(regex) || []

      for (const comment of comments) {
        comment.description = comment.description || ''
        // const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
        const bsc = blockedSQLComment(comment, '-- ', {
          blockTop: blockFormat[0],
          blockBottom: blockFormat[1],
        })

        /**
         * formattedCommentBlodkがdataBlocksに含まれていない場合のみ追加
         * 含まれているか含まれていないかの判断は、
         * ブロック内全体を文字列として比較するのではなく、
         * ブロック内のプロパティのみを比較する
         */

        // [] fix, どうしても含まれていない扱いになってしまう
        if (!dataBlocks.includes(bsc.endpointKey) && !dataBlocks.includes(bsc.keyInParallel)) {
          newQuery.push(
            `${bsc.blockTop}\n${bsc.endpointKey}\n${bsc.keyInParallel}\n${bsc.description}\n\n${bsc.blockBottom}\n\n`,
          )
          newSchema.push(`${bsc.description}\n`)
        }
      }
    } else {
      for (const comment of comments) {
        comment.description = comment.description || ''
        // const formattedCommentBlock = blockFormatFunction(comment, blockFormat)
        const bsc = blockedSQLComment(comment, '-- ', {
          blockTop: blockFormat[0],
          blockBottom: blockFormat[1],
        })
        newQuery.push(
          `${bsc.blockTop}\n${bsc.endpointKey}\n${bsc.keyInParallel}\n${bsc.description}\n\n${bsc.blockBottom}\n\n`,
        )
        newSchema.push(`${bsc.description}\n`)
      }
    }

    appendFile(filePath.query, `${newQuery.join('\n')}`, 'utf8')
    appendFile(filePath.schema, `${newSchema.join('\n')}`, 'utf8')
  } catch (err) {
    console.error(err)
  }
}

const genQueryFile = async (state: any, filePath: string) => {}

const genSchemaFile = async (state: any, filePath: string) => {}
