import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { level } from 'src/lib/data-conversion/helpers/html-comment-marker/create-html-comment-marker';
import {
    collapsedSpanMarker,
    expandedSpanMarker,
} from 'src/lib/data-conversion/helpers/html-element-marker/collapsed-span-marker';

export const jsonToHtmlElement = (
    tree: TreeNode[],
    parentNumber = '',
    text = '',
) => {
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];

        const index = i + 1;
        if (text) text = text + '\n\n';

        let content = node.content.trimStart();

        const expandedSpan = expandedSpanMarker(parentNumber, index);
        if (content.match(/^#+ /)) {
            // an additional '\n' is needed as a workaround for a bug in obsidian
            content = `${expandedSpan}\n${content}`;
        } else if (content.match(/^#[^\s#\uFEFF\u200B]+/)) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('>')) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.match(/^[-*+]\s\[.\]\s/)) {
            // tasks
            content = `${expandedSpan}\n${content}`;
        } else if (content.match(/^[-*+]\s/)) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.match(/^\d+\.\s/)) {
            // numbered list
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('```')) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('|')) {
            // table
            content = `${expandedSpan}\n\n${content}`;
        } else if (content.startsWith('[[')) {
            // wikilink
            content = `${expandedSpan}\n${content}`;
        } else {
            const collapsedSpan = collapsedSpanMarker(parentNumber, index);
            content = `${collapsedSpan}${content}`;
        }

        text += content;

        if (node.children.length > 0) {
            text = jsonToHtmlElement(
                node.children,
                level(parentNumber, index),
                text,
            );
        }
    }
    return text;
};
