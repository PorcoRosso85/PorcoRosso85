import { SQLComment } from './types'
import { blockFormat } from './blockFormat'
import fs from 'fs'

export function main(state: any, filePath: string) {
  const comments: SQLComment[] = [
    { endpointKey: 'example', keyInParallel: 'key', description: 'desc' },
  ]
  for (const comment of comments) {
    const formattedCommentBlock = blockFormat(comment)
    fs.existsSync(filePath)
      ? fs.appendFileSync(filePath, formattedCommentBlock)
      : fs.writeFileSync(filePath, formattedCommentBlock)
  }
}
