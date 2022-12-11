import { Console } from "node:console"
import { createWriteStream } from "node:fs"
import { normalize } from "node:path"

const debugOutput = createWriteStream(normalize(process.cwd() + "/debug.log"))
const debugErrorOutput = createWriteStream(
  normalize(process.cwd() + "/errors.log")
)
const logger = new Console({ stdout: debugOutput, stderr: debugErrorOutput })

export {logger}