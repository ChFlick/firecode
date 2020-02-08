Main
  = Version? Service

AllowToken    = "allow"
IfToken       = "if"
MatchToken    = "match"
VersionToken  = "rules_version"

Version
  = VersionToken _ "=" _ "'" vn:VersionNumber "'" _ ";"? EOL
  { return ["version", vn]; }
  
VersionNumber
  = "1"/"2"
 
Service
  = "service cloud.firestore" EOL
  "{" EOL 
  content:Content EOL
  "}" EOL
  { return ["service", content]; }

Content
  = left: Matcher right: (_ Matcher)*
  { return right ? [left, ...right.map(v => v[1])] : [left]; }

Matcher
  = _ MatchToken __ path:MatcherPath EOL
    "{" EOL
    matcherBody: (Matcher/Allow/Function/Comment)+ _
    "}" EOL
  { return ["match", path, matcherBody]; }
  
Allow 
  = _ AllowToken __ scope: AllowScope ":" (EOL/__) _
  IfToken __ condition: ConjunctedCondition ";"? EOL
  { return ["allow", scope, condition]; }

ConjunctedCondition
  = Condition (_ EOL ("&&" / "||") _ EOL _ Condition)*
Condition
  = (
  "(" EOL c: Condition EOL ")" EOL
   { return ["(", c, ")"]; }
  /
  TrueFalse 
  	{ return text(); }
  / FunctionCall 
  	{ return text(); }
  / left: WordDotWord _ op: Operator _ right: (FunctionCall / WordDotWord)
  	{ return [left, op, right]; }  
  ) ";"? EOL
  
Function
  = _ "function" __ name:FunctionName "(" params:FunctionParameters? ")" _ "{" __ body:FunctionBody __ "}"
  { return ["function", name, params, body]; }

MatcherPath 
  = "/" chars: [a-zA-Z\/=\*{}]+ __
  { return "/" + chars.join("") }

AllowScope 
  = mainsope:AllowScopes _ morescopes:("," _ AllowScopes)*
   { return [mainsope, ...morescopes.flatMap(x => x).filter(x => x && x !== "," && x !== "")] }
AllowScopes 
  = "write"/"read"/"get"/"list"/"update"/"delete"/"create"

FunctionName
  = Word
FunctionParameters 
  = Word ("," _ Word)*
FunctionBody 
  = "return" __ (TrueFalse / Expression) (";"/__)

Expression 
  = chars: [a-zA-Z\/=\*{}()$.[\]]+
  { return chars.join(""); }
  
FunctionCall
  = name: WordDotWord "(" _ params: FunctionCallParameters? _ ")"
  { return [name, params]}
FunctionCallParameters
  = left: FunctionCallParameter right: ("," _ FunctionCallParameter)*
  { return [left, ...right.map(v => v[2])]; } 
FunctionCallParameter
  = WordDotWord/String/DecimalLiteral

TrueFalse
  = "true" / "false"
  
Operator
  = "=="/"!="/"&&"/"is"/"||"/"<="/">="/"<"/">"/"!"
  
String
  = chars:("'" [^']+ "'")
  { return chars.flatMap(x => x).join(""); }
  
WordDotWord
  = first: Word second: ("." Word)*
  { return first + second.flatMap(x => x).join(""); }

Word
  = chars: [a-zA-Z0-9_]+
  { return chars.join(""); }
  
EOL
  = _ Comment? LineTerminatorSequence?
  {}

Comment "comment"
  = _ "//" comment: (!LineTerminator .)*
  { return comment.flatMap(x => x).join("").trim(); }

DecimalLiteral
  = DecimalIntegerLiteral "." DecimalDigit* 
  	{ return { type: "Literal", value: parseFloat(text()) }; }
  / "." DecimalDigit+
  	{ return { type: "Literal", value: parseFloat(text()) }; }

DecimalIntegerLiteral
  = "0"
  / [-]? NonZeroDigit DecimalDigit*

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

LineTerminator
  = [\n\r\u2028\u2029]
  
LineTerminatorSequence "end of line"
  = "\n"
  / "\r\n"
  / "\r"
  / "\u2028"
  / "\u2029"

__ "required_whitespace"
  = [ \t\n\r]+ 
  {}
  
_ "whitespace"
  = [ \t\n\r]*
  {}