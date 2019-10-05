import * as assert from 'assert';
import { before, describe } from 'mocha';

import * as vscode from 'vscode';
import { getWholeToken, getTokenUntil } from '../../../utils';
import { getDocForToken, getPotentialDocForPartial } from '../../../Documentation';

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

    describe('getTokenUntil', () => {

        test('should return a valid token when string is on position 0', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(0, 8);

            assert.strictEqual(getTokenUntil(document, position), 'one.two.three');
        });

        test('should return a valid token when string is further behind', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(1, 8);

            assert.strictEqual(getTokenUntil(document, position), 'one.two');
        });

        test('should avoid non-dot characters', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(2, 5);

            assert.strictEqual(getTokenUntil(document, position), 'two');
        });

        test('should get plain token between spaces', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(3, 5);

            assert.strictEqual(getTokenUntil(document, position), 'two');
        });

        test('should get dot-separated token between spaces', async () => {
            const document = await vscode.workspace.openTextDocument(__dirname + '/../../../../src/test/suite/Utils/example.test.rules');
            const position = new vscode.Position(4, 8);

            assert.strictEqual(getTokenUntil(document, position), 'two.three');
        });

    });

    describe('getDocForToken', () => {

        test('should return a valid documentation for a word in a valid token', async () => {
            const token = 'request.resource.data';
            const markedWord = 'data';

            assert.notStrictEqual(getDocForToken(token, markedWord), '');
        });

        test('should return no documentation for an invalid input', async () => {
            const token = 'request.resource.datafg';
            const markedWord = 'gota';

            assert.strictEqual(getDocForToken(token, markedWord), '');
        });

        test('should return valid documentation for exact token', async () => {
            const token = 'request.resource.data';
            const markedWord = 'gota';

            assert.notStrictEqual(getDocForToken(token, markedWord), '');
        });

        test('should lucky guess valid documentation for wrong token but exact marked word', async () => {
            const token = 'reqdfsuest.resodfurcedf.datsfa';
            const markedWord = 'data';

            assert.notStrictEqual(getDocForToken(token, markedWord), '');
        });

        test('should return different documentation for a word in different tokens', async () => {
            const tokenA = 'request.path';
            const tokenB = 'path';
            const markedWord = 'path';

            assert.notStrictEqual(getDocForToken(tokenA, markedWord), getDocForToken(tokenB, markedWord));
        });

    });

    describe('getPotentialDocForPartial', () => {

        test('should return a valid documentation for a valid partial', async () => {
            const partial = 'pat';

            const potentialDocs = getPotentialDocForPartial(partial);

            if(potentialDocs.length > 0) {
                assert.ok(potentialDocs);
            } else {
                assert.fail('Expected potential docs to be found');
            }
        });

        test('should return no valid documentation for a invalid partial', async () => {
            const partial = 'asdf';

            const potentialDocs = getPotentialDocForPartial(partial);

            if(potentialDocs.length > 0) {
                assert.fail(potentialDocs, [], 'Expected no potential docs to be found');
            } else {
                assert.ok(potentialDocs);
            }
        });

    });
});
