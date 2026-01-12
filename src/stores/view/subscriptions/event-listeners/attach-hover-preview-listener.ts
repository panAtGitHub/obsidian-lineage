import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';
import { MandalaView } from 'src/view/view';

const getLink = (el: HTMLElement) => {
    return el.getAttr('data-href') || el.getAttr('href');
};

export const attachHoverPreviewListener = (view: MandalaView) => {
    view.plugin.registerDomEvent(view.contentEl, 'mouseover', (evt) => {
        if (!(isMacLike ? evt.metaKey : evt.ctrlKey)) return;
        const targetEl = evt.target as HTMLElement;
        if (targetEl.tagName !== 'A') return;
        if (!targetEl.hasClass('internal-link')) return;
        const href = getLink(targetEl);
        if (!href) return;
        view.plugin.app.workspace.trigger('hover-link', {
            event: evt,
            source: 'preview',
            hoverParent: view,
            targetEl,
            linktext: href,
            sourcePath: view.file!.path,
        });
    });
};
