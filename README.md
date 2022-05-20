<p align="center">
  <img src="https://dev.azure.com/XOJ-Team/XOJ/_apis/git/repositories/XOJ_Playground/items?path=/assets/banner.png&versionDescriptor%5BversionOptions%5D=0&versionDescriptor%5BversionType%5D=0&versionDescriptor%5Bversion%5D=master&resolveLfs=true&%24format=octetStream&api-version=5.0"
  title="XOJ Logo"
  width="200"
  />
</p>

<h1 align="center">XOJ Playground</h1>

[![Build Status](https://dev.azure.com/XOJ-Team/XOJ/_apis/build/status/XOJ%20Playground?branchName=master)](https://dev.azure.com/XOJ-Team/XOJ/_build/latest?definitionId=8&branchName=master)

This is the repo of XOJ's online editor, which consists an extension for VSC (desktop & web IDE).

## Features & To-dos

* VS code extension
  * [x] Connection status checker
  * [x] Connect to OJ backend and retrieve problem (description, sample input/output, etc)
  * [x] Actions
    * [x] Language chooser
    * [x] Run code (check) on XOJ
    * [x] Code submission
    * [x] Refresh
  * [x] Problem display
    * [x] Description
    * [x] AC rate
    * [ ] Total submission count
    * [x] Time limit
    * [x] Memory limit
  * [x] Result Viewing
    * [x] Submission Status
    * [x] Submission Details
  * [x] Desktop URI activation
  * [x] Preferences
    * [x] Setting XOJ backend API URL
    * [x] Setting Judge API URL
* Modified version of VS code web
  * [ ] User authentication
  * [ ] User preference storage

## Getting Started

### Installation

To install the extension, you can download the prebuilt extension package (VSIX) from [Azure Pipelines](https://dev.azure.com/XOJ-Team/CPT202%20Team%20B-3/_build?definitionId=8), or download directly from [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=XOJ-Team.xoj-playground) or [Open VSX Registry](https://open-vsx.org/extension/XOJ-Team/xoj-playground).

### Development

To start the development, open this project in VScode and then run

```bash
yarn install
```

to initialize the dependencies.

To debug the extension, simply press `F5` and a debug session would popup.  

To package the extension, run

```bash
yarn pack-vsix
```

## Extension Configuration

* `xoj-playground.targetServer`: set the target server for backend connection.
* `xoj-playground.judgeServer`: set the target server for judger.
