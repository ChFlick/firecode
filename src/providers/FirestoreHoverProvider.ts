import { TextDocument, Position, HoverProvider, Hover, ProviderResult } from 'vscode';
import { getDocForToken } from '../Documentation';
import { getTokenUntil } from '../utils';

export class FirestoreHoverProvider implements HoverProvider {
    provideHover(document: TextDocument, position: Position): ProviderResult<Hover> {
        const markedWord = document.getText(document.getWordRangeAtPosition(position));
        return new Hover(getDocForToken(getTokenUntil(document, position), markedWord) || '');
    }
}
