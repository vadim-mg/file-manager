import { logger } from "./logger.js"
import { currentDate } from "../utils/utils.js"

class fileManagerError extends Error {
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

class InvalidInputError extends fileManagerError {
  constructor(message) {
    super(message)
    this.name = "Invalid input"
  }
}
class OpFieldError extends fileManagerError {
  constructor(message, errorForDebug = null) {
    super(message, errorForDebug)
    this.name = "Operation failed"
  }
}

export { InvalidInputError, OpFieldError }
