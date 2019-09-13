import { CompletionItem, CompletionItemProvider, CompletionList, Position, ProviderResult, TextDocument, CompletionItemKind } from 'vscode';
import { tokenize } from '../utils/textmate/textmate';
import { getPotentialDocForPartial } from '../Documentation';

export class FirestoreCompletionProvider implements CompletionItemProvider {
    async provideCompletionItems(document: TextDocument, position: Position): Promise<CompletionItem[] | CompletionList> {
        let results: CompletionItem[] = [];

        try {
            const tokenizedDoc = await tokenize(document);

            const lineTokens = tokenizedDoc[position.line];
            const currentToken = lineTokens.find(token => token.range.contains(position));

            if (!currentToken) {
                return [];
            }

            let partial = document.getText(currentToken.range);
            partial = partial.trim().substring(0, partial.includes(' ') ? partial.indexOf(' ') : partial.length);
            
            results = getPotentialDocForPartial(partial)
                .map(v => {
                    const item = new CompletionItem(typeof v[0] === 'string' ? v[0] : v[0].value, CompletionItemKind.Class);
                    item.documentation = v[1];
                    return item;
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