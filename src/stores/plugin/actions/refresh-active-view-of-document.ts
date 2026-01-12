import { MANDALA_VIEW_TYPE, MandalaView } from 'src/view/view';

export const refreshActiveViewOfDocument = (view: MandalaView) => {
    const views: [string, string][] = view.plugin.app.workspace
        .getLeavesOfType(MANDALA_VIEW_TYPE)
        .map((leaf) =>
            leaf.view instanceof MandalaView &&
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
