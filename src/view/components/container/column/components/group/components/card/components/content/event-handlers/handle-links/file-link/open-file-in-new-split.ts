import { LineageView } from 'src/view/view';
import { openFileInExistingRightTabGroup } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/helpers/open-file-in-existing-right-tab-group';

export const openFileInNewSplit = (view: LineageView, link: string) => {
    const path = view.documentStore.getValue().file.path;
    if (!link || !path) return;
    const success = openFileInExistingRightTabGroup(view, link, path);
    if (!success) {
        view.plugin.app.workspace.openLinkText(link, path, 'split');
    }
};
