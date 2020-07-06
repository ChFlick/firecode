import { describe } from 'mocha';
import * as vscode from 'vscode';
import { tokenize } from '../../../utils/textmate/textmate';
import { expect } from 'chai';
import { Token } from '../../../utils/textmate/scope-info';
import * as flatMap from 'array.prototype.flatmap';

const TEST_RULES_PATH = __dirname + '/../../../../src/test/suite/syntax-highlighting/rules';

const flatten = (tokens: Token[]): string[] => flatMap(tokens, (t: Token) => t.scopes);

describe('the should highlight comments', () => {
    test('at root level', async () => {
        const document = await vscode.workspace.openTextDocument(TEST_RULES_PATH + '/root-comment.rules');

        const tokenizedLines = await tokenize(document);
        
        expect(flatten(tokenizedLines[1])).contains('comment.line');
    });

    test('at service level', async () => {
        const document = await vscode.workspace.openTextDocument(TEST_RULES_PATH + '/service-comment.rules');

        const tokenizedLines = await tokenize(document);
        
        expect(flatten(tokenizedLines[2])).contains('comment.line');
    });

    test('at matcher level', async () => {
        const document = await vscode.workspace.openTextDocument(TEST_RULES_PATH + '/matcher-comment.rules');

        const tokenizedLines = await tokenize(document);
        
        expect(flatten(tokenizedLines[3])).contains('comment.line');
    });

    test('at allow level', async () => {
        const document = await vscode.workspace.openTextDocument(TEST_RULES_PATH + '/allow-comment.rules');

        const tokenizedLines = await tokenize(document);
        
        expect(flatten(tokenizedLines[3])).contains('comment.line');
    });
});