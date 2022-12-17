### File-manager

deadline: 2022-12-20
Self-Score: 330
---
- [task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/assignment.md)
- [scoring](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/file-manager/score.md)
---
### The file manager an to the following:

- Work using CLI
- Perform basic file operations (copy, move, delete, rename, etc.)
- Utilize Streams API
- Get information about the host machine operating system
- Perform hash calculations
- Compress and decompress files

---

### Run app
```
npm start -- --username=your_username
```
or for --username=TESTUSER:
```
npm test
```
or for --username=TESTUSER in debug mode (errors will be more informative):
```
npm run debug
```
The most comfortable usage:
```
node src/app.js --username=vadim --debug
```
all errors can be understand, and consol more friendly, can use las command
---
### Usage
#### All supported commands:
- up
- cd target_directory
- ls
- .exit

- cat path_to_file
- add new_file_name
- rn path_to_file new_filename
- cp path_to_file path_to_new_directory
- mv path_to_file path_to_new_directory
- rm path_to_file

- os --parameter

- hash path_to_file

- compress path_to_file path_to_destination
- decompress path_to_file path_to_destination