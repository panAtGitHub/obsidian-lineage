import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { lang } from 'src/lang/lang';
import {
    htmlElementRegex,
    parseHtmlElementMarker,
} from 'src/lib/data-conversion/helpers/html-element-marker/parse-html-element-marker';
import {
    getDepthLevel,
    trimCurrentNode,
} from 'src/lib/data-conversion/x-to-json/html-comment-to-json';

export const htmlElementToJson = (text: string) => {
    const lines = text.split('\n');

    const map: Record<string, TreeNode> = {};
    const tree: TreeNode[] = [];
    let currentNode: TreeNode | null = null;

    let currentParentNumber = '';
    for (const line of lines) {
        const sectionNumber = parseHtmlElementMarker(line);
        if (sectionNumber) {
            const [parent, , full] = sectionNumber;
            const isASibling = parent === currentParentNumber;

            const newNode = {
                content: line.replace(htmlElementRegex, ''),
                children: [],
            };
            map[full] = newNode;
            if (isASibling) {
                if (currentNode) trimCurrentNode(currentNode);
                const parentNode = map[parent];
                if (parentNode) {
                    parentNode.children.push(newNode);
                } else {
                    tree.push(newNode);
                }
                currentNode = newNode;
            } else {
                const isChild =
                    getDepthLevel(parent) > getDepthLevel(currentParentNumber);
                if (isChild) {
                    if (!currentNode) {
                        throw new Error(lang.error_parent_not_found(full));
                    }
                    trimCurrentNode(currentNode);
                    currentNode.children.push(newNode);
                    currentNode = newNode;
                } else {
                    if (!parent) {
                        if (currentNode) trimCurrentNode(currentNode);
                        tree.push(newNode);
                        currentNode = newNode;
                    } else {
                        const parentNode = map[parent];
                        if (!parentNode) {
                            throw new Error(lang.error_parent_not_found(full));
                        }
                        if (currentNode) trimCurrentNode(currentNode);
                        parentNode.children.push(newNode);
                        currentNode = newNode;
                    }
                }
            }
            currentParentNumber = parent;
        } else {
            if (currentNode) {
                if (currentNode.content) currentNode.content += '\n';
                currentNode.content += line;
            } else if (line.trim()) {
                currentNode = {
                    content: line,
                    children: [],
                };
                tree.push(currentNode);
            }
        }
    }
    return tree;
};
