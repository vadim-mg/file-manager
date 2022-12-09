const { stdin, stdout } = process

const userNameArg = "username"

// stdin.on("data", (data) => {
//   // stdout.write(data)
// })
stdin.resume()

process.on("exit", (exitCode) => {
  if (exitCode === 0) {
    stdout.write(`Thank you for using File Manager, ${userName}, goodbye!\n`)
  } else {
    stdout.write(`An error has occurred! ExitCode: ${exitCode}`)
  }
})

/* exit on ctrl-C */
process.on("SIGINT", function () {
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

console.log(`Welcome to the File Manager, ${userName}!`)
