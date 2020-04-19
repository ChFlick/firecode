import { DocumentFormattingEditProvider, FormattingOptions, Position, Range, TextDocument, TextEdit } from 'vscode';
import { tokenize } from '../utils/textmate/textmate';

const intendScopes = ['meta.root.fs', 'meta.matcher.fs', 'meta.function.fs']
const reduceWith = /match|service|function|^\s*\}\s*$/g;
const concatedAndOr = /^\s*(&&|\|\|)/g;

export class FirestoreFormattingProvider implements DocumentFormattingEditProvider {

    async provideDocumentFormattingEdits(document: TextDocument, options: FormattingOptions): Promise<TextEdit[]> {
        let results: TextEdit[] = [];

        try {
            const tokenizedDoc = await tokenize(document);
            tokenizedDoc.forEach((token, line) => {
                let numberOfIntendation = Math.max(...token.map(
                    item => item.scopes.reduce(
                        (count, scope) => intendScopes.includes(scope) ? count + 1 : count, 0
                    )
                ));

                /**
                 * Do not indent match, service and closing bracket lines
                 */
                if (document.lineAt(line).text.match(reduceWith)) {
                    numberOfIntendation--;
                }

                /**
                 * Add an indentation step if line starts with && or ||
                 */
                if (document.lineAt(line).text.match(concatedAndOr)) {
                    numberOfIntendation++;
                }

                const currentNumberOfIndentationWhitespace = document.lineAt(line).text.length - document.lineAt(line).text.trimLeft().length;
                const intendationSize = options.tabSize || 2;
                const intendChar = options.insertSpaces ? ' '.repeat(intendationSize) : '\t';

                results.push(
                    TextEdit.replace(
                        new Range(new Position(line, 0), new Position(line, currentNumberOfIndentationWhitespace)),
                        intendChar.repeat(numberOfIntendation)
                    )
                );
            });

        } catch (error) {
            console.log(error);
        }

        return results;
    }
}