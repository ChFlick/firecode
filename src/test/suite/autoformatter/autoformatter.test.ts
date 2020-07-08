import * as assert from 'assert';
import { describe } from 'mocha';
import * as vscode from 'vscode';

describe('the autoformatter', () => {
    test('should format rules with matchers with no semicolon', async () => {
        const formattedDocument = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/matcherNoSemicolon.formatted.rules');
        const document = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/matcherNoSemicolon.test.rules');

        const formattedResult = await getDocumentFormatted(document);

        assert.strictEqual(formattedResult, formattedDocument.getText());
    });

    test('should format some complex rules', async () => {
        const formattedDocument = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/complex.formatted.rules');
        const document = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/complex.test.rules');

        const formattedResult = await getDocumentFormatted(document);

        assert.strictEqual(formattedResult, formattedDocument.getText());
    });

    test('should format a function named "matches" correctly', async () => {
        const formattedDocument = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/functionNamedMatches.formatted.rules');
        const document = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/functionNamedMatches.test.rules');

        const formattedResult = await getDocumentFormatted(document);

        assert.strictEqual(formattedResult, formattedDocument.getText());
    });
});

async function getDocumentFormatted(document: vscode.TextDocument) {
    const editor = await vscode.window.showTextDocument(document);
    const formatEdits = await vscode.commands.executeCommand('vscode.executeFormatDocumentProvider', document.uri, { tabSize: 2, insertSpaces: true }) as vscode.TextEdit[];
    await editor.edit(editBuilder => formatEdits.forEach(edit => editBuilder.replace(edit.range, edit.newText)));
    const formattedResult = editor.document.getText();
    return formattedResult;
}

