import { LineageView } from 'src/view/view';

export const getLinkPaneType = (view: LineageView, modKey: boolean) => {
    const linkPaneType = view.plugin.settings.getValue().general.linkPaneType;
    if (modKey) {
        return linkPaneType === 'tab' ? 'split' : 'tab';
    } else {
        return linkPaneType;
    }
};

export const handleGlobalBlockLink = (
    view: LineageView,
    link: string,
    modKey: boolean,
) => {
    view.plugin.app.workspace.openLinkText(
        link,
        view.file!.basename,
        getLinkPaneType(view, modKey),
    );
};
