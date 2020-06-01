import * as path from 'path';
import * as fs from 'fs';
import { env, TextDocument, Range } from 'vscode';
import { Token } from './scope-info';
import * as textmate from 'vscode-textmate';

type TextmateType = typeof textmate;

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

function getOnigWasmBin() {
  try {
    return fs.readFileSync(`${env.appRoot}/node_modules.asar/vscode-oniguruma/release/onig.wasm`).buffer;
  } catch (err) { }

  try {
    return fs.readFileSync(`${env.appRoot}/node_modules/vscode-oniguruma/release/onig.wasm`).buffer;
  } catch (err) { }

  console.error("Could not load the onig.wasm");
  
  return null;
}

async function getRegistry(tm: TextmateType) {
  const onigurumaModule = getCoreNodeModule('vscode-oniguruma');
  await onigurumaModule.loadWASM(getOnigWasmBin());

  return new tm.Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (sources: string[]) => new onigurumaModule.OnigScanner(sources),
      createOnigString: (str: string) => new onigurumaModule.OnigString(str)
    }),
    loadGrammar: async () => null,
  });
}

const grammarPath = path.resolve(__dirname + '/../../../syntaxes/firestorerules.tmLanguage.json');

let grammar: any;
async function getGrammar() {
  if (grammar) {
    return grammar;
  }

  const tm: TextmateType = await getCoreNodeModule('vscode-textmate');
  const registry = await getRegistry(tm);
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
