import { MandalaView } from 'src/view/view';
import { AllDirections } from 'src/stores/document/document-store-actions';
import { getElementById } from 'src/lib/align-element/helpers/get-element-by-id';

export const scrollNode = (view: MandalaView, direction: AllDirections) => {
    const container = view.container;
    if (!container) return;
    const element = getElementById(
        container,
        view.viewStore.getValue().document.activeNode,
    );
    if (!element) return;
    const STEP = Math.floor(view.plugin.settings.getValue().view.cardWidth / 4);
    if (direction === 'down' || direction === 'up') {
        const column = element.matchParent('.column') as HTMLElement;
        if (!column) return;
        const scrollTop = direction === 'up' ? STEP : -STEP;
        requestAnimationFrame(() => {
            column.scrollBy({
                top: scrollTop,
                behavior: 'smooth',
            });
        });
    } else {
        const scrollLeft = direction === 'left' ? STEP : -STEP;
        requestAnimationFrame(() => {
            container.scrollBy({
                left: scrollLeft,
                behavior: 'smooth',
            });
        });
    }
};
