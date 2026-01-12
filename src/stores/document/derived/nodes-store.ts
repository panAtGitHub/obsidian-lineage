import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';
import { Column, NodeGroup } from 'src/stores/document/document-state-type';
import { findColumn } from 'src/stores/document/derived/groups-store';
import { sortTreeNodes } from 'src/lib/tree-utils/sort/sort-tree-nodes';

export const findGroup = (
    columns: Column[],
    columnId: string,
    groupId: string,
) => {
    const column = findColumn(columns, columnId);
    if (column) {
        return column.groups.find((group) => group.parentId === groupId);
    }
};

export const nodesStore = (
    view: MandalaView,
    columnId: string,
    groupId: string,
) => {
    let group: NodeGroup | undefined;
    let columns: Column[];
    return derived(view.documentStore, (state) => {
        if (!group || columns !== state.document.columns) {
            columns = state.document.columns;
            group = findGroup(columns, columnId, groupId);
            if (!group) return [];
        }
        return group.nodes;
    });
};

export const singleColumnNodesStore = (view: MandalaView) => {
    return derived(view.documentStore, (state) => {
        return sortTreeNodes(state.document.columns);
    });
};
