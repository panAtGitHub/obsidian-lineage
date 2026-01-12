import { MandalaView } from 'src/view/view';
import { dpx_to_cpx } from 'src/view/components/container/minimap/event-handlers/on-canvas-click';
import { minimapWorker } from 'src/workers/worker-instances';
import { minimapTheme } from './minimap-canvas/worker/consts/minimap-theme';

export const initializeMinimapWorker = async (view: MandalaView) => {
    const canvasContainer = view.getMinimapDom().canvasContainer.parentElement!;
    const canvas_height_cpx = dpx_to_cpx(
        canvasContainer.getBoundingClientRect().height,
    );

    await minimapWorker.run(
        {
            type: 'worker/initialize',
            payload: {
                canvas: view.getMinimapDom().offscreen,
                canvasId: view.getMinimapStore().getValue().canvasId,
                theme: minimapTheme.current,
                canvas_height_cpx,
            },
        },
        view.getMinimapDom().offscreen,
    );
};
