import { LineageView } from 'src/view/view';
import { handleGlobalBlockLink } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/block-link/handle-global-block-link';
import { handleLocalHeadingLink } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/heading-link/handle-local-heading-link';

export const handleHeading = (
    view: LineageView,
    link: string,
    modKey: boolean,
) => {
    const file = link.split('#')[0];
    if (file && file !== view.file!.basename) {
        handleGlobalBlockLink(view, link, modKey);
    } else {
        handleLocalHeadingLink(view, link);
    }
};
