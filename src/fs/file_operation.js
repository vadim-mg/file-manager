import { checkParams } from "../errors/error_handler.js"
import { createReadStream } from "node:fs"
import { rename } from "node:fs/promises"
import { pathFromArgv } from "../utils/utils.js"
import { appendFile } from "node:fs/promises"

const cat = (argv = []) =>
  new Promise((resolve, reject) => {
    checkParams("cat", argv, 1, "path_to_file")

    const targetPath = pathFromArgv(argv)
    const stream = createReadStream(targetPath, {
      encoding: "utf-8",
    })

    stream.on("data", (chunk) => process.stdout.write(chunk))
    stream.on("end", () => resolve("\n"))
    stream.on("error", (error) => {
      stream.close()
      return reject(error)
    })
  })

const add = async (argv = []) => {
  checkParams("add", argv, 1, "new_file_name")
  const targetPath = pathFromArgv(argv)
  await appendFile(targetPath, "", { flag: "ax+" })
  return ""
}

const rn = async (argv = []) => {
  checkParams("rn", argv, 2, "path_to_file new_filename")
  await rename(argv[0], argv[1])
  return ""
}

const cp = (argv = []) => {
  checkParams("cp", argv, 2, "path_to_file path_to_new_file")
  return ""
}

const mv = (argv = []) => {
  checkParams("mv", argv, 2, "path_to_file path_to_new_file")
  return ""
}

const rm = (argv = []) => {
  checkParams("rm", argv, 1, "path_to_file")
  return ""
}

/* All functions in array must return a Promise ! */
const foCommands = {
  cat: cat,
  add: add,
  rn: rn,
  cp: cp,
  mv: mv,
  rm: rm,
}

export { foCommands }
