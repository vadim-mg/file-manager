import { createBrotliCompress, createBrotliDecompress } from "node:zlib"
import { createReadStream, createWriteStream } from "node:fs"
import { pipeline } from "node:stream/promises"

const pipeZipMethod = async (srcPath, destPath, func = null) => {
  const srcStream = createReadStream(srcPath)
  //If there isn't source file, correct exception will be catch to parent function
  if (!srcStream.fd) {
    srcStream.open
  }
  const destStream = createWriteStream(destPath)
  await pipeline(srcStream, func(), destStream)
}

const compress = async (argv) => {
  let destPath = argv[1] + (argv[1].endsWith(".br") ? "" : ".br")
  await pipeZipMethod(argv[0], destPath, createBrotliCompress)
  return `File ${argv[0]} was compressed to  ${destPath}!`
}

const decompress = async (argv) => {
  await pipeZipMethod(argv[0], argv[1], createBrotliDecompress)
  return `File ${argv[0]} was decompressed to  ${argv[1]}!`
}

/* All functions in array must be async ! */
/* All errors will handle in parent function by function errorHandler */
export const compressCommands = {
  compress: { f: compress, argv: ["path_to_file", "path_to_destination"] },
  decompress: { f: decompress, argv: ["path_to_file", "path_to_destination"] },
}
