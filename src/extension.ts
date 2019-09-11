import { ExtensionContext, languages } from 'vscode';
import { FirestoreHoverProvider, FirestoreCompletionProvider } from './providers';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(languages.registerHoverProvider('firestorerules', new FirestoreHoverProvider()));
	context.subscriptions.push(languages.registerCompletionItemProvider('firestorerules', new FirestoreCompletionProvider()));
}

export function deactivate() { }
