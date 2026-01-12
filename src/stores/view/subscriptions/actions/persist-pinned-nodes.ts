import { MandalaView } from 'src/view/view';

export const persistPinnedNodes = (view: MandalaView) => {
    const documentState = view.documentStore.getValue();
    const viewState = view.viewStore.getValue();
    const pinnedNodes = documentState.pinnedNodes;
    const sections = documentState.sections;
    const pinnedSections = pinnedNodes.Ids.map((id) => sections.id_section[id]);
    const section = sections.id_section[viewState.pinnedNodes.activeNode];
    view.plugin.settings.dispatch({
        type: 'settings/pinned-nodes/persist',
        payload: {
            sections: pinnedSections,
            filePath: view.file!.path,
            section,
        },
    });
};
