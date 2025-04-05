import { LineageView } from 'src/view/view';
import { sortNodeIdsBySectionNumber } from 'src/lib/tree-utils/sort/sort-node-ids-by-section-number';

export const getTextOfFlatNodes = (
    view: LineageView,
    nodes: string[],
    copyAsOutline = false,
) => {
    if (nodes.length === 1) copyAsOutline = false;
    const documentState = view.documentStore.getValue();
    const documentContent = documentState.document.content;
    const sortedNodes = sortNodeIdsBySectionNumber(
        documentState.sections,
        nodes,
    );
    return sortedNodes
        .map((id) => {
            const content = documentContent[id].content;
            return (copyAsOutline ? '- ' : '') + content;
        })
        .join(copyAsOutline ? '\n' : '\n\n');
};
