import { LineageView } from 'src/view/view';
import { selectCard } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/helpers/select-card';

export const handleLocalHeadingLink = (view: LineageView, link: string) => {
    const match = /(#.+)$/.exec(link);
    if (!match) return;
    const headingPart = match[1];
    for (let level = 1; level <= 6; level++) {
        const headings = Array.from(
            view.containerEl.querySelectorAll('h' + level),
        ) as HTMLHeadingElement[];
        const heading = headings.find(
            (h) => '#' + h.dataset.heading === headingPart,
        );
        if (heading) {
            const card = heading.closest('.lineage-card');
            if (card && card.id) {
                selectCard(view, card.id);
                break;
            }
        }
    }
};
