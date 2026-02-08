import { Menu, TFile } from 'obsidian';
import MandalaGrid from 'src/main';
import { lang } from 'src/lang/lang';
import { customIcons } from 'src/helpers/load-custom-icons';
import { importFromGingko } from 'src/obsidian/events/workspace/effects/import-from-gingko/import-from-gingko';

export const addImportGinkgoMenuItem = (
    menu: Menu,
    plugin: MandalaGrid,
    files: TFile[],
) => {
    const allJson = files.every((file) => file.extension === 'json');
    if (!allJson) return;
    menu.addItem((item) => {
        item.setTitle(lang.ocm_import_from_gingko);
        item.setIcon(customIcons.cards.name);

        item.onClick(() => {
            void importFromGingko(plugin, files);
        });
    });
};
