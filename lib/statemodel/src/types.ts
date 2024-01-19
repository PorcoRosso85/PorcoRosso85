export interface SQLComment {
  endpointKey: string
  keyInParallel: string | undefined
  description: string | undefined
}

export type BlockFormatFunction = (comment: SQLComment, format: string[]) => string

export interface BlockValidationResult {
  isValid: boolean
  blockContent?: string
}
