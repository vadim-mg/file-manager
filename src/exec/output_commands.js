import { EOL } from "node:os"

/**
 * write 'text' into stdout
 * @param {string} text 
 * @param {bool} eol - if true, then line will end with EOL
 * @returns 
 */
export const echo = (text, eol = true) => process.stdout.write(text + (eol ? EOL : ""))

export const prompt = () => echo(`You are currently in ${process.cwd()} # `, false)

export const showError = (error, isDebag) => {
  const debugMessage = isDebag ?? null ? ` : ${error.message}` : ""
  echo(error.name + debugMessage)
}

export const sayGoodbye = (userName) => {
  echo(`Thank you for using File Manager, ${userName ?? "Unknown user"}, goodbye!`)
}

export const sayHello = (userName) => {
  echo(`Welcome to the File Manager, ${userName ?? "Unknown user"}!`)
  prompt()
}

export const printAllArgs = (args) => {
  echo("All supported arguments:")
  args.forEach((element) => {
    echo(`    --${element}`)
  })
}