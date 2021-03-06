import { CompletionItem, CompletionItemKind, CompletionItemProvider, CompletionList, Position, TextDocument } from 'vscode';
import { getPotentialDocForPartialScoped } from '../Documentation';
import { tokenize } from '../utils/textmate/textmate';

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
            
            console.log(currentToken.scopes);

            let partial = document.getText(currentToken.range).trim();

            if (partial.includes(' ')) {
                partial = partial.split(' ').pop() || '';
            }

            results = getPotentialDocForPartialScoped(partial, currentToken.scopes.slice(-1)[0])
                .map(doc => {
                    const docName = doc[0];
                    const item = new CompletionItem(typeof docName === 'string' ? docName : docName.value, CompletionItemKind.Class);
                    item.documentation = doc[1];
                    return item;
                });
        } catch (error) {
            console.log(error);
        }

        return results;
    }
}  