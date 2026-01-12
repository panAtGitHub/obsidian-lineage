import { MandalaView } from 'src/view/view';
import { MarkdownView } from 'obsidian';

const noop = async () => {};
export const lockFile = (view: MandalaView) => {
    view.plugin.app.workspace.iterateAllLeaves((e) => {
        const leafView = e.view;
        if (leafView instanceof MarkdownView) {
            if (leafView.file === view.file) {
                // @ts-ignore
                leafView.__setViewData__ = leafView.setViewData;
                leafView.setViewData = noop;
            }
        }
    });
};
