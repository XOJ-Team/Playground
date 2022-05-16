'use strict';

import * as vscode from "vscode";

export class LocalStorageService {

    private storage: vscode.Memento;

    constructor(private readonly _extensionContext: vscode.ExtensionContext) {
        this.storage = _extensionContext.globalState;
    }

    public getValue<T>(key: string) {
        return this.storage.get<T>(key);
    }

    public setValue<T>(key: string, value: T) {
        this.storage.update(key, value);
    }
}