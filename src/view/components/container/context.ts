import { getContext } from 'svelte';
import { MandalaView } from 'src/view/view';
import MandalaGrid from 'src/main';

export const getPlugin = () => {
    return getContext('plugin') as MandalaGrid;
};
export const getView = () => {
    return getContext('view') as MandalaView;
};
