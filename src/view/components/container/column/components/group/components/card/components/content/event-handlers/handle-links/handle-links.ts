import { LineageView } from 'src/view/view';
import { openFileInNewSplit } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/file-link/open-file-in-new-split';
import { handleHeading } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/heading-link/handle-heading';
import { handleBlockLink } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/block-link/handle-block-link';

export const handleLinks = (view: LineageView, e: MouseEvent) => {
    // eslint-disable-next-line no-undef
    if (!(e.target instanceof HTMLAnchorElement)) return;
    if (!e.target.hasClass('internal-link')) return;
    const link = e.target.dataset.href;
    if (!link) return;
    if (link.contains('#^')) {
        e.stopPropagation();
        handleBlockLink(view, link);
    } else if (link.contains('#')) {
        e.stopPropagation();
        handleHeading(view, link);
    } else {
        e.stopPropagation();
        openFileInNewSplit(view, link);
    }
};
