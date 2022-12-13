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
  const commandRegExp = /^\s*\w+/
  const paramRegExp =
    /(\s+[a-zA-Zа-яА-Я0-9\_\\\/\:\-\.\?\+]+|\s+\"[\ \a-zA-Zа-яА-Я0-9\_\\\/\:\-\.\?\+]+\")/g

  inputString = inputString.trim()
  let cmdName = commandRegExp.exec(inputString, "")

  if (!cmdName) {
    return { commandName: "", commandParams: "" }
  }
  cmdName = cmdName[0].trim()

  const params = []
  let result = inputString.match(paramRegExp)
  if (result) {
    result.forEach((inputString) => {
      params.push(inputString.trim().replace(/\"/g, ""))
    })
  }
  return { commandName: cmdName, commandParams: params }
}

export { caseInsensitiveSort, currentDate, pathFromArgv, parseInputStr }
