import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { Notice, TFile } from 'obsidian';
import MandalaGrid from 'src/main';
import { onPluginError } from 'src/lib/store/on-plugin-error';
import { mapFilesToGingkoFiles } from 'src/obsidian/events/workspace/effects/import-from-gingko/helpers/map-files-to-gingko-files';
import { createMandalaGridDocumentsFromGingkoFiles } from 'src/obsidian/events/workspace/effects/import-from-gingko/helpers/create-mandala-documents-from-gingko-files';

export type GingkoFile = {
    basename: string;
    tree: TreeNode[];
};

export const importFromGingko = async (plugin: MandalaGrid, files: TFile[]) => {
    try {
        const parentFolder = files[0].parent?.path;
        if (!parentFolder) return;
        const gingkoFiles = await mapFilesToGingkoFiles(plugin, files);
        await createMandalaGridDocumentsFromGingkoFiles(
            plugin,
            gingkoFiles,
            parentFolder,
        );
        new Notice(
            `Imported ${gingkoFiles.length} Gingko file${gingkoFiles.length === 1 ? '' : 's'}`,
        );
    } catch (e) {
        onPluginError(e, 'command', { files });
    }
};
