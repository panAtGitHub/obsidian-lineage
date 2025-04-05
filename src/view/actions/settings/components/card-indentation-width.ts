import { SettingsStore } from 'src/main';
import { DEFAULT_INDENTATION_WIDTH } from 'src/stores/settings/default-settings';
import { lang } from 'src/lang/lang';
import { RangeSetting } from 'src/view/actions/settings/components/shared/range-setting';

export const CardIndentationWidth = (
    element: HTMLElement,
    settingsStore: SettingsStore,
) => {
    RangeSetting(element, settingsStore, {
        defaultValue: DEFAULT_INDENTATION_WIDTH,
        onChange: (value) => {
            settingsStore.dispatch({
                type: 'settings/view/set-node-indentation-width',
                payload: {
                    width: value,
                },
            });
        },
        valueSelector: (settingsState) =>
            settingsState.view.nodeIndentationWidth,
        label: lang.settings_layout_indentation_width,
        max: 1000,
        min: 0,
        step: 5,
    });
};
