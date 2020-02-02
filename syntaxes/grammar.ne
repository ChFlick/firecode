@preprocessor typescript

Main -> _ Version Service _
Version -> "rules_version" _ "=" _ "'2';" _
Service -> "service cloud.firestore" _ "{" Content "}"
Content -> Matcher (_ Matcher):*
Matcher -> _ "match" __ MatcherPath _ "{" _ (Matcher|Allow):* _ "}" _
MatcherPath -> "/" MatcherPathChars:* " "
Allow -> _ "allow" __ AllowScope ":" _ "if" __ ("false"|"true") _ [;]:? _ "\n"
AllowScope -> AllowScopes _ ("," _ AllowScopes):*

MatcherPathChars -> [a-zA-Z\/=\*{}]

AllowScopes -> "write"|"read"|"get"|"list"|"update"|"delete"|"create"
__ -> [\s]:+     {% function(d) {return null } %}
_ -> [\s]:*      {% function(d) {return null } %}