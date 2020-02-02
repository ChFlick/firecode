import { Parser, Grammar } from 'nearley';
import FSGrammar from './grammar.js';

export const parser = new Parser(Grammar.fromCompiled(FSGrammar));