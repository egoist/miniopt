export default function miniopt(input) {
  const RE = /\[\n*(?:([\w]+)\s+)?\n*([^\]]+)\n*\]/g
  const arr = RE.exec(input)
  if (!input || !arr) {
    return null
  }

  const namespace = arr[1]
  const content = arr[2].match(/(?:[^\s"]+|"[^"]*")+/g)

  const result = content.reduce((current, next) => {
    const splited = next.split('=')
    const value = splited[1] ? JSON.parse(splited[1]) : true
    const key = splited[0]
    if (current[key]) {
      if (Array.isArray(current[key])) {
        current[key].push(value)
      } else {
        current[key] = [current[key], value]
      }
    } else {
      current[key] = value
    }
    return current
  }, {})

  if (namespace) {
    return {[namespace]: result}
  }
  return result
}
