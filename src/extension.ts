import { CompletionItem, ExtensionContext, languages, Range, Position, CompletionItemKind } from 'vscode';
import { FirestoreHoverProvider } from './Providers/FirestoreHoverProvider';

export function activate(context: ExtensionContext) {
	context.subscriptions.push(languages.registerHoverProvider('firestorerules', new FirestoreHoverProvider()));
	context.subscriptions.push(languages.registerCompletionItemProvider('firestorerules', {
		provideCompletionItems(doc, pos) {
			const results: CompletionItem[] = [];
			// let lineUntilPos = doc.getText(new Range(new Position(pos.line, 0), pos));

			// console.log(lineUntilPos, doc.getText(doc.getWordRangeAtPosition(pos)));
			
			// Object.keys(infos).forEach(key => {
			// 	let item = new CompletionItem(key, CompletionItemKind.Keyword);
			// 	item.documentation = infos[key];
			// 	item.detail ='testdetial';
			// 	item.filterText = 'aaaa';
			// 	results.push(item);
			// });

			return results;
		}
	}));
}

export function deactivate() { }
