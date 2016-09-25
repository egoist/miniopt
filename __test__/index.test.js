const miniopt = require('../dist/miniopt')

test('invalid input', () => {
  expect(miniopt('')).toBe(null)
  expect(miniopt('adsd[]')).toBe(null)
})

test('simple', () => {
  const ret = miniopt('[foo=123]')
  expect(ret.foo).toBe(123)
})

test('multi args', () => {
  const ret = miniopt('[foo=123 bar="hello"]')
  expect(ret).toEqual({foo: 123, bar: 'hello'})
})

test('with namespace', () => {
  const ret = miniopt('[foo bar="lol" baz=123]')
  expect(ret).toEqual({foo: {bar: 'lol', baz: 123}})
})

test('value can contain spaces', () => {
  const ret = miniopt('[foo bar="lol lol" baz=123]')
  expect(ret).toEqual({foo: {bar: 'lol lol', baz: 123}})
})

test('multi lines', () => {
  const ret = miniopt(`
    [
      foo=123
      bar="hello"
    ]

  `)
  expect(ret).toEqual({foo: 123, bar: 'hello'})
})

test('multi lines with namespace', () => {
  const ret = miniopt(`
    [foo
      foo=123
      bar="hello"
    ]

  `)
  expect(ret).toEqual({foo: {foo: 123, bar: 'hello'}})
})
