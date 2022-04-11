# Introduction

This is the repo of XOJ's online editor, which consists an extension for VSC and a modified VSC for web.

## Features & To-dos

* VS code extension
  * [x] Connection status checker
  * [x] Connect to OJ backend and retrieve problem (description, sample input/output, etc)
  * [ ] Connect to middleware for code submission and execution
  * [ ] Problem information display (AC rate, total submission, etc.)
  * [x] Desktop VS code activation
* Modified version of VS code web
  * [ ] User authentication
  * [ ] User preference storage

## Getting Started

To start the development, open this project in VScode and then run

```bash
yarn install
```

to initialize the dependencies.

To debug the extension, simply press `F5` and a debug session would popup.  

To package  the extension, run
```bash
npm install -g vsce
vsce package
```

## Extension Settings

* `xoj-playground.targetServer`: set the target server for backend connection.
* `xoj-playground.judgeServer`: set the target server for judger.
