import { libs } from "../commands/all_operations.js"
import { parseInputStr } from "../utils/utils.js"
import { InvalidInputError } from "../errors/errors.js"
import { errorHandler, checkParams } from "../errors/error_handler.js"

const executeCommand = async (inputString) => {
  try {
    const { commandName, commandArgv, error } = parseInputStr(inputString)

    if (error) throw new InvalidInputError("Not correct input data")

    if (commandName === "") return "" //if user entered only "enter", no errors, only new prompt
    if (commandName === "help") return help()

    for (let i = 0; i < libs.length; i++) {
      const command = libs[i][commandName]
      if (command) {
        checkParams(commandName, commandArgv, command.argv.length, command.argv.join(" "))
        return await command.f(commandArgv)
      }
    }
    throw new InvalidInputError()
  } catch (error) {
    await errorHandler(error)
  }
}

const help = () =>
  "\nAll supported commands:\n" +
  libs.reduce((accLib, valLib) => {
    let argv = ""
    for (var key in valLib) {
      argv =
        argv +
        "    " +
        valLib[key].argv.reduce((accArgs, valArgs) => accArgs + " " + valArgs, key) +
        "\n"
    }
    return accLib + argv + "\n"
  }, "")

export { executeCommand }
