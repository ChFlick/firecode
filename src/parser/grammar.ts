// Generated automatically by nearley, version 2.19.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }

interface NearleyToken {  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: NearleyToken) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: undefined,
  ParserRules: [
    {"name": "Main", "symbols": ["_", "Version", "Service", "_"]},
    {"name": "Version$string$1", "symbols": [{"literal":"r"}, {"literal":"u"}, {"literal":"l"}, {"literal":"e"}, {"literal":"s"}, {"literal":"_"}, {"literal":"v"}, {"literal":"e"}, {"literal":"r"}, {"literal":"s"}, {"literal":"i"}, {"literal":"o"}, {"literal":"n"}], "postprocess": (d) => d.join('')},
    {"name": "Version$string$2", "symbols": [{"literal":"'"}, {"literal":"2"}, {"literal":"'"}, {"literal":";"}], "postprocess": (d) => d.join('')},
    {"name": "Version", "symbols": ["Version$string$1", "_", {"literal":"="}, "_", "Version$string$2", "_"]},
    {"name": "Service$string$1", "symbols": [{"literal":"s"}, {"literal":"e"}, {"literal":"r"}, {"literal":"v"}, {"literal":"i"}, {"literal":"c"}, {"literal":"e"}, {"literal":" "}, {"literal":"c"}, {"literal":"l"}, {"literal":"o"}, {"literal":"u"}, {"literal":"d"}, {"literal":"."}, {"literal":"f"}, {"literal":"i"}, {"literal":"r"}, {"literal":"e"}, {"literal":"s"}, {"literal":"t"}, {"literal":"o"}, {"literal":"r"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "Service", "symbols": ["Service$string$1", "_", {"literal":"{"}, "Content", {"literal":"}"}]},
    {"name": "Content$ebnf$1", "symbols": []},
    {"name": "Content$ebnf$1$subexpression$1", "symbols": ["_", "Matcher"]},
    {"name": "Content$ebnf$1", "symbols": ["Content$ebnf$1", "Content$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Content", "symbols": ["Matcher", "Content$ebnf$1"]},
    {"name": "Matcher$string$1", "symbols": [{"literal":"m"}, {"literal":"a"}, {"literal":"t"}, {"literal":"c"}, {"literal":"h"}], "postprocess": (d) => d.join('')},
    {"name": "Matcher$ebnf$1", "symbols": []},
    {"name": "Matcher$ebnf$1$subexpression$1", "symbols": ["Matcher"]},
    {"name": "Matcher$ebnf$1$subexpression$1", "symbols": ["Allow"]},
    {"name": "Matcher$ebnf$1", "symbols": ["Matcher$ebnf$1", "Matcher$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "Matcher", "symbols": ["_", "Matcher$string$1", "__", "MatcherPath", "_", {"literal":"{"}, "_", "Matcher$ebnf$1", "_", {"literal":"}"}, "_"]},
    {"name": "MatcherPath$ebnf$1", "symbols": []},
    {"name": "MatcherPath$ebnf$1", "symbols": ["MatcherPath$ebnf$1", "MatcherPathChars"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "MatcherPath", "symbols": [{"literal":"/"}, "MatcherPath$ebnf$1", {"literal":" "}]},
    {"name": "Allow$string$1", "symbols": [{"literal":"a"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}, {"literal":"w"}], "postprocess": (d) => d.join('')},
    {"name": "Allow$string$2", "symbols": [{"literal":"i"}, {"literal":"f"}], "postprocess": (d) => d.join('')},
    {"name": "Allow$subexpression$1$string$1", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "Allow$subexpression$1", "symbols": ["Allow$subexpression$1$string$1"]},
    {"name": "Allow$subexpression$1$string$2", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "Allow$subexpression$1", "symbols": ["Allow$subexpression$1$string$2"]},
    {"name": "Allow$ebnf$1", "symbols": [/[;]/], "postprocess": id},
    {"name": "Allow$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "Allow", "symbols": ["_", "Allow$string$1", "__", "AllowScope", {"literal":":"}, "_", "Allow$string$2", "__", "Allow$subexpression$1", "_", "Allow$ebnf$1", "_", {"literal":"\n"}]},
    {"name": "AllowScope$ebnf$1", "symbols": []},
    {"name": "AllowScope$ebnf$1$subexpression$1", "symbols": [{"literal":","}, "_", "AllowScopes"]},
    {"name": "AllowScope$ebnf$1", "symbols": ["AllowScope$ebnf$1", "AllowScope$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "AllowScope", "symbols": ["AllowScopes", "_", "AllowScope$ebnf$1"]},
    {"name": "MatcherPathChars", "symbols": [/[a-zA-Z\/=\*{}]/]},
    {"name": "AllowScopes$string$1", "symbols": [{"literal":"w"}, {"literal":"r"}, {"literal":"i"}, {"literal":"t"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$1"]},
    {"name": "AllowScopes$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"d"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$2"]},
    {"name": "AllowScopes$string$3", "symbols": [{"literal":"g"}, {"literal":"e"}, {"literal":"t"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$3"]},
    {"name": "AllowScopes$string$4", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"s"}, {"literal":"t"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$4"]},
    {"name": "AllowScopes$string$5", "symbols": [{"literal":"u"}, {"literal":"p"}, {"literal":"d"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$5"]},
    {"name": "AllowScopes$string$6", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"l"}, {"literal":"e"}, {"literal":"t"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$6"]},
    {"name": "AllowScopes$string$7", "symbols": [{"literal":"c"}, {"literal":"r"}, {"literal":"e"}, {"literal":"a"}, {"literal":"t"}, {"literal":"e"}], "postprocess": (d) => d.join('')},
    {"name": "AllowScopes", "symbols": ["AllowScopes$string$7"]},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
  ],
  ParserStart: "Main",
};

export default grammar;
