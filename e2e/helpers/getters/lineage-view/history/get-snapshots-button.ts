import invariant from 'tiny-invariant';
import { getActiveView } from '../card/get-active-view';
import { SEL_CONTROLS_BAR } from './get-redo-change-button';

export const getSnapshotsButton = async () => {
    const view = await getActiveView();
    const button = await view.$(
        `${SEL_CONTROLS_BAR} button[aria-label="History"]`,
    );
    invariant(button);
    return button;
};
