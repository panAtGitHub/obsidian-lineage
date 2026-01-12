import { SettingsStore } from 'src/main';
import { Setting } from 'obsidian';
import { lang } from 'src/lang/lang';

export const MaintainEditMode = (
    element: HTMLElement,
    settingsStore: SettingsStore,
    label?: string,
) => {
    const settingsState = settingsStore.getValue();
    new Setting(element)
        .setName(label || lang.settings_general_maintain_edit_mode)
        .setDesc(lang.settings_general_maintain_edit_mode_desc)
        .addToggle((cb) => {
            cb.setValue(settingsState.view.maintainEditMode).onChange(
                (maintain) => {
                    settingsStore.dispatch({
                        type: 'settings/view/set-maintain-edit-mode',
                        payload: {
                            maintain,
                        },
                    });
                },
            );
        });
};
