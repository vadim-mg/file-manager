import { createReadStream, createWriteStream } from "node:fs"
import { rename, appendFile, rm as rmFile } from "node:fs/promises"
import { resolve, parse } from "node:path"
import { pipeline } from "node:stream/promises"

const cat = (argv) =>
  new Promise((res, rej) => {
    const stream = createReadStream(argv[0], { encoding: "utf-8" })

    stream.on("data", (chunk) => process.stdout.write(chunk))
    stream.on("end", () => res(""))
    stream.on("error", (error) => {
      stream.close()
      return rej(error)
    })
  })

const add = async (argv) => {
  await appendFile(argv[0], "", { flag: "ax+" })
  return ""
}

const rn = async (argv) => {
  await rename(argv[0], argv[1])
  return ""
}

const cp = async (argv) => {
  const srcPath = argv[0]
  const destPath = resolve(argv[1], parse(srcPath).base)

  const srcStream = createReadStream(srcPath)
  if (!srcStream.fd) {
    //If there isn't source file, correct exception will be catch to parent function
    srcStream.open
  }
  const destStream = createWriteStream(destPath)
  await pipeline(srcStream, destStream)
  return ""
}

const mv = async (argv) => {
  await cp(argv)
  await rm([argv[0]])
  return ""
}

const rm = async (argv) => {
  await rmFile(argv[0])
  return ""
}

/* All functions in array must be async ! */
/* All errors will handle in parent function by function errorHandler */
export const foCommands = {
  cat: { f: cat, argv: ["path_to_file"] },
  add: { f: add, argv: ["new_file_name"] },
  rn: { f: rn, argv: ["path_to_file", "new_filename"] },
  cp: { f: cp, argv: ["path_to_file", "path_to_new_directory"] },
  mv: { f: mv, argv: ["path_to_file", "path_to_new_directory"] },
  rm: { f: rm, argv: ["path_to_file"] },
}
