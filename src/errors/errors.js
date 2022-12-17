import { logger } from "./logger.js"
import { currentDate } from "../utils/utils.js"
import { UNKNOWN_COMMAND } from "./error_messages.js"

class FileManagerError extends Error {
  constructor(message, errorForDebug = null) {
    super(message)
    this.errorForDebug = errorForDebug
    if (errorForDebug) {
      logger.error(`--------${currentDate()}---------`)
      logger.error(`${this.name}:${this.message}`)
      logger.error(this.errorForDebug)
      logger.error("---------------------------")
    }
  }
}

class InvalidInputError extends FileManagerError {
  constructor(message = UNKNOWN_COMMAND) {
    super(message)
    this.name = "Invalid input"
  }
}
class OpFieldError extends FileManagerError {
  constructor(message, errorForDebug = null) {
    super(message, errorForDebug)
    this.name = "Operation failed"
  }
}

export { InvalidInputError, OpFieldError, FileManagerError }
