import { MandalaView } from 'src/view/view';

export const onCanvasWheel = (e: WheelEvent, view: MandalaView) => {
    e.preventDefault();
    view.getMinimapStore().dispatch({
        type: 'minimap/mouse-wheel-scroll',
        payload: {
            delta_y_dpx: e.deltaY,
        },
    });
};
