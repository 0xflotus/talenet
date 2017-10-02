# TALEnet

Intergalactic skill & idea sharing community.

## Development dependencies

### NixOS

This repository contains a `shell.nix` that provides all required dependecies
for development. Enter the environment by simply running:

```bash
nix-shell
```

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload
npm run dev

# build electron application for production
npm run build

# TODO: what does this actually?
# build for production and view the bundle analyzer report
# npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[331f85f](https://github.com/SimulatedGREG/electron-vue/tree/331f85fd556cc0d60a30ad019a44a29baaed49f5) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## SSB/ Sbot Server

Until `sbot` runs as a _background process_ inside electron it has to be installed and started in a speerate terminal window.

```bash
# clone it from github
git clone https://github.com/ssbc/scuttlebot.git

# change into the cloned directory
cd scuttlebot

# install it's dependencies
npm i

# run it
$HOME/scuttlebot/bin.js server
```

## wonders of modern javascript

our tests parse all the included npm modules, too. this surfaces lot's of dirty hacks in these modules. some frequent cases:

```

ERROR in ./node_modules/rc/index.js
Module parse failed: /home/user/TALEnet/node_modules/rc/index.js Unexpected character '#' (1:0)
You may need an appropriate loader to handle this file type.

```

Some modules use a _[hashbang](https://en.wikipedia.org/wiki/Shebang_(Unix))_ (`#!/bin/sh` in the first line) to tell their shells to run the module code with node. Pretty esoteric but it can work. Not for the webpack/karma configuration we currently use though. I found two instance of this and the following script works around the problem by removing the first line of the file.

```bash
sed -i '1d' node_modules/rc/index.js
sed -i '1d' node_modules/non-private-ip/index.js 
```