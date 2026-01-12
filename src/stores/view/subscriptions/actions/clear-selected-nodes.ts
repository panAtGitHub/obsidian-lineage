import { MandalaView } from 'src/view/view';

export const clearSelectedNodes = (view: MandalaView) => {
    view.viewStore.dispatch({ type: 'view/selection/clear-selection' });
};
