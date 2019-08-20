import * as assert from 'assert';
import { before, describe } from 'mocha';

import * as vscode from 'vscode';
import { getWholeToken } from '../../../Utils';

describe('utils test', () => {

    describe('getWholeToken', () => {

        test('should return a valid token when string is on position 0', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(0, 8);

            assert.strictEqual(getWholeToken(document, position), 'one.two.three');
        });

        test('should return a valid token when string is further behind', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(1, 8);

            assert.strictEqual(getWholeToken(document, position), 'one.two.three');
        });

        test('should avoid non-dot characters', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(2, 5);

            assert.strictEqual(getWholeToken(document, position), 'two');
        });

        test('should get plain token between spaces', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(3, 5);

            assert.strictEqual(getWholeToken(document, position), 'two');
        });

        test('should get dot-separated token between spaces', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(4, 8);

            assert.strictEqual(getWholeToken(document, position), 'two.three');
        });

    });
});
