import { getContext } from 'svelte';

export const getModalState = () => {
    return getContext('modal-state');
};
