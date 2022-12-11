import { fsCommands } from "../fs/navigation.js"
import { foCommands } from "../fs/file_operation.js"
import { EOL } from "node:os"
import { InvalidInputError } from "../errors/errors.js"

const libraries = [fsCommands, foCommands]

const executeCommand = (data) =>
  new Promise(async (resolve, reject) => {
    const inputString = data.toString().slice(0, -EOL.length)
    const commandArgv = inputString.trim().split(" ")
    const commandName = commandArgv.shift()
    if (commandName === "") {
      resolve("")
    }

    for (let i = 0; i < libraries.length; i++) {
      if (libraries[i][commandName]) {
        return await libraries[i][commandName](commandArgv)
          .then((result) => resolve(result))
          .catch((err) => reject(err))
      }
    }

    reject(new InvalidInputError("Unknown command!"))
  })

export { executeCommand }
