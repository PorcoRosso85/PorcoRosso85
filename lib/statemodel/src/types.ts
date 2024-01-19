export interface SQLComment {
  endpointKey: string
  keyInParallel: string | undefined
  description: string | undefined
}

export type BlockFormatFunction = (comment: SQLComment) => string

export interface BlockValidationResult {
  isValid: boolean
  blockContent?: string
}
