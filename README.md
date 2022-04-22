# XOJ Playground

[![Build Status](https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3/_apis/build/status/XOJ_Playground?branchName=master)](https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3/_build/latest?definitionId=8&branchName=master)  

This is the repo of XOJ's online editor, which consists an extension for VSC (desktop & web IDE).

## Features & To-dos

* VS code extension
  * [x] Connection status checker
  * [x] Connect to OJ backend and retrieve problem (description, sample input/output, etc)
  * [ ] Actions
    * [ ] Language chooser
    * [x] Run code (check) on XOJ
    * [x] Code submission
  * [ ] Problem display
    * [x] Description
    * [x] AC rate
    * [ ] Total submission count
    * [ ] Time limit
    * [ ] Memory limit
  * [x] Desktop VS code activation
  * [x] Preferences
    * [x] Setting XOJ backend API URL
    * [x] Setting Judge API URL
* Modified version of VS code web
  * [ ] User authentication
  * [ ] User preference storage

# Getting Started
## Installation
To install the extension, you can download the prebuilt extension package (VSIX) from [Azure Pipelines](https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3/_build?definitionId=8), or download directly from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=XOJ-Team.xoj-playground) or [Open VSX Registry](https://open-vsx.org/extension/XOJ-Team/xoj-playground).

## Development
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

# Extension Configuration

* `xoj-playground.targetServer`: set the target server for backend connection.
* `xoj-playground.judgeServer`: set the target server for judger.
