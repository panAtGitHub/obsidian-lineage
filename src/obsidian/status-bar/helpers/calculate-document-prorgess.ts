import {
    columnsToExtendedJson,
    ExtendedTreeNode,
} from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { MandalaGridDocument } from 'src/stores/document/document-state-type';

const flattenTree = (
    nodes: ExtendedTreeNode[],
    result: ExtendedTreeNode[] = [],
): ExtendedTreeNode[] => {
    for (const node of nodes) {
        result.push(node);
        if (node.children.length > 0) flattenTree(node.children, result);
    }
    return result;
};

const calculateFlatTreeContentLength = (flatTree: ExtendedTreeNode[]) => {
    return flatTree.reduce((sum, node) => sum + node.content.length, 0);
};

export type DocumentProgressProps = {
    document: MandalaGridDocument;
    activeNode: string;
};
export const calculateDocumentProgress = (payload: DocumentProgressProps) => {
    const tree = columnsToExtendedJson(
        payload.document.columns,
        payload.document.content,
    );
    const flatTree = flattenTree(tree);
    const totalContentLength = calculateFlatTreeContentLength(flatTree);
    if (totalContentLength === 0) return 0;
    const targetNodeIndex = flatTree.findIndex(
        (node) => node.id === payload.activeNode,
    );

    if (targetNodeIndex === -1) return 0;

    const subTree = flatTree.slice(0, targetNodeIndex + 1);
    const contentLengthUpToTarget = calculateFlatTreeContentLength(subTree);

    return Math.round((contentLengthUpToTarget / totalContentLength) * 100);
};
