# NINTENDO SWITCH SCREENSHOT PROCESSOR

This is a simple node CLI tool that recursively copies the `jpg` and `mp4` files of the `/Album` folder of the Nintendo Switch SD card and outputs it in the chosen output folder an collection of folders for each game and with the media files withtin each corresponding game.

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
