import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { level } from 'src/lib/data-conversion/helpers/html-comment-marker/create-html-comment-marker';
import { expandedSpanMarker } from 'src/lib/data-conversion/helpers/html-element-marker/collapsed-span-marker';

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
        if (/^#+ /.test(content)) {
            content = `${expandedSpan}\n${content}`;
        } else if (/^#[^\s#\uFEFF\u200B]+/.test(content)) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('>')) {
            content = `${expandedSpan}\n${content}`;
        } else if (/^[-*+]\s\[.\]\s/.test(content)) {
            // tasks
            content = `${expandedSpan}\n${content}`;
        } else if (/^[-*+]\s/.test(content)) {
            content = `${expandedSpan}\n${content}`;
        } else if (/^\d+\.\s/.test(content)) {
            // numbered list
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('```')) {
            content = `${expandedSpan}\n${content}`;
        } else if (content.startsWith('|')) {
            // table
            content = `${expandedSpan}\n\n${content}`;
        } else if (/^!?\[\[/.test(content)) {
            // wikilink
            content = `${expandedSpan}\n${content}`;
        } else {
            content = `${expandedSpan}${content}`;
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
