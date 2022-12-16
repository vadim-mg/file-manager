import { readFile } from "node:fs/promises"
const { createHash } = await import("node:crypto")

const hash = async (argv) => {
  const hashedFile = await readFile(argv[0])
  const hash = createHash("sha256")
  return hash.update(hashedFile).digest("hex") + '\n'
}

/* All functions in array must be async ! */
/* All errors will handle in parent function by function errorHandler */
const hashCommands = {
  "hash": { f: hash, argv: ["path_to_file"] },
}

export { hashCommands }