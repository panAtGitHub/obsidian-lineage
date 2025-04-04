import { LineageView } from 'src/view/view';

export const onCanvasWheel = (e: WheelEvent, view: LineageView) => {
    e.preventDefault();
    view.getMinimapStore().dispatch({
        type: 'minimap/mouse-wheel-scroll',
        payload: {
            delta_y_dpx: e.deltaY,
        },
    });
};
