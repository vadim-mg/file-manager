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

export { caseInsensitiveSort, currentDate, pathFromArgv }
