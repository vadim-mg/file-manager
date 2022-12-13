const param = (name) => (name.length ? `"${name}"` : "")

export const NOT_NEED_PARAMS = (name = "") =>
  `command ${param(name)} doesn\'t support any parameters!`

export const NEED_PARAMS = (name, countParameters, parameters = "") =>
  `command ${param(name)} must have ${countParameters} ` +
  `parameter${countParameters > 1 ? "s" : ""} ${param(parameters)}`

export const NO_SUCH_PATH = (targetPath = "") =>
  `No such file or directory ${param(targetPath)}`

export const ALREADY_EXIST = (targetPath = "") =>
  `File ${param(targetPath)} already exists!`

export const NOT_PERMIT = "Operation not permitted"

export const UNKNOWN_ERROR = (code = "") => `Error with code:${param(code)}`

export const UNKNOWN_COMMAND = "Unknown command!"
