import { LINEAGE_VIEW_TYPE, LineageView } from 'src/view/view';

export const refreshActiveViewOfDocument = (view: LineageView) => {
    const views: [string, string][] = view.plugin.app.workspace
        .getLeavesOfType(LINEAGE_VIEW_TYPE)
        .map((leaf) =>
            leaf.view instanceof LineageView &&
            leaf.view !== view &&
            leaf.view.file
                ? [leaf.view.id, leaf.view.file.path]
                : null,
        )
        .filter((x) => x) as [string, string][];

    view.plugin.store.dispatch({
        type: 'plugin/documents/refresh-active-view-of-document',
        payload: { views },
    });
};
