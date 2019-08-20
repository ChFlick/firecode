import { MarkdownString, CompletionItemKind } from 'vscode';

type FlatDoc = { [name: string]: string | MarkdownString };

export interface Documentation {
    [name: string]: {
        name?: string,
        header?: string,
        doc: string | MarkdownString,
        kind?: CompletionItemKind,
        childs?: Documentation
    };
}

const keywordDoc: Readonly<Documentation> = {
    match: {
        doc: `A \`match\` block declares a \`path\` pattern that is matched against the path for the requested operation (the incoming \`request.path\`).
        The body of the \`match\` must have one or more nested \`match\` blocks, \`allow\` statements, or \`function\` declarations.
        The path in nested \`match\` blocks is relative to the path in the parent \`match\` block.`
    },
    allow: {
        doc: new MarkdownString(
            `allow a request if the following condition evaluates to \`true\`` + '\n\n' +
            `The following methods are possible:  
            * read  
                * get  
                * list  
            * write  
                * create  
                * update  
                * delete`),
    },
    service: {
        doc: 'contains one or more `match` blocks with `allow` statements that provide conditions granting access to requests',
    },
    read: {
        doc: 'Any type of read request. Equals `get` and `list`',
    },
    get: {
        doc: 'Read requests for single documents or files.',
    },
    list: {
        doc: 'Read requests for queries and collections.',
    },
    write: {
        doc: 'Any type of write request. Equals `create`, `update`, and `delete`',
    },
    create: {
        doc: 'Write new documents or files',
    },
    update: {
        doc: 'Write to existing documents or files',
    },
    delete: {
        doc: 'Delete data',
    }
};

const methodDoc: Readonly<Documentation> = {
    time: {
        header: 'time(hours, mins, secs, nanos) returns rules.Duration',
        doc: 'Create a duration from hours, minutes, seconds, and nanoseconds.'
    },
    durationValue: {
        name: 'value',
        header: 'value(magnitude, unit) returns rules.Duration',
        doc: 'Create a duration from a numeric magnitude and string unit.'
    },
    latlngValue: {
        name: 'value',
        header: 'value(lat, lng) returns rules.LatLng',
        doc: 'Create a LatLng from floating point coordinates.'
    },
    timestampValue: {
        name: 'value',
        header: 'value(epochMillis) returns rules.Timestamp',
        doc: 'Make a timestamp from an epoch time in milliseconds.'
    },
    exists: {
        header: 'exists(path) returns rules.Boolean',
        doc: 'Check if a document exists.'
    },
    existsAfter: {
        header: 'existsAfter(path) returns rules.Boolean',
        doc: 'Check if a document exists, assuming the current request succeeds. Equivalent to getAfter(path) != null.'
    },
    get: {
        header: 'get(path) returns rules.firestore.Resource',
        doc: 'Get the contents of a firestore document.'
    },
    getAfter: {
        header: 'getAfter(path) returns rules.firestore.Resource',
        doc: 'Get the projected contents of a document. The document is returned as if the current request had succeeded. Useful for validating documents that are part of a batched write or transaction.'
    },
    abs: {
        header: 'abs(num) returns number',
        doc: 'Absolute value of a numeric value.'
    },
    ceil: {
        header: 'ceil(num) returns rules.Integer',
        doc: 'Ceiling of the numeric value.'
    },
    floor: {
        header: 'floor(num) returns rules.Integer',
        doc: 'Ceiling of the numeric value.'
    },
    isInfinite: {
        header: 'isInfinite(num) returns rules.Boolean',
        doc: 'Test whether the value is ±∞.'
    },
    isNaN: {
        header: 'isNaN(num) returns rules.Boolean',
        doc: 'Test whether the value is NaN.'
    },
    round: {
        header: 'round(num) returns rules.Integer',
        doc: 'Round the input value to the nearest int.'
    },
    date: {
        header: 'date(year, month, day) returns rules.Timestamp',
        doc: 'Make a timestamp from a year, month, and day.'
    }
};

