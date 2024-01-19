export interface SQLComment {
  endpointKey: string
  keyInParallel: string
  description: string
}

export interface PrefixedSQLComment extends SQLComment {
  blockTop: string
  blockBottom: string
}

export type BlockFormatFunction = (comment: SQLComment, format: string[]) => SQLComment

export interface BlockValidationResult {
  isValid: boolean
  blockContent?: string
}
