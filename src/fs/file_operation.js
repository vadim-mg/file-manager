import { InvalidInputError, OpFieldError } from "../errors/errors.js"
import * as errMsgs from "../errors/error_messages.js"

const cat = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(errMsgs.NEED_ONE_PARAM("cat", "path_to_file"))
      )
    }
    resolve("")
  })

const add = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(errMsgs.NEED_ONE_PARAM("add", "path_to_file"))
      )
    }
    resolve("")
  })

const rn = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          errMsgs.NEED_TWO_PARAMS("rn", "path_to_file new_filename")
        )
      )
    }
    resolve("")
  })

const cp = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          errMsgs.NEED_TWO_PARAMS("cp", "path_to_file path_to_new_directory")
        )
      )
    }
    resolve("")
  })

const mv = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(
          errMsgs.NEED_TWO_PARAMS("mv", "path_to_file path_to_new_directory")
        )
      )
    }
    resolve("")
  })

const rm = (argv = []) =>
  new Promise((resolve, reject) => {
    if (!argv.length) {
      reject(
        new InvalidInputError(errMsgs.NEED_ONE_PARAM("rm", "path_to_file"))
      )
    }
    resolve("")
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
