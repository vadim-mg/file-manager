import { checkParams } from "../errors/error_handler.js"
import { createReadStream, createWriteStream } from "node:fs"
import { rename, appendFile, rm as rmFile } from "node:fs/promises"
import { resolve as resolvePath, parse } from "node:path"
import { pipeline } from "node:stream/promises"

const cat = (argv = []) =>
  new Promise((resolve, reject) => {
    checkParams("cat", argv, 1, "path_to_file")
    const stream = createReadStream(argv[0], { encoding: "utf-8" })

    stream.on("data", (chunk) => process.stdout.write(chunk))
    stream.on("end", () => resolve("\n"))
    stream.on("error", (error) => {
      stream.close()
      return reject(error)
    })
  })

const add = async (argv = []) => {
  checkParams("add", argv, 1, "new_file_name")
  await appendFile(argv[0], "", { flag: "ax+" })
  return ""
}

const rn = async (argv = []) => {
  checkParams("rn", argv, 2, "path_to_file new_filename")
  await rename(argv[0], argv[1])
  return ""
}

const cp = async (argv = []) => {
  checkParams("cp", argv, 2, "path_to_file path_to_new_directory")
  const srcPath = argv[0]
  const destPath = resolvePath(argv[1], parse(srcPath).base)

  const srcStream = createReadStream(srcPath)
  if (!srcStream.fd) {
    //If there isn't source file, correct exception will be catch to parent function
    srcStream.open
  }
  const destStream = createWriteStream(destPath)
  await pipeline(srcStream, destStream)
  return ""
}

const mv = async (argv = []) => {
  checkParams("mv", argv, 2, "path_to_file path_to_new_directory")
  await cp(argv)
  await rm([argv[0]])
  return ""
}

const rm = async (argv = []) => {
  checkParams("rm", argv, 1, "path_to_file")
  await rmFile(argv[0])
  return ""
}

/* All functions in array must be async ! */
/* All errors will handle in parent function by function errorHandler */
const foCommands = {
  cat: cat,
  add: add,
  rn: rn,
  cp: cp,
  mv: mv,
  rm: rm,
}

export { foCommands }
