import { MandalaView } from 'src/view/view';
import { MarkdownView } from 'obsidian';

export const unlockFile = (view: MandalaView) => {
    view.plugin.app.workspace.iterateAllLeaves((e) => {
        const leafView = e.view;
        if (leafView instanceof MarkdownView) {
            if (leafView.file === view.file) {
                if ('__setViewData__' in leafView) {
                    // @ts-ignore
                    leafView.setViewData = leafView.__setViewData__;
                    delete leafView.__setViewData__;
                }
            }
        }
    });
};
