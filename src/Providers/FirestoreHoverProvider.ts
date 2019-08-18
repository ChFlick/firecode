import * as vscode from 'vscode';

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const infos: { [name: string]: string | vscode.MarkdownString } = {
    'duration': 'Duration with nanosecond accuracy.',
    'nanos': new vscode.MarkdownString(
        `duration.nanos()  
        *nanos() returns rules.Integer*  
        Get the nanoseconds portion (signed) of the duration from -999,999,999 to +999,999,999 inclusive.  
        *returns* non-null rules.Integer nanoseconds portion of the dutation.` + '\n\n' +
        `timestamp.nanos()  
        *nanos() returns rules.Integer*  
        Get the nanos value of the timestamp.  
        *returns* non-null rules.Integer nanos value.`),
    'seconds': new vscode.MarkdownString(
        `duration.seconds()  
        *seconds() returns rules.Integer*  
        Get the seconds portion (signed) of the duration from -315,576,000,000 to +315,576,000,000 inclusive.  
        *returns* non-null rules.Integer seconds portion of the dutation.` + '\n\n' +
        `timestamp.seconds()  
        *seconds() returns rules.Integer*  
        Get the seconds value of the timestamp.  
        *returns* non-null rules.Integer seconds value.`),
    'latlng': 'Type representing a geopoint.',
    'distance': 'Calculate distance between two LatLng points in distance (meters).',
    'latitude': 'Get the latitude value in the range [-90.0, 90.0].',
    'longitude': 'Get the longitude value in the range [-180.0, 180.0].',
    'list': new vscode.MarkdownString(
        `allow list:  
        Read requests for queries and collections.` + '\n\n' + 
        `List type:  
        Items are not necessarily homogenous.`),
    'hasAll': 'Determine whether the list contains all elements in another list.',
    'hasAny': 'Determine whether the list contains any element in another list.',
    'hasOnly': 'Determine whether all elements in the list are present in another list.',
    'join': 'Join the elements in the list into a string, with a separator.',
    'size': `list.size(): Get the number of values in the list/map.` + '\n\n' +
        `string.size():  
        *size() returns rules.Integer*  
        Returns the number of characters in the string.  
        *returns* non-null rules.Integer the number of characters.`,
    'map': 'Map type, used for simple key-value mappings.',
    'keys': 'Get the list of keys in the map.',
    'values': 'Get the list of values in the map.',
    'number': 'A value of type Integer or type Float',
    'path': new vscode.MarkdownString('path[type]:  \nDirectory-like pattern for the location of a resource. Paths can be created in two ways. The first is in the "raw" form beginning with a forward slash `/`. The second is by converting from a string using the path() function.'
        + '\n\n'
        + 'resource.path  \nPath of the affected resource.'),
    'bind': 'Bind key-value pairs in a map to a path.',
    'request': new vscode.MarkdownString(`The incoming request context. It contains the following information:  
        * \`resource?\` - the new resource value, present on write requests only.  
        * \`auth\` - the request authentication context.  
        * \`method\` - the request method.  
        * \`params\` - any data not specifically related to the \`request.resource\` that might be useful for evaluation.  
        * \`path\` - the path for the target resource. The path is relative to the service.`),
    'auth': new vscode.MarkdownString(`Request authentication context. It contains the following information:  
        * \`uid\` - the UID of the requesting user.  
        * \`token\` - a map of JWT token claims.`),
    'method': new vscode.MarkdownString('The request method. One of  \n* get\n* list\n* create\n* update\n* delete'),
    'query': new vscode.MarkdownString('Map of query properties, when present.  \n* limit - query limit clause.\n* offset - query offset clause.\n* orderBy - query orderBy clause.'),
    'resource': new vscode.MarkdownString(`The new resource value, present on write requests only. It contains the following information:  
        * \`data\` - a Map of the document data.  
        * \`id\` - a String of the document's key.`),
    'time': new vscode.MarkdownString(
        `request.time:  
        When the request was received by the service. For Firestore write operations that include server-side timestamps, this time will be equal to the server timestamp.`
        + '\n\n' +
        `**static** time():  
        time(hours, mins, secs, nanos) returns rules.Duration  
        Create a duration from hours, minutes, seconds, and nanoseconds.  
        *returns* non-null rules.Duration a Duration`
        + '\n\n' +
        `timestamp.time():  
        time() returns rules.Duration  
        Get the duration value from the time portion of the timestamp.  
        *returns* non-null rules.Duration duration value.`),
    'value': new vscode.MarkdownString(
        `duration.value:  
        **static**  
        *value(magnitude, unit) returns rules.Duration*  
        Create a duration from a numeric magnitude and string unit.  
        *returns* non-null rules.Duration a Duration.` + '\n\n' +
        `latlng.value:  
        **static**  
        *value(lat, lng) returns rules.LatLng*  
        Create a LatLng from floating point coordinates.  
        *returns* non-null rules.LatLng a LatLng.` + '\n\n' +
        `timestamp.value:  
        **static**  
        *value(epochMillis) returns rules.Timestamp*  
        Make a timestamp from an epoch time in milliseconds.  
        *returns* non-null rules.Timestamp a timestamp.`),
    'exists': new vscode.MarkdownString(
        `**static**  
        *exists(path) returns rules.Boolean*  
        Check if a document exists.  
        *returns* non-null rules.Boolean true if the resource exists.`),
    'existsAfter': new vscode.MarkdownString(
        `**static**  
        *existsAfter(path) returns rules.Boolean*  
        Check if a document exists, assuming the current request succeeds. Equivalent to getAfter(path) != null.  
        *returns* non-null rules.Boolean true if the resource exists.`),
    'get': new vscode.MarkdownString(
        `allow get  
        Read requests for single documents or files.
        ` + '\n\n' +
        `**static**  
        *get(path) returns rules.firestore.Resource*  
        Get the contents of a firestore document.  
        *returns* non-null rules.firestore.Resource the document, or null if it does not exist`),
    'getAfter': new vscode.MarkdownString(
        `**static**  
        *getAfter(path) returns rules.firestore.Resource*  
        Get the projected contents of a document. The document is returned as if the current request had succeeded. Useful for validating documents that are part of a batched write or transaction.  
        *returns* non-null rules.firestore.Resource the document, or null if it does not exist`),
    'abs': new vscode.MarkdownString(
        `duration.abs: Absolute value of a duration.`
        + '\n\n' +
        `**static**  
        *abs(num) returns number*  
        Absolute value of a numeric value.  
        *returns* non-null number the absolute numeric value of the input.`),
    'ceil': new vscode.MarkdownString(
        `**static**  
        *ceil(num) returns rules.Integer*  
        Ceiling of the numeric value.  
        *returns* non-null rules.Integer the ceiling of the given value.`),
    'floor': new vscode.MarkdownString(
        `**static**  
        *floor(num) returns rules.Integer*  
        Ceiling of the numeric value.  
        *returns* non-null rules.Integer the floor of the given value.`),
    'isInfinite': new vscode.MarkdownString(
        `**static**  
        *isInfinite(num) returns rules.Boolean*  
        Test whether the value is ±∞.  
        *returns* non-null rules.Boolean true if the number is positive or negative infinity.`),
    'isNaN': new vscode.MarkdownString(
        `**static**  
        *isNaN(num) returns rules.Boolean*  
        Test whether the value is NaN.  
        *returns* non-null rules.Boolean true if the value is not a number.`),
    'round': new vscode.MarkdownString(
        `**static**  
        *round(num) returns rules.Integer*  
        Round the input value to the nearest int.  
        *returns* non-null rules.Integer the nearest int to the given value.`),
    'timestamp': 'Globally available timestamp functions. These functions are accessed using the timestamp prefix',
    'Timestamp': 'A timestamp in UTC with nanosecond accuracy',
    'date': new vscode.MarkdownString(
        `**static**  
        *date(year, month, day) returns rules.Timestamp*  
        Make a timestamp from a year, month, and day.  
        *returns* non-null rules.Timestamp a timestamp.` + '\n\n' +
        `timestamp.date()  
        *date() returns rules.Timestamp*  
        Timestamp value containing year, month, and day only.  
        *returns* non-null rules.Timestamp The timestamp.`),
    'String': new vscode.MarkdownString(
        `Primitive type representing a string value.  
        Strings can be lexicographically compared using the ==, !=, >, <, >= and <= operators.  
        Strings can be concatenated using the + operator.  
        Sub-strings can be accessed using the index operator [] and the range operator [i:j].  
        Boolean, integer, float, and null values can be converted into strings using the string() function.  `),
    'lower': new vscode.MarkdownString(
        `*lower() returns rules.String*  
        Returns a lowercase version of the input string.  
        *returns* non-null rules.String the lowercase string.`),
    'matches': new vscode.MarkdownString(
        `*matches(re) returns rules.Boolean*  
        Performs a regular expression match on the whole string.  
        *returns* non-null rules.Boolean true if the whole string matches, false otherwise.`),
    'split': new vscode.MarkdownString(
        `*split(re) returns rules.List*  
        Splits a string according to a regular expression.  
        *returns* non-null rules.List a list of strings.`),
    'trim': new vscode.MarkdownString(
        `*trim() returns rules.String*  
        Returns a version of the string with leading and trailing spaces removed.  
        *returns* non-null rules.String the trimmed string.`),
    'upper': new vscode.MarkdownString(
        `*upper() returns rules.String*  
        Returns an uppercase version of the input string.  
        *returns* non-null rules.String the uppercase string.`),
    'day': new vscode.MarkdownString(
        `*day() returns rules.Integer*  
        Get the day value of the timestamp.  
        *returns* non-null rules.Integer day value.`),
    'dayOfWeek': new vscode.MarkdownString(
        `*dayOfWeek() returns rules.Integer*  
        Get the day of the week as a value from 1 to 7.  
        *returns* non-null rules.Integer the day of the week.`),
    'dayOfYear': new vscode.MarkdownString(
        `*dayOfYear() returns rules.Integer*  
        Get the day of the year as a value from 1 to 366.  
        *returns* non-null rules.Integer day of the year.`),
    'hours': new vscode.MarkdownString(
        `*hours() returns rules.Integer*  
        Get the hours value of the timestamp.  
        *returns* non-null rules.Integer hours value.`),
    'minutes': new vscode.MarkdownString(
        `*minutes() returns rules.Integer*  
        Get the minutes value of the timestamp.  
        *returns* non-null rules.Integer minutes value.`),
    'month': new vscode.MarkdownString(
        `*month() returns rules.Integer*  
        Get the month value of the timestamp.  
        *returns* non-null rules.Integer month value.`),
    'toMillis': new vscode.MarkdownString(
        `*toMillis() returns rules.Integer*  
        Get the time in milliseconds since the epoch.  
        *returns* non-null rules.Integer time in milliseconds.`),
    'year': new vscode.MarkdownString(
        `*year() returns rules.Integer*  
        Get the year value of the timestamp.  
        *returns* non-null rules.Integer year value.`),
    '__name__': new vscode.MarkdownString(
        `resource['__name__']  
        The full document name, as a path.  
        *returns* non-null rules.Path.`),
    'data': new vscode.MarkdownString(
        `resource.data  
        Map of the document data.  
        *returns* non-null rules.Map.`),
    'id': new vscode.MarkdownString(
        `resource.id  
        String of the document's key.  
        *returns* non-null rules.String.`),
    'match': `A \`match\` block declares a \`path\` pattern that is matched against the path for the requested operation (the incoming \`request.path\`).
        The body of the \`match\` must have one or more nested \`match\` blocks, \`allow\` statements, or \`function\` declarations.
        The path in nested \`match\` blocks is relative to the path in the parent \`match\` block.`,

    // allow
    'allow': new vscode.MarkdownString(
        `allow a request if the following condition evaluates to \`true\`` + '\n\n' +
        `The following methods are possible:  
        * read  
            * get  
            * list  
        * write  
            * create  
            * update  
            * delete`),
    'service': 'contains one or more `match` blocks with `allow` statements that provide conditions granting access to requests',
    'read': 'Any type of read request. Equals `get` and `list`',
    'write': 'Any type of write request. Equals `create`, `update`, and `delete`',
    'create': 'Write new documents or files',
    'update': 'Write to existing documents or files',
    'delete': 'Delete data',

    // auth.token.
    'email': 'The email address associated with the account, if present.',
    'email_verified': 'true if the user has verified they have access to the email address. Some providers automatically verify email addresses they own.',
    'phone_number':	'The phone number associated with the account, if present.',
    'name':	'The user\'s display name, if set.',
    'sub': 'The user\'s Firebase UID. This is unique within a project.',
    'identities': `Dictionary of all the identities that are associated with this user's account.
        The keys of the dictionary can be any of the following: email, phone, google.com, facebook.com, github.com, twitter.com.
        The values of the dictionary are arrays of unique identifiers for each identity provider associated with the account.
        For example, auth.token.firebase.identities["google.com"][0] contains the first Google user ID associated with the account.`,
    'sign_in_provider':	`The sign-in provider used to obtain this token.
        Can be one of the following strings: custom, password, phone, anonymous, google.com, facebook.com, github.com, twitter.com.`,
    'uid': 'The userId of the authenticated user.'
};

export class FirestoreHoverProvider implements vscode.HoverProvider {
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const markedWord = document.getText(document.getWordRangeAtPosition(position));
        return new vscode.Hover(infos[markedWord]);
    }
}