const typeDoc: Readonly<Documentation> = {
    duration: {
        doc: 'Duration with nanosecond accuracy.',
        kind: CompletionItemKind.Class,
        childs: {
            nanos: {
                kind: CompletionItemKind.Method,
                doc: new MarkdownString(
                    `duration.nanos()  
                    *nanos() returns rules.Integer*  
                    Get the nanoseconds portion (signed) of the duration from -999,999,999 to +999,999,999 inclusive.  
                    *returns* non-null rules.Integer nanoseconds portion of the dutation.`)
            },
            seconds: {
                kind: CompletionItemKind.Method,
                doc: new MarkdownString(
                    `duration.seconds()  
                    *seconds() returns rules.Integer*  
                    Get the seconds portion (signed) of the duration from -315,576,000,000 to +315,576,000,000 inclusive.  
                    *returns* non-null rules.Integer seconds portion of the dutation.`)
            }
        }
    },
    latlng: {
        doc: 'Type representing a geopoint.',
        kind: CompletionItemKind.Class,
        childs: {
            distance: {
                kind: CompletionItemKind.Method,
                doc: 'Calculate distance between two LatLng points in distance (meters).',
            },
            latitude: {
                kind: CompletionItemKind.Method,
                doc: 'Get the latitude value in the range [-90.0, 90.0].'
            },
            longitude: {
                kind: CompletionItemKind.Method,
                doc: 'Get the longitude value in the range [-180.0, 180.0].'
            }
        }
    },
    list: {
        doc: new MarkdownString(
            `List type.  
            Items are not necessarily homogenous.`),
        kind: CompletionItemKind.Class,
        childs: {
            hasAll: {
                kind: CompletionItemKind.Method,
                doc: 'Determine whether the list contains all elements in another list.',
            },
            hasAny: {
                kind: CompletionItemKind.Method,
                doc: 'Determine whether the list contains any element in another list.'
            },
            hasOnly: {
                kind: CompletionItemKind.Method,
                doc: 'Determine whether all elements in the list are present in another list.'
            },
            join: {
                kind: CompletionItemKind.Method,
                doc: 'Join the elements in the list into a string, with a separator.'
            },
            size: {
                kind: CompletionItemKind.Method,
                doc: 'Get the number of values in the list.'
            }
        }
    },
    map: {
        doc: 'Map type, used for simple key-value mappings.',
        kind: CompletionItemKind.Class,
        childs: {
            keys: {
                kind: CompletionItemKind.Method,
                doc: 'Get the list of keys in the map.',
            },
            values: {
                kind: CompletionItemKind.Method,
                doc: 'Get the list of values in the map.'
            }
        }
    },
    number: {
        doc: 'A value of type Integer or type Float',
        kind: CompletionItemKind.Class,
    },
    path: {
        doc: new MarkdownString('path[type]:  \nDirectory-like pattern for the location of a resource. Paths can be created in two ways. The first is in the "raw" form beginning with a forward slash `/`. The second is by converting from a string using the path() function.'),
        kind: CompletionItemKind.Class,
        childs: {
            bind: {
                kind: CompletionItemKind.Method,
                doc: 'Bind key-value pairs in a map to a path.',
            }
        }
    },
    request: {
        doc: 'The incoming request context',
        kind: CompletionItemKind.Class,
        childs: {
            resource: {
                doc: new MarkdownString(`The new resource value, present on write requests only. It contains the following information:  
                    * \`data\` - a Map of the document data.  
                    * \`id\` - a String of the document's key.`),
                kind: CompletionItemKind.Field,
                childs: {
                    data: {
                        doc: 'A map of the document\'s data.',
                        kind: CompletionItemKind.Field
                    },
                    id: {
                        doc: 'A string of the document\'s key.',
                        kind: CompletionItemKind.Field
                    }
                }
            },
            auth: {
                doc: new MarkdownString(`Request authentication context. It contains the following information:  
                    * \`uid\` - the UID of the requesting user.  
                    * \`token\` - a map of JWT token claims.`),
                kind: CompletionItemKind.Field,
                childs: {
                    uid: {
                        doc: 'The UID of the requesting user.',
                        kind: CompletionItemKind.Field
                    },
                    token: {
                        doc: 'A map of JWT token claims.',
                        kind: CompletionItemKind.Field,
                        childs: {
                            email: {
                                doc: 'The email address associated with the account, if present.',
                                kind: CompletionItemKind.Field,
                            },
                            email_verified: {
                                doc: 'true if the user has verified they have access to the email address. Some providers automatically verify email addresses they own.',
                                kind: CompletionItemKind.Field,
                            },
                            phone_number: {
                                doc: 'The phone number associated with the account, if present.',
                                kind: CompletionItemKind.Field,
                            },
                            name: {
                                doc: 'The user\'s display name, if set.',
                                kind: CompletionItemKind.Field,
                            },
                            sub: {
                                doc: 'The user\'s Firebase UID. This is unique within a project.',
                                kind: CompletionItemKind.Field,
                            },
                            firebase: {
                                doc: 'Firebase data.',
                                kind: CompletionItemKind.Field,
                                childs: {
                                    identities: {
                                        doc: `Dictionary of all the identities that are associated with this user's account.
                                            The keys of the dictionary can be any of the following: email, phone, google.com, facebook.com, github.com, twitter.com.
                                            The values of the dictionary are arrays of unique identifiers for each identity provider associated with the account.
                                            For example, auth.token.firebase.identities["google.com"][0] contains the first Google user ID associated with the account.`,
                                        kind: CompletionItemKind.Field
                                    },
                                    sign_in_provider: {
                                        doc: `The sign-in provider used to obtain this token.
                                        Can be one of the following strings: custom, password, phone, anonymous, google.com, facebook.com, github.com, twitter.com.`,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            method: {
                doc: new MarkdownString('The request method. One of  \n* get\n* list\n* create\n* update\n* delete'),
                kind: CompletionItemKind.EnumMember
            },
            path: {
                doc: 'Path of the affected resource.',
                kind: CompletionItemKind.Field
            },
            query: {
                doc: new MarkdownString(`Map of query properties, when present.  
                    * limit - query limit clause.  
                    * offset - query offset clause.  
                    * orderBy - query orderBy clause.`),
                kind: CompletionItemKind.Field
            },
            time: {
                doc: new MarkdownString(`When the request was received by the service.  
                    For Firestore write operations that include server-side timestamps, this time will be equal to the server timestamp.`),
                kind: CompletionItemKind.Field
            }
        }
    },
    resource: {
        doc: 'The firestore document being read or written.',
        kind: CompletionItemKind.Class,
        childs: {
            __name__: {
                doc: 'The full document name, as a path.',
                kind: CompletionItemKind.Field
            },
            data: {
                doc: 'Map of the document data.',
                kind: CompletionItemKind.Field
            },
            id: {
                doc: 'String of the document\'s key.',
                kind: CompletionItemKind.Field
            }
        }
    },
    string: {
        doc: new MarkdownString(
            `Primitive type representing a string value.  
            Strings can be lexicographically compared using the ==, !=, >, <, >= and <= operators.  
            Strings can be concatenated using the + operator.  
            Sub-strings can be accessed using the index operator [] and the range operator [i:j].  
            Boolean, integer, float, and null values can be converted into strings using the string() function.  `),
        kind: CompletionItemKind.Class,
        childs: {
            lower: {
                doc: new MarkdownString(
                    `*lower() returns rules.String*  
                    Returns a lowercase version of the input string.  
                    *returns* non-null rules.String the lowercase string.`),
                kind: CompletionItemKind.Method
            },
            matches: {
                doc: new MarkdownString(
                    `*matches(re) returns rules.Boolean*  
                    Performs a regular expression match on the whole string.  
                    *returns* non-null rules.Boolean true if the whole string matches, false otherwise.`),
                kind: CompletionItemKind.Method
            },
            split: {
                doc: new MarkdownString(
                    `*split(re) returns rules.List*  
                    Splits a string according to a regular expression.  
                    *returns* non-null rules.List a list of strings.`),
                kind: CompletionItemKind.Method
            },
            trim: {
                doc: new MarkdownString(
                    `*trim() returns rules.String*  
                    Returns a version of the string with leading and trailing spaces removed.  
                    *returns* non-null rules.String the trimmed string.`),
                kind: CompletionItemKind.Method
            },
            upper: {
                doc: new MarkdownString(
                    `*upper() returns rules.String*  
                    Returns an uppercase version of the input string.  
                    *returns* non-null rules.String the uppercase string.`),
                kind: CompletionItemKind.Method
            },
        }
    },
    timestamp: {
        doc: 'A timestamp in UTC with nanosecond accuracy',
        kind: CompletionItemKind.Class,
        childs: {
            date: {
                doc: new MarkdownString(
                    `timestamp.date()  
                    *date() returns rules.Timestamp*  
                    Timestamp value containing year, month, and day only.  
                    *returns* non-null rules.Timestamp The timestamp.`),
                kind: CompletionItemKind.Method
            },
            day: {
                doc: new MarkdownString(
                    `*day() returns rules.Integer*  
                    Get the day value of the timestamp.  
                    *returns* non-null rules.Integer day value.`),
                kind: CompletionItemKind.Method
            },
            dayOfWeek: {
                doc: new MarkdownString(
                    `*dayOfWeek() returns rules.Integer*  
                    Get the day of the week as a value from 1 to 7.  
                    *returns* non-null rules.Integer the day of the week.`),
                kind: CompletionItemKind.Method
            },
            dayOfYear: {
                doc: new MarkdownString(
                    `*dayOfYear() returns rules.Integer*  
                    Get the day of the year as a value from 1 to 366.  
                    *returns* non-null rules.Integer day of the year.`),
                kind: CompletionItemKind.Method
            },
            hours: {
                doc: new MarkdownString(
                    `*hours() returns rules.Integer*  
                    Get the hours value of the timestamp.  
                    *returns* non-null rules.Integer hours value.`),
                kind: CompletionItemKind.Method
            },
            minutes: {
                doc: new MarkdownString(
                    `*minutes() returns rules.Integer*  
                    Get the minutes value of the timestamp.  
                    *returns* non-null rules.Integer minutes value.`),
                kind: CompletionItemKind.Method
            },
            seconds: {
                doc: new MarkdownString(
                    `*seconds() returns rules.Integer*  
                    Get the seconds value of the timestamp.  
                    *returns* non-null rules.Integer seconds value.`),
                kind: CompletionItemKind.Method
            },
            nanos: {
                doc: new MarkdownString(
                    `*nanos() returns rules.Integer*  
                    Get the nanos value of the timestamp.  
                    *returns* non-null rules.Integer nanos value.`),
                kind: CompletionItemKind.Method
            },
            month: {
                doc: new MarkdownString(
                    `*month() returns rules.Integer*  
                    Get the month value of the timestamp.  
                    *returns* non-null rules.Integer month value.`),
                kind: CompletionItemKind.Method
            },
            toMillis: {
                doc: new MarkdownString(
                    `*toMillis() returns rules.Integer*  
                    Get the time in milliseconds since the epoch.  
                    *returns* non-null rules.Integer time in milliseconds.`),
                kind: CompletionItemKind.Method
            },
            year: {
                doc: new MarkdownString(
                    `*year() returns rules.Integer*  
                    Get the year value of the timestamp.  
                    *returns* non-null rules.Integer year value.`),
                kind: CompletionItemKind.Method
            },
            time: {
                header: 'time() returns rules.Duration',
                doc: 'Get the duration value from the time portion of the timestamp',
                kind: CompletionItemKind.Method
            }
        }
    }
};

const flatten = (documentation: Documentation): FlatDoc => {
    let flatDoc: FlatDoc = {};
    for (const key of Object.keys(documentation)) {
        const actualKey = documentation[key].name || key;

        // With duplicate keys append content
        if (flatDoc[actualKey]) {
            flatDoc[actualKey] = combineStrings(flatDoc[actualKey], documentation[key].doc);
        } else {
            flatDoc[actualKey] = documentation[key].doc;
        }

        const childs = documentation[key].childs;
        if (childs) {
            const flattenedChilds = flatten(childs);
            flatDoc = combine(flatDoc, flattenedChilds);
        }
    }

    return flatDoc;
};

const combine = (...flatDocs: FlatDoc[]) => {
    const newFlatDoc: FlatDoc = {};
    flatDocs.forEach(flatDoc => {
        for (const key of Object.keys(flatDoc)) {
            if (newFlatDoc[key]) {
                newFlatDoc[key] = combineStrings(newFlatDoc[key], flatDoc[key]);
            } else {
                newFlatDoc[key] = flatDoc[key];
            }
        }
    });
    return newFlatDoc;
};

const combineStrings = (first: string | MarkdownString, second: string | MarkdownString): MarkdownString => {
    if (typeof first === 'string') {
        if (typeof second === 'string') {
            return new MarkdownString(`${first}\n\n${second}`);
        } else {
            return new MarkdownString(`${first}\n\n`).appendMarkdown(second.value);
        }
    } else {
        if (typeof second === 'string') {
            return new MarkdownString(`${first.value}\n\n`).appendMarkdown(second);
        } else {
            return new MarkdownString(`${first.value}\n\n`).appendMarkdown(second.value);
        }
    }
};

export const flatDocs = combine(flatten(typeDoc), flatten(methodDoc), flatten(keywordDoc));