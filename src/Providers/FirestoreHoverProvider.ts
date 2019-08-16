import * as vscode from 'vscode';

export class FirestoreHoverProvider implements vscode.HoverProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const markedWord = document.getText(document.getWordRangeAtPosition(position));

        return new vscode.Hover('Hello World');
    }
}