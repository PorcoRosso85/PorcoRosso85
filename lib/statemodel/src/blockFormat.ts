import { SQLComment } from './types'
import { BlockFormatFunction } from './types'

export const blockFormat: BlockFormatFunction = (comment: SQLComment) =>
  `-- BEGIN BLOCK --\n--${comment.endpointKey}\n--${comment.keyInParallel}\n--${comment.description}\n\n-- END BLOCK --`
