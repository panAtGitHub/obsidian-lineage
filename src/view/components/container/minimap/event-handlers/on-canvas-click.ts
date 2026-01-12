import { findCardAtPosition } from 'src/view/components/container/minimap/event-handlers/helpers/find-card-at-position';
import {
    CANVAS_WIDTH_CPX,
    CANVAS_WIDTH_DPX,
    LINE_HEIGHT_CPX,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { MandalaView } from 'src/view/view';
import { focusContainer } from 'src/stores/view/subscriptions/effects/focus-container';

export const dpx_to_cpx = (px: number) =>
    px * (CANVAS_WIDTH_CPX / CANVAS_WIDTH_DPX);

/** c stands for canvas, d stands for dom **/
export const cpx_to_dpx = (px: number) =>
    px * (CANVAS_WIDTH_DPX / CANVAS_WIDTH_CPX);
export const LINE_HEIGHT_DPX = cpx_to_dpx(LINE_HEIGHT_CPX);

export const onCanvasClick = (e: MouseEvent, view: MandalaView) => {
    const minimapStore = view.getMinimapStore();
    const dom = view.getMinimapDom();
    const rect = dom.canvasContainer.getBoundingClientRect();

    const domY = e.clientY - rect.top;

    const minimapState = minimapStore.getValue();

    const y = dpx_to_cpx(domY);

    const ranges = minimapState.ranges.cards;
    const cardId = findCardAtPosition(y, ranges);
    if (cardId) {
        view.viewStore.dispatch({
            type: 'view/set-active-node/mouse',
            payload: {
                id: cardId,
            },
        });
        focusContainer(view);
    }
};
