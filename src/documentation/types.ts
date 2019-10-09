import { CompletionItemKind, MarkdownString } from 'vscode';

export type FlatDoc = { [name: string]: string | MarkdownString };

export interface DocumentationValue {
    header?: string;
    doc: string | MarkdownString;
    kind?: CompletionItemKind;
    childs?: Documentation;
}

export type Documentation = { [name: string]: DocumentationValue };