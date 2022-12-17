export const USER_NAME_ARG = "username"
export const DEBUG_ARG = "debug"
export const HELP_ARG = "help"
export const ARG_KEYS = [USER_NAME_ARG, DEBUG_ARG, HELP_ARG]

/**
 * Parse process.argv, contain arguments: key1=value1 [key2=value2 ...] [key3 ...]
 * @returns { 
 *            args: {
 *                    key:value,
 *                    ...
 *                  }
 *            hasError: - if were invalid arguments 
 *          }
 */
export const getArgs = () =>
  process.argv.slice(2).reduce(
    (acc, val) => {
      const keyValues = val.split("=")
      const key = keyValues[0].slice(2)
      if (!ARG_KEYS.includes(key)) {
        console.error(
          `Not supported argument: "--${key}.` +
            ` You can use --help for more information"`
        )
        acc.hasError = true
        return acc
      }
      const value = keyValues[1] ?? "Unknown"
      acc.args[key] = value
      return acc
    },
    { args: {}, hasError: false }
  )
