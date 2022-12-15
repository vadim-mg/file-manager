import { fsCommands } from "../commands/nav_operations.js"
import { foCommands } from "../commands/file_operations.js"
import { osCommands } from "../commands/os_operations.js"
import { parseInputStr } from "../utils/utils.js"
import { InvalidInputError } from "../errors/errors.js"
import { errorHandler, checkParams } from "../errors/error_handler.js"

const executeCommand = async (inputString) => {
  try {
    const { commandName, commandArgv, error } = parseInputStr(inputString)

    if (error) throw new InvalidInputError("Not correct input data")

    if (commandName === "") return "" //if user entered only "enter", no errors, only new prompt

    const libs = [fsCommands, foCommands, osCommands]

    for (let i = 0; i < libs.length; i++) {
      const command = libs[i][commandName]
      if (command) {
        checkParams(commandName, commandArgv, command.argv.length, command.argv.join(" "))
        return await command.f(commandArgv)
      }
    }
    throw new InvalidInputError()
  } catch (error) {
    errorHandler(error)
  }
}

export { executeCommand }