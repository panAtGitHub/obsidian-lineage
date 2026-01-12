import { TFile } from 'obsidian';
import MandalaGrid from 'src/main';

export const openFile = async (
    plugin: MandalaGrid,
    file: TFile,
    newLeaf: 'split' | 'tab',
) => {
    const leaf = plugin.app.workspace.getLeaf(newLeaf);
    await leaf.openFile(file);
    return leaf;
};
