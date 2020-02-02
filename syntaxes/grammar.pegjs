Main
  = Version Service
  
Version
  = "rules_version = '" vn:VersionNumber "';" _ { return ["version", vn]; }
  
VersionNumber
  = "1"/"2"
 
Service
  = "service cloud.firestore" _ "{" _ content:Content _ "}" { return ["service", content]; }

Content
  = Matcher (_ Matcher)*

Matcher
  = _ "match" __ path:MatcherPath "{" _ matching:(Matcher/Allow/Function)+ _ "}"
  { return ["match", path, matching]; }
  
Allow 
  = _ "allow" __ scope:AllowScope ":" __ "if" __ condition:TrueFalse [;]? _
  { return ["allow", scope, condition]; }
  
Function
  = _ "function" __ name:FunctionName "(" params:FunctionParameters? ")" _ "{" __ body:FunctionBody __ "}"
  { return ["function", name, params, body]; }

MatcherPath 
  = "/" chars: [a-zA-Z\/=\*{}]+ __ { return "/" + chars.join("") }

AllowScope 
  = AllowScopes _ ("," _ AllowScopes)*
AllowScopes 
  = "write"/"read"/"get"/"list"/"update"/"delete"/"create"

FunctionName
  = Word
FunctionParameters 
  = Word ("," _ Word)*
FunctionBody 
  = "return" __ (TrueFalse / Expression) (";"/__)

Expression 
  = chars: [a-zA-Z\/=\*{}()$.[\]]+ { return chars.join(""); }

TrueFalse
  = "true" / "false"
  
Word
  = chars: [a-zA-Z]+ { return chars.join(""); }

__ "required_whitespace"
  = [ \t\n\r]+  { return null; }
  
_ "whitespace"
  = [ \t\n\r]* { return null; }