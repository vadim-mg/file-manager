import { InvalidInputError, OpFieldError } from "../errors/errors.js"
import * as errMsgs from "../errors/error_messages.js"
import * as path from "node:path"
import { createReadStream } from "node:fs"
import { pathFromArgv } from "../utils/utils.js"

const cat = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      return reject(new InvalidInputError(errMsgs.NEED_ONE_PARAM("cat", "path_to_file")))
    }

    const targetPath = pathFromArgv(argv)
    const stream = createReadStream(targetPath, {
      encoding: "utf-8",
    })

    stream.on("data", (chunk) => process.stdout.write(chunk))
    stream.on("end", () => resolve(""))
    stream.on("error", (error) => {
      stream.close()
      return reject(error)
    })
  })

const add = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(new InvalidInputError(errMsgs.NEED_ONE_PARAM("add", "path_to_file")))
    } else {
      resolve("")
    }
  })

const rn = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(errMsgs.NEED_TWO_PARAMS("rn", "path_to_file new_filename"))
      )
    } else {
      resolve("")
    }
  })

const cp = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          errMsgs.NEED_TWO_PARAMS("cp", "path_to_file path_to_new_directory")
        )
      )
    } else {
      resolve("")
    }
  })

const mv = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          errMsgs.NEED_TWO_PARAMS("mv", "path_to_file path_to_new_directory")
        )
      )
    } else {
      resolve("")
    }
  })

const rm = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(new InvalidInputError(errMsgs.NEED_ONE_PARAM("rm", "path_to_file")))
    } else {
      resolve("")
    }
  })

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
