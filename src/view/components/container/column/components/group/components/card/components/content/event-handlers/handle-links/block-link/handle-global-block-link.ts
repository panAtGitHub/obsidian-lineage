import { LineageView } from 'src/view/view';

export const handleGlobalBlockLink = (view: LineageView, link: string) => {
    view.plugin.app.workspace.openLinkText(link, view.file!.basename, 'split');
};
