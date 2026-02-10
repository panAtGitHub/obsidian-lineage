import { getContext } from 'svelte';

export const getModalProps = () => {
    return getContext('modal-props');
};
