import { homedir } from "os"
import { dirname, resolve as pathResolve } from "node:path"
import { InvalidInputError, OperationFailedError } from "../errors/errors.js"
import { readdir } from "node:fs/promises"
import { caseInsensitiveSort } from "../utils/utils.js"

process.chdir(homedir())

const prompt = () => `You are currently in ${process.cwd()} # `

const up = (argv = []) =>
  new Promise((resolve, reject) => {
    if (argv.length) {
      reject(
        new InvalidInputError('command "up" doesn\'t support any parameters!')
      )
    }
    process.chdir(dirname(process.cwd()))

    resolve("")
  })

const cd = (argv) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          'command "cd" must have one parameter - target directory'
        )
      )
    }

    const targetPath = argv
      .join(" ")
      .trim(" ")
      .replace(/^\"|\"$/g, "")

    try {
      process.chdir(targetPath)
    } catch (error) {
      switch (error.code) {
        case "ENOENT":
          reject(new InvalidInputError(`No such directory: "${targetPath}"`))
          break
        case "EPERM":
          reject(new OperationFailedError(`Operation not permitted`))
        default:
          reject(new OperationFailedError(`Error with code:${error.code}`))
          console.log("-------------------------debug-----------------------")
          console.log(error)
          console.log("-------------------------debug-----------------------")
      }
    }

    resolve("")
  })

const ls = (argv = []) =>
  new Promise((resolve, reject) => {
    if (argv.length) {
      reject(
        new InvalidInputError('command "ls" doesn\'t support any parameters!')
      )
    } else {
      return readdir(process.cwd(), { withFileTypes: true }).then(
        (fsObjects) => {
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
          const setTypeDir = (val) =>
            new Object({ name: val, type: "directory" })

          fsObjects.files = fsObjects.files
            .sort(caseInsensitiveSort)
            .map(setTypeFile)
          fsObjects.dirs = fsObjects.dirs
            .sort(caseInsensitiveSort)
            .map(setTypeDir)

          console.table(fsObjects.dirs.concat(fsObjects.files))
          resolve("")
        }
      )
    }
  })

/* All functions in array must return a Promise ! */
const fsCommands = {
  up: up,
  cd: cd,
  ls: ls,
  ".exit": () => process.exit(0),
}

export { prompt, fsCommands }
