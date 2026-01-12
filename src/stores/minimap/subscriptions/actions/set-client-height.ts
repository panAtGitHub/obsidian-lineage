import { MandalaView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { delay } from 'src/helpers/delay';

const getActiveView = async (view: MandalaView) => {
    for (let i = 0; i < 10; i++) {
        const activeView =
            view.plugin.app.workspace.getActiveViewOfType(MandalaView);
        if (activeView) {
            return activeView;
        } else {
            await delay(500);
        }
    }
};

export const setClientHeight = async (view: MandalaView) => {
    /* dom height of inactive views is 0*/
    const activeView = await getActiveView(view);
    if (!activeView) return;
    const minimapContainer =
        activeView.getMinimapDom().scrollIndicator.parentElement;
    invariant(minimapContainer);

    const containerHeight = minimapContainer.clientHeight;
    view.getMinimapStore().dispatch({
        type: 'minimap/set-container-height',
        payload: { height_cpx: dpx_to_cpx(containerHeight) },
    });
};
