import { MandalaView } from 'src/view/view';
import { selectCard } from 'src/view/components/container/column/components/group/components/card/components/content/event-handlers/handle-links/helpers/select-card';

export const handleLocalHeadingLink = (view: MandalaView, link: string) => {
    const match = /#+(.*)$/.exec(link);
    if (!match) return;
    const headingText = match[1].trimStart();
    for (let level = 1; level <= 6; level++) {
        const headings = Array.from(
            view.containerEl.querySelectorAll('h' + level),
        ) as HTMLHeadingElement[];
        const heading = headings.find((h) => h.dataset.heading === headingText);
        if (heading) {
            const card = heading.closest('.mandala-card');
            if (card && card.id) {
                selectCard(view, card.id);
                break;
            }
        }
    }
};
