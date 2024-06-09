import { lexer } from './lexer.ts'
import { assertEquals } from '@std/assert'

Deno.test('1+1', () => {
  const tokenized = lexer.tokenize('1+1')
  assertEquals(tokenized.errors.length, 0)
})
