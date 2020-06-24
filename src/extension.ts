import { ExtensionContext, languages } from 'vscode';
import { FirestoreHoverProvider, FirestoreCompletionProvider, FirestoreFormattingProvider } from './providers';

export function activate(context: ExtensionContext): void {
	context.subscriptions.push(languages.registerHoverProvider('firestorerules', new FirestoreHoverProvider()));
	context.subscriptions.push(languages.registerCompletionItemProvider('firestorerules', new FirestoreCompletionProvider()));
	context.subscriptions.push(languages.registerDocumentFormattingEditProvider('firestorerules', new FirestoreFormattingProvider()));
}
