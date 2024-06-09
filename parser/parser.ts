import { CstParser } from 'chevrotain'
import { allTokens, tokens } from './lexer.ts'

export class Parser extends CstParser {
  constructor() {
    super(allTokens)

    this.performSelfAnalysis()
  }

  /**
   * Base
   */
  public base = this.RULE('base', () => {
    this.SUBRULE(this.statement)
  })

  /**
   * 文
   */
  public statement = this.RULE('statement', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.expression) },
    ])
  })

  /**
   * 式
   */
  public expression = this.RULE('expression', () => {
    this.OR([
      { ALT: () => this.SUBRULE(this.additionExpression) },
      { ALT: () => this.SUBRULE(this.callFunction) },
      { ALT: () => this.SUBRULE(this.literal) },
    ])
  })

  /**
   * f(a, b, c, ...)
   */
  public callFunction = this.RULE('callFunction', () => {
    this.CONSUME(tokens.VarLiteral) // f
    
    this.CONSUME1(tokens.LeftBracket)  // (

    this.MANY(() => {
      this.SUBRULE(this.expression)
      this.OPTION(() => {
        this.CONSUME2(tokens.Comma)
      })
    }) // a, b, c, ...

    this.CONSUME3(tokens.RightBracket) // )
  })

  public literal = this.RULE('literal', () => {
    this.OR([
      { ALT: () => this.CONSUME(tokens.VarLiteral) },
      { ALT: () => this.CONSUME(tokens.NumberLiteral) },
    ])
  })

  public additionExpression = this.RULE('additionExpression', () => {
    this.SUBRULE(this.literal)
    this.CONSUME(tokens.Plus)
    this.SUBRULE1(this.literal)
  })
}
