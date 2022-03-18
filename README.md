# Introduction

This is the repo of XOJ's online editor, which consists an extension for VSC and a modified VSC for web.

## Features & To-dos

* VS code extension
  * [ ] Connect to OJ backend and retrieve problem (description, sample input/output, etc)
  * [ ] Connect to OJ backend for code submission and execution
  * [ ] Problem information display (AC rate, total submission, etc.)
  * [ ] Desktop VS code activation
* Modified version of VS code web
  * [ ] User authentication
  * [ ] User preference storage

## Getting Started

To start the development, open this project in VScode and then run

```bash
yarn install
```

to initalize the dependencies.

To debug the extension, simply press `F5` and a debug session would popup.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something
