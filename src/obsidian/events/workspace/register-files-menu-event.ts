import { TFile } from 'obsidian';
import MandalaGrid from 'src/main';
import { addImportGinkgoMenuItem } from 'src/obsidian/events/workspace/context-menu-itetms/add-import-ginkgo-menu-item';

export const registerFilesMenuEvent = (plugin: MandalaGrid) => {
    plugin.registerEvent(
        plugin.app.workspace.on('files-menu', (menu, abstractFile) => {
            const allFiles = abstractFile.every((af) => af instanceof TFile);
            if (allFiles)
                addImportGinkgoMenuItem(menu, plugin, abstractFile as TFile[]);
        }),
    );
};
