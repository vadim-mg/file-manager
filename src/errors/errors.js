class InvalidInputError extends Error {
  constructor(message) {
    super(message)
    this.name = "Invalid input"
  }
}
class OperationFailedError extends Error {
  constructor(message) {
    super(message)
    this.name = "Operation failed"
  }
}

export { InvalidInputError, OperationFailedError }
