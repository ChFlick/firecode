import { TextDocument, Position, HoverProvider, Hover, ProviderResult, CancellationToken } from 'vscode';
import { getDocForToken } from '../Documentation';
import { getTokenUntil } from '../utils';
import { tokenize } from '../utils/textmate/textmate';

export class FirestoreHoverProvider implements HoverProvider {
    provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
        const markedWord = document.getText(document.getWordRangeAtPosition(position));
        return new Hover(getDocForToken(getTokenUntil(document, position), markedWord));
    }
}
