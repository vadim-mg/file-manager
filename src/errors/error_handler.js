import { InvalidInputError, FileManagerError, OpFieldError } from "../errors/errors.js"
import * as errMsgs from "../errors/error_messages.js"

/**
 * Error handler for system errors
 * replaces system errors with custom ones, and throw custom
 * @param {*} err 
 */
export const errorHandler = (err) => {
  if (err instanceof FileManagerError) {
    throw err
  }
  switch (err.code) {
    case "ENOENT":
      throw new OpFieldError(errMsgs.NO_SUCH_PATH(err.dest ?? err.path), err)
    case "EEXIST":
      throw new OpFieldError(errMsgs.ALREADY_EXIST(err.dest ?? err.path), err)
    case "EPERM":
      throw new OpFieldError(errMsgs.NOT_PERMIT, err)
    default:
      throw new OpFieldError(errMsgs.UNKNOWN_ERROR(err.code), err)
  }
}

/**
 * Check command parameters. If there is even one invalid parameter,
 * than will be throw exception, which should be catched parent function
 * @param {*} cmd -cmd name
 * @param {*} argv - parameters for execute command
 * @param {*} needCount 
 * @param {*} needParams 
 */
export const checkParams = (cmd, argv, needCount, needParams = "") => {
  if (argv.length && !needCount) {
    throw new InvalidInputError(errMsgs.NOT_NEED_PARAMS(cmd))
  }
  if (argv.length !== needCount) {
    throw new InvalidInputError(errMsgs.NEED_PARAMS(cmd, needCount, needParams))
  }
}
