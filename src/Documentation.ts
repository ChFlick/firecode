import { MarkdownString, CompletionItemKind } from 'vscode';

type FlatDoc = { [name: string]: string | MarkdownString };

export interface Documentation {
    [name: string]: {
        doc: string | MarkdownString,
        kind?: CompletionItemKind,
        childs?: Documentation
    };
}

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
};

const flatten = (documentation: Documentation): FlatDoc => {
    let flatDoc: FlatDoc = {};
    for (const key of Object.keys(documentation)) {
        flatDoc[key] = documentation[key].doc;

        const childs = documentation[key].childs;
        if (childs) {
            const flattenedChilds = flatten(childs);
            flatDoc = { ...flatDoc, ...flattenedChilds };
        }
    }
    
    return flatDoc;
};

export const flatDocs = flatten(typeDoc);