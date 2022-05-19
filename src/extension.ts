// import * as nls from 'vscode-nls';
import * as vscode from 'vscode';

import { StatusIndicator } from './ui/StatusIndicator';
import { DescriptionView } from './ui/DescriptionView';
import { ActionPanel } from './ui/ActionPanel';
import { WebUriHandler } from './ui/UriHandler';
import { LanguagePicker } from './ui/LanguagePicker';
import { ResultView } from './ui/ResultView';
import { LocalStorageService } from './api/LocalStorageService';
import { Session } from './api/Session';
import { DebugConfiguration } from './ui/DebugConfigurationProvider';

// const localize = nls.config({ messageFormat: nls.MessageFormat.file })();

export function activate(context: vscode.ExtensionContext) {
	
	console.log('[INFO] XOJ Playground is now active!');

	const localStorageService = new LocalStorageService(context);
	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const descriptionView = new DescriptionView(context);
	const actionPanel = new ActionPanel(context);
	const resultView = new ResultView(context);
	const languagePicker = new LanguagePicker(context);
	
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
