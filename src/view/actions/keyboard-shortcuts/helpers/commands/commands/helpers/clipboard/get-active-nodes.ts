import { MandalaView } from 'src/view/view';

export const getActiveNodes = (view: MandalaView, isInSidebar: boolean) => {
    const viewState = view.viewStore.getValue();
    const documentState = viewState.document;

    let activeNode = '';
    if (isInSidebar) {
        const activeSidebarTab =
            view.plugin.settings.getValue().view.leftSidebarActiveTab;
        if (activeSidebarTab === 'recent-cards') {
            activeNode = viewState.recentNodes.activeNode;
        } else if (activeSidebarTab === 'pinned-cards') {
            activeNode = viewState.pinnedNodes.activeNode;
        }
        return [activeNode];
    } else if (documentState.selectedNodes.size > 0) {
        return Array.from(documentState.selectedNodes);
    } else {
        return [documentState.activeNode];
    }
};
