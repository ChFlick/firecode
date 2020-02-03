Main
  = Version Service
  
Version
  = "rules_version = '" vn:VersionNumber "'" ";"? EOL { return ["version", vn]; }
  
VersionNumber
  = "1"/"2"
 
Service
  = "service cloud.firestore" _ "{" EOL _ content:Content _ "}"
  { return ["service", content]; }

Content
  = Matcher (_ Matcher)*

Matcher
  = _ "match" __ path:MatcherPath "{" EOL matching:(Matcher/Allow/Function/Comment)+ _ "}"
  { return ["match", path, matching]; }
  
Allow 
  = _ "allow" __ scope:AllowScope ":" __ "if" __ condition:Condition [;]? _
  { return ["allow", scope, condition]; }
  
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

Condition
  = TrueFalse / WordDotWord _ Operator _ (Word "."?)+ / FunctionCall
  
FunctionCall
  = Word "(" FunctionCallParameters? ")"
FunctionCallParameters
  = left: WordDotWord/ left: String right: ("," _ WordDotWord/String)*
  { return [left, ...right]; } 

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