import { id } from 'src/helpers/id';
import {
    MandalaGridDocument,
    Snapshot,
    SnapshotContext,
} from 'src/stores/document/document-state-type';

export const createSnapshot = (
    document: MandalaGridDocument,
    context: SnapshotContext,
) => {
    return {
        data: {
            columns: JSON.stringify(document.columns),
            content: JSON.stringify(document.content),
        },
        context,
        created: Date.now(),
        id: id.snapshot(),
    } satisfies Snapshot;
};
