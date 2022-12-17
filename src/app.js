import { EOL } from "node:os"
import { executeCommand } from "./controllers/exec.js"
import {
  USER_NAME_ARG,
  DEBUG_ARG,
  HELP_ARG,
  ARG_KEYS,
  getArgs,
} from "./controllers/app_args.js"
import {
  echo,
  prompt,
  showError,
  sayGoodbye,
  sayHello,
  printAllArgs,
} from "./controllers/output_commands.js"

/**
 * tries execute command from steam Buffer
 * push result or Error in STDOUT
 * @param {Buffer} data
 */
const dataHandler = async (data) => {
  try {
    const result = await executeCommand(data.toString().slice(0, -EOL.length))
    if (result.length) echo(result)
  } catch (error) {
    showError(error, args[DEBUG_ARG])
  } finally {
    prompt()
  }
}

const exit = (code) => {
  if (code === 0) echo("")
  process.exit(code)
}

//add handlers
process.stdin.on("data", dataHandler)
process.on("SIGINT", () => exit(0))
process.on("exit", (code) => {
  if (code === 0) sayGoodbye(args[USER_NAME_ARG])
})

//read arguments for file-manager
const { args, hasError } = getArgs()

if (hasError) exit(1)

if (args[HELP_ARG]) {
  printAllArgs(ARG_KEYS)
  exit(1)
}

//starts work
sayHello(args[USER_NAME_ARG])
