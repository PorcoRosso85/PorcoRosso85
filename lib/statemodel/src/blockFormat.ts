import { SQLComment } from './types'
import { BlockFormatFunction } from './types'

export const blockFormatFunction: BlockFormatFunction = (
  comment: SQLComment,
  blockFormat: string[],
) =>
  `-- ${blockFormat[0]}\n-- ${comment.endpointKey}\n-- ${comment.keyInParallel}\n-- ${comment.description}\n\n-- ${blockFormat[1]}\n\n`
