import { parseInputStr } from "./utils.js"

const words = [
  '  ls   "ва ваю.txt"   "фыва.txt"  ',
  " commadnd commm",
  "commadnd param1/pdf-fd_df.txt param2/-+df123QWEqeавыающщюю.exe",
  'ls "ва ваю.txt" "фыва.txt"',
  'csDdf "ваываю ва ваю.txt" "фыва\\3309123пва ваыва./ю ва ваю.txt"',
  'cat    "апва ваыв?_-+-аю ва ваю.txt"  "фывапва ваываю ва ваю.txt"',
  'cat    "апва ваыв?_-+-аю ва ваю.txt"',
  'cat    "апва ваыв?_-+-аю ва ваю.txt"  "фывапва ваываю ва ваю.txt"  ',
  "ls",
  'cat    "апва ваыв?_-+-аю ва ваю.txt"  "фывапва ваываю ва ваю.txt"',
  'cp "qqq 4.txt" "qqq 5.txt',
  'cp qqq 4.txt" "qqq 5.txt',
  'cp qqq 4.txt "qqq 5.txt',
  'cp qqq 4".txt ',
]
console.log(
  `----------------------------------------------------------------------------------------------------`
)
console.log(
  `----------------------------------------------------------------------------------------------------`
)

words.forEach((val) => {
  const parsed = parseInputStr(val)
  console.log(parsed)
  console.log("------------------------------")
})
