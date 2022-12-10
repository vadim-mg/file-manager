class InvalidInputError extends Error {
  constructor(message) {
    super(message)
    this.name = "InvalidInput"
  }
}

export { InvalidInputError }
