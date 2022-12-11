import { homedir } from "os"
import { dirname } from "node:path"
import { InvalidInputError } from "../errors/errors.js"
import * as errMsgs from "../errors/error_messages.js"
import { readdir } from "node:fs/promises"
import { caseInsensitiveSort, pathFromArgv } from "../utils/utils.js"

process.chdir(homedir())

const prompt = () => `You are currently in ${process.cwd()} # `

const up = (argv = []) =>
  new Promise((resolve, reject) => {
    if (argv.length) {
      reject(new InvalidInputError(errMsgs.NOT_NEED_PARAMS("up")))
    } else {
      process.chdir(dirname(process.cwd()))
      resolve("")
    }
  })

const cd = (argv) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      return reject(
        new InvalidInputError(errMsgs.NEED_ONE_PARAM("cd", "target directory"))
      )
    }
    try {
      const targetPath = pathFromArgv(argv)
      console.log(targetPath)
      process.chdir(targetPath)
      return resolve("")
    } catch (error) {
      return reject(error)
    }
  })

const ls = (argv = []) =>
  new Promise((resolve, reject) =>
    argv.length
      ? reject(new InvalidInputError(errMsgs.NOT_NEED_PARAMS(ls.name)))
      : readdir(process.cwd(), { withFileTypes: true }).then((fsObjects) => {
          fsObjects = fsObjects.reduce(
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

          const setTypeFile = (val) => new Object({ name: val, type: "file" })
          const setTypeDir = (val) => new Object({ name: val, type: "directory" })

          fsObjects.files = fsObjects.files.sort(caseInsensitiveSort).map(setTypeFile)
          fsObjects.dirs = fsObjects.dirs.sort(caseInsensitiveSort).map(setTypeDir)

          console.table(fsObjects.dirs.concat(fsObjects.files))
          resolve("")
        })
  )

/* All functions in array must return a Promise ! */
const fsCommands = {
  up: up,
  cd: cd,
  ls: ls,
  ".exit": () => process.exit(0),
}

export { prompt, fsCommands }
