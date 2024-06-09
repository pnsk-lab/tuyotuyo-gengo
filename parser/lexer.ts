import { createToken, Lexer, type TokenType } from 'chevrotain'

export const tokens = {
    NumberLiteral: createToken({ name: 'NumberLiteral', pattern: /\d+/ }),
    Plus: createToken({ name: 'Plus', pattern: /\+/ }),
    WhiteSpace: createToken({ name: 'WhiteSpace', pattern: /\s+/, line_breaks: true, group: Lexer.SKIPPED })
} satisfies {
  [name: string]: TokenType
}

export const allTokens: TokenType[] = Object.values(tokens)

export const lexer = new Lexer(allTokens)
