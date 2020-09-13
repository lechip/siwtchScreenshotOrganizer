# NINTENDO SWITCH SCREENSHOT PROCESSOR

This is a simple node cli tool that recursively copies the files of the `/Album` folder of the Nintendo Switch SD card and outputs a `/screenshotsOutput` with folders for each game and with the screenshots withtin each corresponding game.

Usage:

```bash
node index.js -i "E:\Nintendo\Album" -o "D:\lechip\Downloads\output" # input is the "Album" folder of the SD card
# node index.js -i "D:\lechip\Downloads\Album" -o "D:\lechip\Downloads\output" # Alternative if copyied to disk
Attempting to organize Sreenshots in ./AlbumC
Reading 996 files
Processed 996 files.
```

## TODO

- [ ] Check what happens with directories that already have folders
- [ ] Tests?
- [ ] Make a dry-run option
- [ ] Open-Source
- [ ] Publish on NPM
