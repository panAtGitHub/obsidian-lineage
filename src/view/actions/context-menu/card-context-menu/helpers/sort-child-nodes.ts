import { MandalaView } from 'src/view/view';

export const sortChildNodes = (
    view: MandalaView,
    activeNode: string,
    order: 'ascending' | 'descending',
) => {
    view.documentStore.dispatch({
        type: 'document/sort-direct-child-nodes',
        payload: {
            id: activeNode,
            order,
        },
    });
};
