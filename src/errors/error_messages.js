const param = (name) => (name.length ? `"${name}"` : "")

export const NOT_NEED_PARAMS = (name = "") =>
  `command ${param(name)} doesn\'t support any parameters!`

export const NEED_ONE_PARAM = (name = "", parameters = "") =>
  `command ${param(name)} must have one parameter ${param(parameters)}`

export const NEED_TWO_PARAMS = (name = "", parameters = "") =>
  `command ${param(name)} must have two parameters ${param(parameters)}`

export const NO_SUCH_PATH = (targetPath = "") =>
  `No such file or directory ${param(targetPath)}`

export const ALREADY_EXIST = (targetPath = "") =>
  `File ${param(targetPath)} already exists!`

export const NOT_PERMIT = "Operation not permitted"

export const UNKNOWN = (code = "") => `Error with code:${param(code)}`
