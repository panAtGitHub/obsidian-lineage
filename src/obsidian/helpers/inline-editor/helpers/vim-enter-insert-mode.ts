import { MarkdownView } from 'obsidian';
import MandalaGrid from 'src/main';
import { logger } from 'src/helpers/logger';

export const vimEnterInsertMode = (plugin: MandalaGrid, view: MarkdownView) => {
    // @ts-ignore
    const config = plugin.app.vault.config;
    if (config?.vimMode) {
        try {
            // @ts-ignore
            activeWindow.CodeMirrorAdapter?.Vim.enterInsertMode(
                // @ts-ignore
                view.editMode?.editor?.cm?.cm,
            );
        } catch {
            logger.warn('could not enter insert mode');
        }
    }
};
