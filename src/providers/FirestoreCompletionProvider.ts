import { CompletionItem, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument } from 'vscode';
import { tokenize } from '../utils/textmate/textmate';

export class FirestoreCompletionProvider implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position): ProviderResult<CompletionItem[] | CompletionList> {
        const results: CompletionItem[] = [];

        try {
            tokenize(document).then(tokenizedDoc => {
                const lineTokens = tokenizedDoc[position.line];
                const currentToken = lineTokens.filter(token => token.range.contains(position));

                console.log(currentToken);
            });
        } catch (error) {
            console.log(error);
        }

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
}