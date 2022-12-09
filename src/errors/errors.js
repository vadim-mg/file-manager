class InvalidInputError extends Error {
  constructor(message) {
    super(`Invalid input: ${message}`);
    this.name = "InvalidInputError"; 
  }
}

export {InvalidInputError}