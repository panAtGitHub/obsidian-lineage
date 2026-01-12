import { MandalaView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';
import invariant from 'tiny-invariant';

/* to compensate for the transparent left border that is applied to :not(active-node)*/
const BORDER_WIDTH = 5;

export const applyCardWidth = (view: MandalaView, width: number) => {
    invariant(width);
    view.containerEl.style.setProperty(
        cssVariables.cardWidth,
        `${width - BORDER_WIDTH}px`,
    );
};
