import * as vscode from 'vscode';
import { FirestoreHoverProvider } from './Providers/FirestoreHoverProvider';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.languages.registerHoverProvider('firestorerules', new FirestoreHoverProvider()));
}

export function deactivate() { }
