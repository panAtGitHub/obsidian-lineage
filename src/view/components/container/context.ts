import { getContext } from 'svelte';

export const getPlugin = () => {
    return getContext('plugin');
};
export const getView = () => {
    return getContext('view');
};
