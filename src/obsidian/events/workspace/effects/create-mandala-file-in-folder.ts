import MandalaGrid from 'src/main';
import { TFolder } from 'obsidian';
import { createNewFile } from 'src/obsidian/events/workspace/effects/create-new-file';
import { openFileInMandalaGrid } from 'src/obsidian/events/workspace/effects/open-file-in-mandala';

export const createMandalaGridFileInFolder = async (
    plugin: MandalaGrid,
    folder: TFolder,
) => {
    const newFile = await createNewFile(plugin, folder);
    if (newFile) {
        const format = plugin.settings.getValue().general.defaultDocumentFormat;
        await openFileInMandalaGrid(plugin, newFile, format, 'tab');
    }
};
