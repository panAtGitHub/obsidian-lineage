import { LineageView } from 'src/view/view';
import { selectCard } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/helpers/select-card';

export const handleLocalBlockLink = (view: LineageView, id: string) => {
    const element = view.container!.querySelector(
        `[data-block-id="^${id}"`,
    ) as HTMLElement;
    if (element) {
        const card = element.closest('.lineage-card');
        if (card && card.id) {
            selectCard(view, card.id);
            return true;
        }
    }
};
