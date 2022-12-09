import { prompt, fsCommands } from "../fs/navigation.js"
import { EOL } from "node:os"
import { InvalidInputError } from "../errors/errors.js"

const executeCommand = (data) => {
  try {
    const inputString = data.toString().slice(0, -EOL.length)
    const commandArgv = inputString.split(" ")
    const commandName = commandArgv.shift()
    if (!fsCommands[commandName]) {
      throw new InvalidInputError("Unknown command!")
    }
    return fsCommands[commandName](commandArgv) + prompt()
  } catch (error) {
    let errorText = ""
    if (error instanceof InvalidInputError) {
      errorText = error.message
    } else {
      errorText = "Operation Failed"
    }
    return errorText + "\n" + prompt()
  }
}

export { executeCommand }
