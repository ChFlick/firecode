import { DocumentFormattingEditProvider, FormattingOptions, Position, Range, TextDocument, TextEdit } from 'vscode';
import { tokenize } from '../utils/textmate/textmate';

const indentationScopes = ['meta.root.fs', 'meta.matcher.fs', 'meta.function.fs'];
const reduceWith = /match\s|service\s|function\s|^\s*\}\s*$/g;
const concatedAndOr = /^\s*(&&|\|\|)/g;

export class FirestoreFormattingProvider implements DocumentFormattingEditProvider {

    async provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions): Promise<TextEdit[]> {
        const results: TextEdit[] = [];

        try {
            const tokenizedDoc = await tokenize(document);
            tokenizedDoc.forEach((token, line) => {
                let numberOfIndentations = Math.max(...token.map(
                    item => item.scopes.reduce(
                        (count, scope) => indentationScopes.includes(scope) ? count + 1 : count, 0
                    )
                ));

                // Do not indent empty lines at all
                if (document.lineAt(line).text.trim().length === 0) {
                    numberOfIndentations = 0;
                }
                
                // Do not indent match, service and closing bracket lines
                if (document.lineAt(line).text.match(reduceWith)) {
                    numberOfIndentations--;
                }

                // Add an indentation step if line starts with && or ||
                if (document.lineAt(line).text.match(concatedAndOr)) {
                    numberOfIndentations++;
                }

                const currentNumberOfIndentationWhitespace = document.lineAt(line).text.length - document.lineAt(line).text.trimLeft().length;
                const indentationSize = options.tabSize || 2;
                const indentChar = options.insertSpaces ? ' '.repeat(indentationSize) : '\t';

                results.push(
                    TextEdit.replace(
                        new Range(new Position(line, 0), new Position(line, currentNumberOfIndentationWhitespace)),
                        indentChar.repeat(numberOfIndentations)
                    )
                );
            });

        } catch (error) {
            console.log(error);
        }

        return results;
    }
}