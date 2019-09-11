import * as path from 'path';
import * as fs from 'fs';
import { env, TextDocument, Range } from 'vscode';
import { Token } from './scope-info';

/**
 * Returns a node module installed with VSCode, or null if it fails.
 */
function getCoreNodeModule(moduleName: string) {
  try {
    return require(`${env.appRoot}/node_modules.asar/${moduleName}`);
  } catch (err) { }

  try {
    return require(`${env.appRoot}/node_modules/${moduleName}`);
  } catch (err) { }

  return null;
}

const grammarPath = path.resolve(__dirname + '/../../../syntaxes/firestorerules.tmLanguage.json');

let grammar: any;
async function getGrammar() {
  if (grammar) {
    return grammar;
  }

  const tm = await getCoreNodeModule('vscode-textmate');
  const registry = new tm.Registry();
  const grammarFile = fs.readFileSync(grammarPath).toString();
  grammar = await registry.addGrammar(tm.parseRawGrammar(grammarFile, grammarPath));

  return grammar;
}

export async function tokenize(document: TextDocument): Promise<Token[][]> {
  let grammar = await getGrammar();

  var ruleStack: any;
  var tokens: Token[][] = [];
  for (let i = 0; i < document.lineCount; i++) {
    let line = document.getText(new Range(i, 0, i + 1, 0));
    var r = grammar.tokenizeLine(line, ruleStack!);
    tokens.push(r.tokens.map((v: any) => Token.create(v, i, document)));
    ruleStack = r.ruleStack;
  }
  return tokens;
}
