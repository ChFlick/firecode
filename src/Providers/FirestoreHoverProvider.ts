import { TextDocument, Position, HoverProvider, Hover, ProviderResult, CancellationToken } from 'vscode';
import { flatDocs } from '../Documentation';
import { getWholeToken } from '../Utils';

export class FirestoreHoverProvider implements HoverProvider {
    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        const markedWord = document.getText(document.getWordRangeAtPosition(position));

        console.log(getWholeToken(document, position));

        return new Hover(flatDocs[markedWord]);
    }

}
