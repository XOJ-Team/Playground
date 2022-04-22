import * as vscode from 'vscode';

import { StatusIndicator } from './ui/StatusIndicator';
import { DescriptionView } from './ui/DescriptionView';
import { SampleView } from './ui/SampleView';
import { ActionPanel } from './ui/ActionPanel';
import { WebUriHandler } from './ui/UriHandler';
import { LanguagePicker } from './ui/LanguagePicker';
import { ResultViewProvider } from './ui/ResultView';
import { DebugConfiguration } from './ui/DebugConfigurationProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('[INFO] XOJ Playground is now active!');

	const webUriHandler = new WebUriHandler(context);
	const statusIndicator = new StatusIndicator(context);
	const descriptionView = new DescriptionView(context);
	// const sampleView = new SampleView(context);
	const actionPanel = new ActionPanel(context);
	const languagePicker = new LanguagePicker(context);
}

export function deactivate() {
	vscode.window.showInformationMessage('XOJ Playground extension is deactivated.');
}
