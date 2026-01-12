import { MandalaView } from 'src/view/view';
import { handleFileLink } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/file-link/handle-file-link';
import { handleHeading } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/heading-link/handle-heading';
import { handleBlockLink } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/block-link/handle-block-link';
import { isMacLike } from 'src/view/actions/keyboard-shortcuts/helpers/keyboard-events/mod-key';

export const handleLinks = (view: MandalaView, e: MouseEvent) => {
    // eslint-disable-next-line no-undef
    if (!(e.target instanceof HTMLAnchorElement)) return;
    if (!e.target.hasClass('internal-link')) return;
    const link = e.target.dataset.href;
    const modKey = isMacLike ? e.metaKey : e.ctrlKey;
    if (!link) return;
    if (link.contains('#^')) {
        e.stopPropagation();
        handleBlockLink(view, link, modKey);
    } else if (link.contains('#')) {
        e.stopPropagation();
        handleHeading(view, link, modKey);
    } else {
        e.stopPropagation();
        handleFileLink(view, link, modKey);
    }
};
