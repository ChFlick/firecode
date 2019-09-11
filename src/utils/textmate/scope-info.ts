import * as vscode from 'vscode'
import { Range, TextDocument } from 'vscode';
import { constructor } from 'stream';

/**
 * A grammar
 */
export interface IGrammar {
  /**
   * Tokenize `lineText` using previous line state `prevState`.
   */
  tokenizeLine(lineText: string, prevState: StackElement): ITokenizeLineResult;
}
export interface ITokenizeLineResult {
  readonly tokens: IToken[];
  /**
   * The `prevState` to be passed on to the next line tokenization.
   */
  readonly ruleStack: StackElement;
}
export interface IToken {
  startIndex: number;
  readonly endIndex: number;
  readonly scopes: string[];
}
/**
 * **IMPORTANT** - Immutable!
 */
export interface StackElement {
  equals(other: StackElement): boolean;
}


export class Token {
  scopes: string[];
  range: Range;
  document: vscode.TextDocument;

  static create(token: any, line: number, document: vscode.TextDocument) {
    return new Token(token.scopes,
      new Range(line, token.startIndex, line, token.endIndex), document);
  }

  constructor(scopes: string[], range: Range, document: TextDocument) {
    this.scopes = scopes;
    this.document = document;
    this.range = range;
  }

  inScope(str: string): boolean {
    for (let scope of this.scopes) {
      if (scope.indexOf(str) !== -1) {
        return true;
      }
    }
    return false;
  }

  text(): string {
    return this.document.getText(this.range);
  }
}

export interface ScopeInfoAPI {
  getScopeAt(document: vscode.TextDocument, position: vscode.Position): Token | null;
  getGrammar(scopeName: string): Promise<IGrammar | null>;
  getScopeForLanguage(language: string): string | null;
}
