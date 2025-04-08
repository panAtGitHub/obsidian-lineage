import invariant from 'tiny-invariant';
import { getActiveView } from '../../../getters/lineage-view/card/get-active-view';

const SELECTOR = `div[aria-label="${'Show all sections'}"]`;

export const toggleShowAllSearchResults = async () => {
    const view = await getActiveView();
    const button = await view.$(SELECTOR);
    invariant(button);
    await button.click();
};
