import { LineageView } from 'src/view/view';
import { getActiveNodes } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/get-active-nodes';
import { copyFlatNodesToClipboard } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/copy-flat-nodes-to-clipboard';

export const copyActiveNodesToClipboard = async (
    view: LineageView,
    isInSidebar: boolean,
) => {
    const nodes = getActiveNodes(view, isInSidebar);
    await copyFlatNodesToClipboard(view, nodes);
};
