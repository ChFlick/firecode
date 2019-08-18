import { MarkdownString } from 'vscode';

type FlatDoc = { [name: string]: string | MarkdownString };

export interface Documentation {
    [name: string]: {
        doc: string | MarkdownString,
        childs?: Documentation
    };
}

const typeDoc: Readonly<Documentation> = {
    duration: {
        doc: 'Duration with nanosecond accuracy.',
        childs: {
            nanos: {
                doc: new MarkdownString(
                    `duration.nanos()  
                    *nanos() returns rules.Integer*  
                    Get the nanoseconds portion (signed) of the duration from -999,999,999 to +999,999,999 inclusive.  
                    *returns* non-null rules.Integer nanoseconds portion of the dutation.`)
            },
            seconds: {
                doc: new MarkdownString(
                    `duration.seconds()  
                    *seconds() returns rules.Integer*  
                    Get the seconds portion (signed) of the duration from -315,576,000,000 to +315,576,000,000 inclusive.  
                    *returns* non-null rules.Integer seconds portion of the dutation.`)
            }
        }
    }
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