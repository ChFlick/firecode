import { ProviderResult, TextEdit, CompletionItem, CompletionItemKind, DocumentFormattingEditProvider, CompletionList, Position, TextDocument, FormattingOptions, Range } from 'vscode';
import { getPotentialDocForPartial, getPotentialDocForPartialScoped } from '../Documentation';
import { tokenize } from '../utils/textmate/textmate';

export class FirestoreFormattingProvider implements DocumentFormattingEditProvider {
    async provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions): Promise<TextEdit[]> {
        let results: TextEdit[] = [];

        try {
            const tokenizedDoc = await tokenize(document);
            tokenizedDoc.forEach((token, line) => {
                const numberOfIntendation = Math.max(...token.map(
                    item => item.scopes.reduce(
                        (count, scope) => scope === 'meta.matcher.fs' ? count + 1 : count, 0
                    )
                ));
                const intendChar = options.insertSpaces ? ' '.repeat(options.tabSize || 2) : '\t';

                results.push(new TextEdit(new Range(new Position(line, 0), new Position(line, 0)), intendChar.repeat(numberOfIntendation)));
            });

        } catch (error) {
            console.log(error);
        }

        return results;
    }
}