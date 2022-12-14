import { resolve } from "node:path"

const caseInsensitiveSort = (a, b) => {
  a = a.toLowerCase
  b = b.toLowerCase

  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

const currentDate = () => {
  let ts = Date.now()
  let date_ob = new Date(ts)
  let date = date_ob.getDate()
  let month = date_ob.getMonth() + 1
  let year = date_ob.getFullYear()
  return year + "-" + month + "-" + date
}

const pathFromArgv = (argv) => resolve(argv.join(" ").replace(/^\"|\"$/g, ""))

const parseInputStr = (inputString) => {
  const words = []
  let countWords = 0
  let wordInBrackets = false
  let error = false
  for (let i = 0; i < inputString.length; i++) {
    let char = inputString[i]
    if (words.length === countWords) {
      words.push("")
    }
    switch (char) {
      case '"':
        if (words[countWords].length && !wordInBrackets) {
          error = true
        }
        if (wordInBrackets) {
          countWords++
        }
        wordInBrackets = !wordInBrackets
        break
      case " ":
        if (!wordInBrackets) {
          if (words[countWords] !== "") {
            countWords++
          }
          break
        }
      default:
        words[countWords] += char
    }
  }
  if (wordInBrackets) {
    error = true
  }
  return { commandName: words.shift(), commandParams: words, error }
}

export { caseInsensitiveSort, currentDate, pathFromArgv, parseInputStr }
