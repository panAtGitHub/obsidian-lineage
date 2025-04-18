import { Column } from 'src/stores/document/document-state-type';
import { DocumentViewState } from 'src/stores/view/view-state-type';
import { findGroupByNodeId } from 'src/lib/tree-utils/find/find-group-by-node-id';
import invariant from 'tiny-invariant';
import { findNodeColumn } from 'src/lib/tree-utils/find/find-node-column';

export type SelectAllNodesAction = {
    type: 'view/selection/select-all';
};

const compareSetToArray = (set: Set<string>, array: string[]) => {
    return set.size === array.length && array.every((node) => set.has(node));
};

export const selectAllNodes = (state: DocumentViewState, columns: Column[]) => {
    const firstColumnNodes = columns[0].groups[0].nodes;
    const rootColumnIsSelected = compareSetToArray(
        state.selectedNodes,
        firstColumnNodes,
    );

    if (rootColumnIsSelected) {
        return;
    }

    const column = columns[findNodeColumn(columns, state.activeNode)];
    invariant(column);
    const nodeColumnNodes = column.groups.flatMap((g) => g.nodes);
    const columnIsSelected = compareSetToArray(
        state.selectedNodes,
        nodeColumnNodes,
    );
    if (columnIsSelected) {
        state.selectedNodes = new Set(firstColumnNodes);
        state.activeNode = state.activeBranch.sortedParentNodes[0];
        return;
    }

    const nodeGroup = findGroupByNodeId(columns, state.activeNode);
    invariant(nodeGroup);
    const groupIsSelected = compareSetToArray(
        state.selectedNodes,
        nodeGroup.nodes,
    );
    if (groupIsSelected) {
        state.selectedNodes = new Set(nodeColumnNodes);
        return;
    }

    state.selectedNodes = new Set(nodeGroup.nodes);
};
