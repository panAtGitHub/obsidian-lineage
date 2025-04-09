import Lineage from 'src/main';
import { LineageView } from 'src/view/view';
import { removeStaleDocuments } from 'src/stores/plugin/subscriptions/effects/remove-stale-documents/remove-stale-documents';

export const onWorkspaceEvent = (plugin: Lineage) => {
    const onActiveLeafChangeRef = plugin.app.workspace.on(
        'active-leaf-change',
        (leaf) => {
            const view = leaf?.view;
            if (view instanceof LineageView && view.file?.path) {
                view.plugin.store.dispatch({
                    type: 'plugin/documents/update-active-view-of-document',
                    payload: {
                        path: view.file?.path,
                        viewId: view.id,
                    },
                });
            }
            plugin.store.dispatch({
                type: 'plugin/echo/workspace/active-leaf-change',
            });
        },
    );

    const onResizeRef = plugin.app.workspace.on('resize', () => {
        plugin.store.dispatch({
            type: 'plugin/echo/workspace/resize',
        });
    });

    plugin.app.workspace.onLayoutReady(() => {
        plugin.store.dispatch({
            type: 'plugin/echo/workspace/layout-ready',
        });
        removeStaleDocuments(plugin);
    });
    plugin.registerEvent(onActiveLeafChangeRef);
    plugin.registerEvent(onResizeRef);
};
