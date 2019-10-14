import { MarkdownString } from "vscode";
import { Documentation } from "./types";

// Mostly extracted from https://firebase.google.com/docs/reference/rules/index-all
export const keywordDoc: Readonly<Documentation> = {
    match: {
        doc: `A \`match\` block declares a \`path\` pattern that is matched against the path for the requested operation (the incoming \`request.path\`).
            The body of the \`match\` must have one or more nested \`match\` blocks, \`allow\` statements, or \`function\` declarations.
            The path in nested \`match\` blocks is relative to the path in the parent \`match\` block.`,
        scopes: ['meta.matcher.fs', 'meta.root.fs'],
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
        scopes: ['meta.matcher.fs'],
    },
    service: {
        doc: 'contains one or more `match` blocks with `allow` statements that provide conditions granting access to requests',
        scopes: ['source.firebase'],
    },
    read: {
        doc: 'Any type of read request. Equals `get` and `list`',
        scopes: ['meta.allow.fs'],
    },
    get: {
        doc: 'Read requests for single documents or files.',
        scopes: ['meta.allow.fs'],
    },
    list: {
        doc: 'Read requests for queries and collections.',
        scopes: ['meta.allow.fs'],
    },
    write: {
        doc: 'Any type of write request. Equals `create`, `update`, and `delete`',
        scopes: ['meta.allow.fs'],
    },
    create: {
        doc: 'Write new documents or files',
        scopes: ['meta.allow.fs'],
    },
    update: {
        doc: 'Write to existing documents or files',
        scopes: ['meta.allow.fs'],
    },
    delete: {
        doc: 'Delete data',
        scopes: ['meta.allow.fs'],
    }
};