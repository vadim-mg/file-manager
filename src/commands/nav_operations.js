import { homedir } from "os"
import { dirname } from "node:path"
import { readdir } from "node:fs/promises"
import { checkParams } from "../errors/error_handler.js"
import { caseInsensitiveSort } from "../utils/utils.js"

process.chdir(homedir())

const prompt = () => `You are currently in ${process.cwd()} # `

const up = async (argv = []) => {
  checkParams("up", argv, 0)
  process.chdir(dirname(process.cwd()))
  return ""
}

const cd = async (argv = []) => {
  checkParams("cd", argv, 1, "target directory")
  process.chdir(argv[0])
  return ""
}

const ls = async (argv = []) => {
  checkParams("ls", argv, 0)
  const dirList = await readdir(process.cwd(), { withFileTypes: true })
  const { dirs, files } = dirList.reduce(
    (acc, val) => {
      if (val.isDirectory()) {
        acc.dirs.push(val.name)
      } else if (val.isFile()) {
        acc.files.push(val.name)
      }
      return acc
    },
    { files: [], dirs: [] }
  )

  const sortList = async (list, type) =>
    list.sort(caseInsensitiveSort).map((name) => new Object({ name, type }))

  await Promise.all([sortList(dirs, "directory"), sortList(files, "file")]).then(
    ([dirs, files]) => console.table([...dirs, ...files])
  )

  return ""
}

/* All functions in array must return a Promise ! */
const fsCommands = {
  up: up,
  cd: cd,
  ls: ls,
  ".exit": () => process.exit(0),
}

export { prompt, fsCommands }
