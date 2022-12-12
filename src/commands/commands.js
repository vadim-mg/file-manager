import { fsCommands } from "../fs/navigation.js"
import { foCommands } from "../fs/file_operation.js"
import { EOL } from "node:os"
import { InvalidInputError } from "../errors/errors.js"
import { errorHandler } from "../errors/error_handler.js"

const executeCommand = async (inputString) => {
  try {
    const commandArgv = inputString.trim().split(" ")
    const commandName = commandArgv.shift()

    if (commandName === "") return ""

    const libs = [fsCommands, foCommands]

    for (let i = 0; i < libs.length; i++) {
      if (libs[i][commandName]) {
        return await libs[i][commandName](commandArgv)
      }
    }
    throw new InvalidInputError()
  } catch (error) {
    errorHandler(error)
  }
}

export { executeCommand }
