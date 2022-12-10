import { homedir } from "os"
import { dirname } from "node:path"
import { InvalidInputError } from "../errors/errors.js"
import { readdir } from "node:fs/promises"
import { caseInsensitiveSort } from "../utils/utils.js"
let workingDir = homedir()

const prompt = () => `You are currently in ${workingDir} # `

const up = (argv = []) => {
  return new Promise((resolve, reject) => {
    if (argv.length) {
      reject(
        new InvalidInputError('command "up" doesn\'t support any parameters!')
      )
    }
    workingDir = dirname(workingDir)
    resolve("")
  })
}

const cd = (argv) => {
  console.log(argv)
}

const ls = (argv = []) => {
  return new Promise((resolve, reject) => {
    if (argv.length) {
      reject(
        new InvalidInputError('command "ls" doesn\'t support any parameters!')
      )
    } else {
      return readdir(workingDir, { withFileTypes: true }).then((fsObjects) => {
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

        fsObjects.files = fsObjects.files
          .sort(caseInsensitiveSort)
          .map(setTypeFile)
        fsObjects.dirs = fsObjects.dirs
          .sort(caseInsensitiveSort)
          .map(setTypeDir)

        console.table(fsObjects.dirs.concat(fsObjects.files))
        resolve("")
      })
    }
  })
}

/* All functions in array must return a Promise ! */
const fsCommands = {
  up: up,
  cd: cd,
  ls: ls,
}

export { prompt, fsCommands }
