import { fsCommands } from "../commands/nav_operations.js"
import { foCommands } from "../commands/file_operations.js"
import { parseInputStr } from "../utils/utils.js"
import { InvalidInputError } from "../errors/errors.js"
import { errorHandler } from "../errors/error_handler.js"

const executeCommand = async (inputString) => {
  try {
    const { commandName, commandParams, error } = parseInputStr(inputString)

    if(error){
      throw new InvalidInputError('Not correct input data')
    }

    if (commandName === "") return ""

    const libs = [fsCommands, foCommands]

    for (let i = 0; i < libs.length; i++) {
      if (libs[i][commandName]) {
        return await libs[i][commandName](commandParams)
      }
    }
    throw new InvalidInputError()
  } catch (error) {
    errorHandler(error)
  }
}

export { executeCommand }
