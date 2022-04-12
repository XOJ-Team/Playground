import * as vscode from 'vscode';

export class DebugConfiguration implements vscode.DebugConfigurationProvider {
    public resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
        return config;
    }

    public provideDebugConfigurations(folder: vscode.WorkspaceFolder | undefined, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration[]> {
        return [
            {
                name: 'LaunchXOJ',
                type: 'node',
                request: 'launch',
                args: [
                    '--nolazy',
                    '--inspect=9229'
                ],
                cwd: '${workspaceFolder}',
                env: {
                    'NODE_ENV': 'development'
                }
            }
        ];
    }
}