import { LineageView } from 'src/view/view';
import { copyFlatNodesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-flat-nodes-to-clipboard';

export const copyFlatSearchResultsToClipboard = async (view: LineageView) => {
    const results = Array.from(view.viewStore.getValue().search.results.keys());

    await copyFlatNodesToClipboard(view, results, true);
};
