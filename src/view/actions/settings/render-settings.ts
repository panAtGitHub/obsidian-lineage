import { getView } from 'src/view/components/container/context';
import { FontSize } from 'src/view/actions/settings/components/font-size';
import { BackgroundColor } from 'src/view/actions/settings/components/background-color';
import { ActiveBranchBackground } from 'src/view/actions/settings/components/active-branch-background';
import { CardWidth } from 'src/view/actions/settings/components/card-width';
import { LimitCardHeight } from 'src/view/actions/settings/components/limit-card-height';
import { DefaultDocumentFormat } from 'src/view/actions/settings/components/default-document-format';
import { CardsGap } from 'src/view/actions/settings/components/cards-gap';
import { CardIndentationWidth } from 'src/view/actions/settings/components/card-indentation-width';
import { MaintainEditMode } from 'src/view/actions/settings/components/maintain-edit-mode';
import { InactiveCardOpacity } from 'src/view/actions/settings/components/inactive-card-opacity';
import { ActiveBranchColor } from 'src/view/actions/settings/components/active-branch-color';
import { AlwaysShowCardButtons } from 'src/view/actions/settings/components/always-show-card-buttons';
import { ControlsBarButtons } from 'src/view/actions/settings/components/controls-bar-buttons/controls-bar-buttons';
import { HeadingsFontSize } from 'src/view/actions/settings/components/headings-font-size';
import { LinkPaneType } from 'src/view/actions/settings/components/link-pane-type';

export type SettingsTab = 'General' | 'Appearance' | 'Layout';
export const renderSettings = (element: HTMLElement, tab: SettingsTab) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = (tab: SettingsTab) => {
        element.empty();
        if (tab === 'General') {
            DefaultDocumentFormat(element, settingsStore);
            LinkPaneType(element, settingsStore);
            MaintainEditMode(element, settingsStore);
            AlwaysShowCardButtons(element, settingsStore);
            ControlsBarButtons(element, view);
        } else if (tab === 'Appearance') {
            BackgroundColor(element, settingsStore);
            ActiveBranchBackground(element, settingsStore);
            ActiveBranchColor(element, settingsStore);
            InactiveCardOpacity(element, settingsStore);
            FontSize(element, settingsStore);
            HeadingsFontSize(element, settingsStore);
        } else if (tab === 'Layout') {
            CardWidth(element, settingsStore);
            CardsGap(element, settingsStore);
            CardIndentationWidth(element, settingsStore);
            LimitCardHeight(element, settingsStore);
        }
    };
    render(tab);
    return {
        update: (tab: SettingsTab) => {
            render(tab);
        },
    };
};
