import { lexer } from './lexer.ts'
import { Parser } from './parser.ts'

Deno.test('dev', async () => {
  const tokenized = lexer.tokenize('1 + 1')
  if (tokenized.errors.length !== 0) {
    console.error(tokenized.errors)
    throw new Error('Syntax error detected')
  }

  const parser = new Parser()
  parser.input = tokenized.tokens

  const cst = parser.expression()

  await Deno.writeTextFile('./a.json', JSON.stringify(cst, null, 2))
})
