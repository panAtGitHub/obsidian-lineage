import { MandalaGridDocument } from 'src/stores/document/document-state-type';
import { traverseDown } from 'src/lib/tree-utils/get/traverse-down';
import { deleteGroupsByParentId } from 'src/lib/tree-utils/delete/delete-groups-by-parent-id';

export const deleteChildNodes = (document: MandalaGridDocument, node: string) => {
    const childGroups = traverseDown(document.columns, node, false);
    if (childGroups.length > 0)
        deleteGroupsByParentId(
            document.columns,
            document.content,
            new Set(childGroups),
        );
};
