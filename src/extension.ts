import * as vscode from 'vscode';
import * as l10n from '@vscode/l10n';

export function activate(context: vscode.ExtensionContext) {
	const openCommand = 'quick-open-in-new-window.open';
	let openCommandHandler = vscode.commands.registerCommand(openCommand, (uri?: vscode.Uri) => {
		if (!uri) {
			vscode.window.showWarningMessage(l10n.t('command.open.warning'));
			return;
		}


		const showNotification = vscode.workspace.getConfiguration("open-in-new-window").get("showNotification");
		if (showNotification) {
			vscode.window.showInformationMessage(l10n.t('command.open.notification', uri.path));
		}

		vscode.commands.executeCommand('vscode.openFolder', uri, true);
	});

	context.subscriptions.push(openCommandHandler);
}

export function deactivate() { }
