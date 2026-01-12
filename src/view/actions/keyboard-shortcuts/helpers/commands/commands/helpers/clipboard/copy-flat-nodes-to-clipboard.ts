import { MandalaView } from 'src/view/view';
import { getTextOfFlatNodes } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/clipboard/get-text-of-flat-nodes';

export const copyFlatNodesToClipboard = async (
    view: MandalaView,
    nodes: string[],
    copyAsOutline = false,
) => {
    const text = getTextOfFlatNodes(view, nodes, copyAsOutline);
    await navigator.clipboard.writeText(text);
};
