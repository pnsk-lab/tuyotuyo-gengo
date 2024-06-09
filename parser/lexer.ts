/**
 * Define tokens
 * @module
 */

import { createToken, Lexer, type TokenType } from 'chevrotain'

export const tokens = {
  NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+/ }),
  VarLiteral: createToken({ name: 'Literal', pattern: /[a-zA-Z][a-zA-Z0-9]*/ }),
  Plus: createToken({ name: 'Plus', pattern: /\+/ }),
  LeftBracket: createToken({ name: 'LeftBracket', pattern: /\(/ }),
  RightBracket: createToken({ name: 'RightBracket', pattern: /\)/ }),
  Comma: createToken({ name: 'Comma', pattern: /\,/ }),
  WhiteSpace: createToken({
    name: 'WhiteSpace',
    pattern: /\s+/,
    line_breaks: true,
    group: Lexer.SKIPPED,
  }),
} satisfies {
  [name: string]: TokenType
}

export const allTokens: TokenType[] = Object.values(tokens)

export const lexer = new Lexer(allTokens)
