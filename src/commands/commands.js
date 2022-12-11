import { fsCommands } from "../fs/navigation.js"
import { foCommands } from "../fs/file_operation.js"
import { EOL } from "node:os"
import { InvalidInputError, FileManagerError, OpFieldError } from "../errors/errors.js"
import * as errMsgs from "../errors/error_messages.js"
import { sep } from "node:path"

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
          .catch((err) => {
            if (err instanceof FileManagerError) {
              return reject(err)
            }
            switch (err.code) {
              case "ENOENT":
                return reject(new OpFieldError(errMsgs.NO_SUCH_PATH(err.dest ?? err.path), err))
              case "EPERM":
                return reject(new OpFieldError(errMsgs.NOT_PERMIT, err))
              default:
                return reject(new OpFieldError(errMsgs.UNKNOWN(err.code), err))
            }
          })
      }
    }

    reject(new InvalidInputError("Unknown command!"))
  })

export { executeCommand }
