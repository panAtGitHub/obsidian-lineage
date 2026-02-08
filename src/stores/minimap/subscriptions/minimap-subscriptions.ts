import { MandalaView } from 'src/view/view';
import { onMinimapMount } from 'src/stores/minimap/subscriptions/on-minimap-mount';
import { onMinimapStateUpdate } from 'src/stores/minimap/subscriptions/on-minimap-state-update';
import { minimapWorker } from 'src/workers/worker-instances';

export const minimapSubscriptions = (view: MandalaView) => {
    const localState: { previousScrollPosition: number } = {
        previousScrollPosition: 0,
    };
    const unsub = view.minimapStore!.subscribe(
        (viewState, action, initialRun) => {
            if (initialRun) {
                void onMinimapMount(view);
            } else if (action) {
                void onMinimapStateUpdate(view, action, viewState, localState);
            }
        },
    );

    return () => {
        unsub();
        void minimapWorker.run({
            type: 'worker/destroy',
            payload: { canvasId: view.minimapStore!.getValue().canvasId },
        });
        view.minimapStore = null;
    };
};
