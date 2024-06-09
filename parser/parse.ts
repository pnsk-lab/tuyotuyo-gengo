import type { CstNode } from 'chevrotain'
import { lexer } from './lexer.ts'
import { Parser } from './parser.ts'

type ParseResult = {
  success: true
  cst: CstNode
} | {
  success: false
  message: string
}

const parser = new Parser()
/**
 * Parse
 */
export const parse = (text: string): ParseResult => {
  const tokenized = lexer.tokenize(text)

  if (tokenized.errors.length !== 0) {
    const error = tokenized.errors[0]
    return {
      success: false,
      message: `${error.line}:${error.column}: ${error.message}`
    }
  }
  parser.input = tokenized.tokens

  const result = parser.base()

  return {
    success: true,
    cst: result,
  }
}
