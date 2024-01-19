import { SQLComment, PrefixedSQLComment } from './types'
/**
 *
 * @param comment
 * @param prefix
 * @returns
 * `-- endpointKey`
 * `-- keyInParallel`
 * `-- description`
 */
export const blockedSQLComment = (
  comment: SQLComment,
  prefix: string,
  blockSeparator: { blockTop: string; blockBottom: string },
): PrefixedSQLComment => ({
  blockTop: blockSeparator.blockTop,
  endpointKey: `${prefix}${comment.endpointKey}`,
  keyInParallel: comment.keyInParallel ? `${prefix}${comment.keyInParallel}` : '',
  description: comment.description ? `${prefix}${comment.description}` : '',
  blockBottom: blockSeparator.blockBottom,
})
