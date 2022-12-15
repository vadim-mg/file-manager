const { stdin, stdout } = process
import { EOL } from "node:os"
import { prompt } from "./commands/nav_operations.js"
import { executeCommand } from "./exec/exec.js"

const userNameArg = "username"

stdin.on("data", async (data) => {
  try {
    const result = await executeCommand(data.toString().slice(0, -EOL.length))
    stdout.write(result)
  } catch (error) {
    stdout.write(`${error.name} : ${error.message} \n`)
  } finally {
    stdout.write(prompt())
  }
})

process.on("exit", (exitCode) => {
  if (exitCode === 0) {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  } else {
    stdout.write(`An error has occurred! ExitCode: ${exitCode}\n`)
  }
})

/* exit on ctrl-C */
process.on("SIGINT", function () {
  stdout.write("\n")
  process.exit(0)
})

const args = process.argv.slice(2).reduce((acc, val, i) => {
  const keyValue = val.split("=")
  acc[keyValue[0].slice(2)] = keyValue[1]
  return acc
}, {})

const userName = args[userNameArg]

if (!userName) {
  console.error(
    `Haven\'t been assign the parameter --${userNameArg}=your_username. Set it and try again.`
  )
  process.exit(1)
}

stdout.write(`Welcome to the File Manager, ${userName}!\n`)
stdout.write(prompt())
