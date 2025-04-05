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
import { Setting } from 'obsidian';
import { lang } from 'src/lang/lang';
import { InactiveCardOpacity } from 'src/view/actions/settings/components/inactive-card-opacity';
import { ActiveBranchColor } from 'src/view/actions/settings/components/active-branch-color';
import { AlwaysShowCardButtons } from 'src/view/actions/settings/components/always-show-card-buttons';
import { ControlsBarButtons } from 'src/view/actions/settings/components/controls-bar-buttons/controls-bar-buttons';
import { HeadingsFontSize } from 'src/view/actions/settings/components/headings-font-size';
import { LinkPaneType } from 'src/view/actions/settings/components/link-pane-type';

export const renderSettings = (element: HTMLElement) => {
    const view = getView();
    const settingsStore = view.plugin.settings;
    const render = () => {
        DefaultDocumentFormat(element, settingsStore);
        LinkPaneType(element, settingsStore);
        MaintainEditMode(element, settingsStore);
        AlwaysShowCardButtons(element, settingsStore);
        ControlsBarButtons(element, view);
        new Setting(element).setHeading().setName(lang.settings_appearance);
        BackgroundColor(element, settingsStore);
        ActiveBranchBackground(element, settingsStore);
        ActiveBranchColor(element, settingsStore);
        InactiveCardOpacity(element, settingsStore);
        FontSize(element, settingsStore);
        HeadingsFontSize(element, settingsStore);
        new Setting(element).setHeading().setName(lang.settings_layout);
        CardWidth(element, settingsStore);
        CardsGap(element, settingsStore);
        CardIndentationWidth(element, settingsStore);
        LimitCardHeight(element, settingsStore);
    };
    render();
    return {
        update: () => {
            render();
        },
    };
};
