import { LineageView } from 'src/view/view';
import { delay } from 'src/helpers/delay';

export const selectCard = async (view: LineageView, id: string) => {
    await delay(16);
    view.viewStore.dispatch({
        type: 'view/set-active-node/mouse',
        payload: {
            id: id,
        },
    });
};
