import { CompletionItemKind, MarkdownString } from "vscode";
import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const typeDoc: Readonly<Documentation> = {
    duration: {
        doc: 'Duration with nanosecond accuracy.',
        kind: CompletionItemKind.Class,
        childs: {
            nanos: {
                kind: CompletionItemKind.Method,
                header: 'nanos() returns rules.Integer',
                doc: 'Get the nanoseconds portion (signed) of the duration from -999,999,999 to +999,999,999 inclusive.'
            },
            seconds: {
                kind: CompletionItemKind.Method,
                header: 'seconds() returns rules.Integer',
                doc: 'Get the seconds portion (signed) of the duration from -315,576,000,000 to +315,576,000,000 inclusive.'
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
                header: 'lower() returns rules.String',
                doc: 'Returns a lowercase version of the input string.',
                kind: CompletionItemKind.Method
            },
            matches: {
                header: 'matches(re) returns rules.Boolean',
                doc: 'Performs a regular expression match on the whole string.',
                kind: CompletionItemKind.Method
            },
            split: {
                header: 'split(re) returns rules.List',
                doc: 'Splits a string according to a regular expression.',
                kind: CompletionItemKind.Method
            },
            trim: {
                header: 'trim() returns rules.String',
                doc: 'Returns a version of the string with leading and trailing spaces removed.',
                kind: CompletionItemKind.Method
            },
            upper: {
                header: 'upper() returns rules.String',
                doc: 'Returns an uppercase version of the input string.',
                kind: CompletionItemKind.Method
            },
        }
    },
    timestamp: {
        doc: 'A timestamp in UTC with nanosecond accuracy',
        kind: CompletionItemKind.Class,
        childs: {
            date: {
                header: 'date() returns rules.Timestamp',
                doc: 'Timestamp value containing year, month, and day only.',
                kind: CompletionItemKind.Method
            },
            day: {
                header: 'day() returns rules.Integer',
                doc: 'Get the day value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            dayOfWeek: {
                header: 'dayOfWeek() returns rules.Integer',
                doc: 'Get the day of the week as a value from 1 to 7.',
                kind: CompletionItemKind.Method
            },
            dayOfYear: {
                header: 'dayOfYear() returns rules.Integer',
                doc: 'Get the day of the year as a value from 1 to 366.',
                kind: CompletionItemKind.Method
            },
            hours: {
                header: 'hours() returns rules.Integer',
                doc: 'Get the hours value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            minutes: {
                header: 'minutes() returns rules.Integer',
                doc: 'Get the minutes value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            seconds: {
                header: 'seconds() returns rules.Integer',
                doc: 'Get the seconds value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            nanos: {
                header: 'nanos() returns rules.Integer',
                doc: 'Get the nanos value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            month: {
                header: 'month() returns rules.Integer',
                doc: 'Get the month value of the timestamp.',
                kind: CompletionItemKind.Method
            },
            toMillis: {
                header: 'toMillis() returns rules.Integer',
                doc: 'Get the time in milliseconds since the epoch.',
                kind: CompletionItemKind.Method
            },
            year: {
                header: 'year() returns rules.Integer',
                doc: 'Get the year value of the timestamp',
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