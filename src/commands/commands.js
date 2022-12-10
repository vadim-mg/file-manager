import { fsCommands } from "../fs/navigation.js"
import { EOL } from "node:os"
import { InvalidInputError } from "../errors/errors.js"

const executeCommand = (data) =>
  new Promise(async (resolve, reject) => {
    const inputString = data.toString().slice(0, -EOL.length)
    const commandArgv = inputString.trim().split(" ")
    const commandName = commandArgv.shift()
    if (commandName == "") {
      resolve("")
    }
    if (!fsCommands[commandName]) {
      reject(new InvalidInputError("Unknown command!"))
    } else {
      await fsCommands[commandName](commandArgv)
        .then((result) => resolve(result))
        .catch((err) => reject(err))
    }
  })

export { executeCommand }
