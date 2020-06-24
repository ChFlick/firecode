import { TextDocument, Range, Position } from 'vscode';

export const getWholeToken = (document: TextDocument, position: Position): string => {
    let token = '';
    let tmpPosition = position;

    //find start position
    while (tmpPosition.character > 0 && document.getText(new Range(tmpPosition, tmpPosition.translate(0, -1))).match(/[a-zA-Z0-9.]/)) {
        tmpPosition = tmpPosition.translate(0, -1);
    }

    // till end position
    while (document.getText(new Range(tmpPosition, tmpPosition.translate(0, 1))).match(/[a-zA-Z0-9.]/)) {
        token += document.getText(new Range(tmpPosition, tmpPosition.translate(0, 1)));
        tmpPosition = tmpPosition.translate(0, 1);
    }

    return token;
};

export const getTokenUntil = (document: TextDocument, position: Position): string => {
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return '';
    }

    let token = document.getText(wordRange);
    let tmpPosition = wordRange.start;

    //find start position
    while (tmpPosition.character > 0 && document.getText(new Range(tmpPosition, tmpPosition.translate(0, -1))).match(/[a-zA-Z0-9.]/)) {
        token = document.getText(new Range(tmpPosition, tmpPosition.translate(0, -1))) + token;
        tmpPosition = tmpPosition.translate(0, -1);
    }

    return token;
};