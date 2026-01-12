import { MandalaView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyCardsGap = (view: MandalaView, value: number) => {
    if (typeof value !== 'number') return;
    view.containerEl.style.setProperty(cssVariables.nodeGap, `${value}px`);
};
