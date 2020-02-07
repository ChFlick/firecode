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
  = Matcher (_ Matcher)*

Matcher
  = _ MatchToken __ path:MatcherPath EOL
  "{" EOL
  matcherBody: (Matcher/Allow/Function/Comment)+ _
  "}" EOL
  { return ["match", path, matcherBody]; }
  
Allow 
  = _ AllowToken __ scope: AllowScope ":" (EOL/__) _
  IfToken __ condition: Condition ";"? EOL
  { return ["allow", scope, condition]; }

Condition
  = (TrueFalse / FunctionCall / WordDotWord _ Operator _ (FunctionCall / WordDotWord)) ";"? EOL
  
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
  = WordDotWord "(" _ FunctionCallParameters? _ ")"
FunctionCallParameters
  = left: FunctionCallParameter right: ("," _ FunctionCallParameter)*
  { return [left, ...right]; } 
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
  
Comment "comment"
  = _ "//" comment: (!LineTerminator .)*
  { return comment.join(""); }

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
  { return null; }
  
_ "whitespace"
  = [ \t\n\r]*
  { return null; }