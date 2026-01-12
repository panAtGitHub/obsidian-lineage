import { MandalaView } from 'src/view/view';

export const persistCollapsedSections = (view: MandalaView) => {
    const viewState = view.viewStore.getValue();
    const documentState = view.documentStore.getValue();
    const collapsedParents = Array.from(viewState.outline.collapsedParents);
    const collapsedSections = collapsedParents
        .map((id) => {
            return documentState.sections.id_section[id];
        })
        .filter((x) => x);

    view.plugin.settings.dispatch({
        type: 'settings/document/persist-collapsed-sections',
        payload: {
            path: view.file!.path,
            sections: collapsedSections,
        },
    });
};
