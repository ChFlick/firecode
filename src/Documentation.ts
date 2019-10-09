import { MarkdownString } from 'vscode';
import { typeDoc } from './documentation/typeDocumentation';
import { methodDoc } from './documentation/methodDocumentation';
import { Documentation, FlatDoc, DocumentationValue } from './documentation/types';
import { keywordDoc } from './documentation/keywordDocumentation';

const completeDocs = { ...typeDoc, ...methodDoc, ...keywordDoc };

const flatten = (documentation: Documentation, staticValue: boolean = false): FlatDoc => {
    let flatDoc: FlatDoc = {};
    for (const key of Object.keys(documentation)) {
        // With duplicate keys append content
        if (flatDoc[key]) {
            flatDoc[key] = combineStrings(flatDoc[key], createDocString(documentation[key], staticValue));
        } else {
            flatDoc[key] = createDocString(documentation[key], staticValue);
        }

        const childs = documentation[key].childs;
        if (childs) {
            const flattenedChilds = flatten(childs, staticValue);
            flatDoc = combine(flatDoc, flattenedChilds);
        }
    }

    return flatDoc;
};

const createDocString = (documentation: DocumentationValue, staticValue: boolean = false): string | MarkdownString => {
    if (!documentation.header) {
        return documentation.doc;
    }

    return new MarkdownString(staticValue ? '**static**' : '')
        .appendMarkdown('*' + documentation.header + '*')
        .appendMarkdown('  \n')
        .appendMarkdown(typeof documentation.doc === 'string' ? documentation.doc : documentation.doc.value);
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

// FIXME: duplicates(get!)
const flatDocs = combine(flatten(typeDoc), flatten(methodDoc, true), flatten(keywordDoc));

export const getDocForToken = (token: string, markedWord: string): string | MarkdownString => {
    if (!/[a-zA-Z0-9-_.]+/.test(token)) {
        return '';
    }

    const parts = token.split('.');
    let current: DocumentationValue = completeDocs[parts[0]];

    if (!current) {
        return flatDocs[markedWord];
    }

    for (const val of parts.slice(1)) {
        if (current.childs) {
            current = current.childs[val];
        } else {
            // token not valid? lucky guess flat doc
            return flatDocs[markedWord];
        }
    }

    return current ? current.doc : '';
};

export const getPotentialDocForPartial = (partial: string) => {
    const potentialDocs = Object.keys(flatDocs)
        .filter(value => value.startsWith(partial))
        .map(value => [value, flatDocs[value]]);

    return potentialDocs;
};
