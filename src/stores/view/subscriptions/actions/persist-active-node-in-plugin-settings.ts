import { MandalaView } from 'src/view/view';
import { getSectionOfId } from 'src/stores/view/subscriptions/helpers/get-section-of-id';

const state: {
    [path: string]: string;
} = {};

export const persistActiveNodeInPluginSettings = (view: MandalaView) => {
    if (!view.file) return;
    const documentState = view.documentStore.getValue();
    const viewState = view.viewStore.getValue();
    const sectionNumber = getSectionOfId(
        documentState.sections,
        viewState.document.activeNode,
    );

    const path = view.file?.path;

    if (state[path] === sectionNumber) return;
    state[path] = sectionNumber;
    view.plugin.settings.dispatch({
        type: 'settings/document/persist-active-section',
        payload: {
            sectionNumber: sectionNumber,
            path: path,
        },
    });
};
