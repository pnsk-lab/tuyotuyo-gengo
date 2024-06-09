import { CstParser } from 'chevrotain'
import { allTokens, tokens } from './lexer.ts'

export class Parser extends CstParser {
  constructor() {
    super(allTokens)
  
    this.performSelfAnalysis()
  }

  public expression = this.RULE("expression", () => {
    this.SUBRULE(this.additionExpression)
  })

  public additionExpression = this.RULE('additionExpression', () => {
    this.CONSUME(tokens.NumberLiteral);
    this.CONSUME1(tokens.Plus)
    this.CONSUME2(tokens.NumberLiteral)
  })
}
