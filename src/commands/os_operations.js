import { homedir, EOL, cpus, userInfo, arch } from "os"
import { InvalidInputError } from "../errors/errors.js"
import { NOT_SUPPORTED_PARAM } from "../errors/error_messages.js"

const os = async (argv) => {
  switch (argv[0]) {
    case "--EOL":
      return JSON.stringify(EOL) + EOL
    case "--cpus":
      const cpu = cpus()
      const cpuCount = cpu.length
      const model = cpu[0].model
      const speed = cpu[0].speed
      return (
        `${cpuCount} CPU${cpuCount > 1 ? "s" : ""}:${EOL}` +
        `   model: ${model}${EOL}` +
        `   speed: ${speed / 1000} Gz${EOL}`
      )
    case "--homedir":
      return homedir + EOL
    case "--username":
      return userInfo().username + EOL
    case "--architecture":
      return arch() + EOL
    default:
      throw new InvalidInputError(NOT_SUPPORTED_PARAM)
  }
}

/* All functions in array must be async ! */
/* All errors will handle in parent function by function errorHandler */
const osCommands = {
  os: { f: os, argv: ["--parameter"] },
}

export { osCommands }