import { MandalaView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

const PADDING_H = 8 * 4 + 34 * 2;
const PADDING_V = 8 * 2;
export const applyViewSize = (view: MandalaView) => {
    const viewElement = view.contentEl.querySelector(
        '.mandala-main',
    ) as HTMLElement | null;
    if (!viewElement) return;
    const rect = viewElement.getBoundingClientRect();
    view.containerEl.style.setProperty(
        cssVariables.viewWidth,
        `${rect.width - PADDING_H}px`,
    );
    view.containerEl.style.setProperty(
        cssVariables.viewHeight,
        `${rect.height - PADDING_V}px`,
    );
};
