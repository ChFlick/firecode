import { CompletionItemKind, MarkdownString } from 'vscode';

export type Scope = 'source.firebase' |
    'comment.line' |
    'meta.root.fs' |
    'meta.matcher.fs' |
    'string.unquoted.fs' |
    'meta.function.fs' |
    'meta.function.expression.fs' |
    'meta.allow.fs' |
    'meta.functioncall.fs' |
    'string.quoted.firestorerules';

export type FlatDoc = { [name: string]: string | MarkdownString };

export interface DocumentationValue {
    header?: string;
    doc: string | MarkdownString;
    kind?: CompletionItemKind;
    childs?: Documentation;
    scopes?: Scope[];
}

export type Documentation = { [name: string]: DocumentationValue };