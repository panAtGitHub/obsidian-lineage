import MandalaGrid from 'src/main';
import { TFile, TFolder } from 'obsidian';
import invariant from 'tiny-invariant';
import { getUniqueFileName } from 'src/obsidian/events/workspace/effects/get-unique-file-name';

export const createNewFile = async (
    plugin: MandalaGrid,
    folder: TFolder,
    data = '',
    basename = 'Untitled',
) => {
    invariant(folder);
    const children = folder.children
        .map((c) =>
            c instanceof TFile && c.extension === 'md' ? c.basename : null,
        )
        .filter((f) => f) as string[];
    const path = getUniqueFileName(folder.path, children, basename);
    const newFilePath = path + '.md';

    const file = await plugin.app.vault.create(newFilePath, data);
    invariant(file);
    return file;
};
