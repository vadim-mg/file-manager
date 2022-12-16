const { stdin, stdout } = process
import { EOL } from "node:os"
import { executeCommand } from "./exec/exec.js"

const USER_NAME_ARG = "username"
const DEBUG_ARG = "debug"

const getArgs = () =>
  process.argv.slice(2).reduce((acc, val) => {
    const keyValue = val.split("=")
    acc[keyValue[0].slice(2)] = keyValue[1] ?? "Unknown"
    return acc
  }, {})

const echo = (text, eol = true) => stdout.write(text + (eol ? EOL : ""))

const prompt = () => echo(`You are currently in ${process.cwd()} # `, false)

const showError = (error) => {
  const debugMessage = debugMode ? ` : ${error.message}` : ""
  echo(error.name + debugMessage)
}

const sayGoodbye = (exitCode) => {
  if (exitCode === 0) {
    echo(`Thank you for using File Manager, ${userName}, goodbye!`)
  }
}

const sayHello = (userName) => {
  echo(`Welcome to the File Manager, ${userName}!`)
  prompt()
}

const dataHandler = async (data) => {
  try {
    const result = await executeCommand(data.toString().slice(0, -EOL.length))
    if (result.length) echo(result)
  } catch (error) {
    showError(error)
  } finally {
    prompt()
  }
}

const exit = () => {
  echo("")
  executeCommand(".exit")
}

stdin.on("data", dataHandler)
process.on("exit", sayGoodbye)
process.on("SIGINT", exit)

const args = getArgs()
const userName = args[USER_NAME_ARG]
const debugMode = args[DEBUG_ARG] ?? null

if (!userName) {
  echo(`Haven\'t been assign the parameter --${USER_NAME_ARG}=your_username. Try again.`)
  process.exit(1)
}

sayHello(userName)
