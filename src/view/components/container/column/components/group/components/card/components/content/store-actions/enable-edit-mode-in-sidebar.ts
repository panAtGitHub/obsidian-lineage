import { MandalaView } from 'src/view/view';

export const enableEditModeInSidebar = (view: MandalaView, nodeId: string) => {
    const settings = view.plugin.settings.getValue();
    const activeSidebarTab = settings.view.leftSidebarActiveTab;
    view.viewStore.dispatch({
        type: 'view/editor/enable-sidebar-editor',
        payload: {
            id: nodeId,
        },
        context: {
            activeSidebarTab: activeSidebarTab,
        },
    });
};
