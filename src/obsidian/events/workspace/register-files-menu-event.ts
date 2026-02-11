import { TAbstractFile, TFile } from 'obsidian';
import MandalaGrid from 'src/main';
import { addImportGinkgoMenuItem } from 'src/obsidian/events/workspace/context-menu-itetms/add-import-ginkgo-menu-item';

const isTFileArray = (
    files: TAbstractFile[],
): files is TFile[] => files.every((af) => af instanceof TFile);

export const registerFilesMenuEvent = (plugin: MandalaGrid) => {
    plugin.registerEvent(
        plugin.app.workspace.on('files-menu', (menu, abstractFile) => {
            if (isTFileArray(abstractFile)) {
                addImportGinkgoMenuItem(menu, plugin, abstractFile);
            }
        }),
    );
};
