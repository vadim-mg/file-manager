import { homedir } from "os"
import {dirname} from "node:path"
import {InvalidInputError} from "../errors/errors.js"
let workingDir = homedir()



const prompt = () => `You are currently in ${workingDir} # `

const up = (argv = []) => {
  if(argv.length){
    throw new InvalidInputError('command "up" doesn\'t support any parameters!')
  }
  workingDir = dirname(workingDir)
  return ''
}

const cd = () => {
  console.log()
}

const ls = () => "ls!"

const fsCommands = {
  'up': up,
  'cd': cd,
  'ls': ls,
}
export { prompt, fsCommands }
