import { homedir } from "os"
import { dirname } from "node:path"
import { readdir } from "node:fs/promises"
import { caseInsensitiveSort } from "../utils/utils.js"

process.chdir(homedir())

const prompt = () => `You are currently in ${process.cwd()} # `

const up = async (argv = []) => {
  process.chdir(dirname(process.cwd()))
  return ""
}

const cd = async (argv = []) => {
  process.chdir(argv[0])
  return ""
}

const ls = async (argv = []) => {
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

const exit = (code) => {
  process.exit(0)
}

const fsCommands = {
  "up": { f: up, argv: [] },
  "cd": { f: cd, argv: ["target directory"] },
  "ls": { f: ls, argv: [] },
  ".exit": { f: exit, argv: [] },
}

export { prompt, fsCommands }
