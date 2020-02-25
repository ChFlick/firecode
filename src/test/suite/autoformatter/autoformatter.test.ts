import * as assert from 'assert';
import { describe } from 'mocha';
import * as vscode from 'vscode';

describe('the autoformatter', () => {
    test('should format rules with matchers with no semicolon', async () => {
        const formattedDocument = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/matcherNoSemicolon.formatted.rules');
        const document = await vscode.workspace
            .openTextDocument(__dirname + '/../../../../src/test/suite/autoformatter/matcherNoSemicolon.test.rules');
        const editor = await vscode.window.showTextDocument(document);

        const formatEdits = await vscode.commands.executeCommand(
            'vscode.executeFormatDocumentProvider',
            document.uri,
            { tabSize: 2, insertSpaces: true }
        ) as vscode.TextEdit[];
        await editor.edit(editBuilder => formatEdits.forEach(edit => editBuilder.replace(edit.range, edit.newText)));
        const formattedResult = editor.document.getText();

        assert.strictEqual(formattedResult, formattedDocument.getText());
    });
});
