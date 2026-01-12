import { MandalaView } from 'src/view/view';
import { HiddenVerticalToolbarButtons } from 'src/stores/settings/derived/view-settings-store';
import { derived } from 'svelte/store';
import { ToolbarButton } from 'src/view/modals/vertical-toolbar-buttons/vertical-toolbar-buttons';
import { lang } from 'src/lang/lang';
import {
    Keyboard,
    Palette,
    PanelRight,
    Settings,
    Eye,
} from 'lucide-svelte';
import { CustomIcon, customIcons } from 'src/helpers/load-custom-icons';
import { VerticalToolbarActions } from 'src/view/components/container/toolbar-vertical/vertical-toolbar-actions';

export type ToolbarButtonsGroup = {
    id: string;
    buttons: {
        label: string;
        onClick: (e: MouseEvent) => void;
        icon: typeof PanelRight | CustomIcon;
        id: ToolbarButton;
    }[];
};

export const VerticalToolbarButtonsList = (view: MandalaView) => {
    const hiddenControlsBarButtons = HiddenVerticalToolbarButtons(view.plugin);
    const h = new VerticalToolbarActions(view);

    return derived([hiddenControlsBarButtons], ([hiddenControlsBarButtons]) => {
        const set = new Set(hiddenControlsBarButtons);
        const buttons: ToolbarButtonsGroup[] = [
            {
                id: 'minimap',
                buttons: [
                    {
                        label: lang.controls_toggle_minimap,
                        onClick: h.toggleMinimap,
                        icon: PanelRight,
                        id: 'minimap',
                    },
                ],
            },
            {
                id: 'settings',
                buttons: [
                    {
                        label: lang.controls_settings,
                        onClick: h.toggleSettings,
                        icon: Settings,
                        id: 'settings',
                    },
                    {
                        label: lang.controls_hotkeys,
                        onClick: h.toggleHelp,
                        icon: Keyboard,
                        id: 'hotkeys',
                    },
                    {
                        label: lang.controls_rules,
                        onClick: h.toggleStyleRules,
                        icon: Palette,
                        id: 'style-rules',
                    },
                ],
            },
            {
                id: 'mandala',
                buttons: [
                    {
                        label: lang.controls_toggle_mandala_mode,
                        onClick: h.toggleMandalaMode,
                        icon: customIcons.cards,
                        id: 'mandala-mode',
                    },
                    {
                        label: '详情侧边栏',
                        onClick: () => {
                            view.plugin.settings.dispatch({
                                type: 'view/mandala-detail-sidebar/toggle',
                            });
                        },
                        icon: PanelRight,
                        id: 'mandala-detail-sidebar' as any,
                    },
                ],
            },
            {
                id: 'scroll',
                buttons: [
                    {
                        label: lang.controls_toggle_scrolling_mode_horizontal,
                        onClick: h.toggleScrollModeH,
                        icon: customIcons.alignH,
                        id: 'center-active-node-h',
                    },
                    {
                        label: lang.controls_toggle_scrolling_mode_vertical,
                        onClick: h.toggleScrollModeV,
                        icon: customIcons.alignV,
                        id: 'center-active-node-v',
                    },
                    {
                        label: lang.controls_single_column,
                        onClick: h.toggleOutlineMode,
                        icon: customIcons.outline,
                        id: 'outline-mode',
                    },
                    {
                        label: lang.controls_gap_between_cards,
                        onClick: h.toggleGap,
                        icon: customIcons.gap,
                        id: 'space-between-cards',
                    },
                    {
                        label: lang.controls_toggle_hidden_card_info,
                        onClick: h.toggleHiddenInfo,
                        icon: Eye,
                        id: 'hidden-card-info',
                    },
                ],
            },
        ];

        const viewType = view.getViewType();
        const isMandala = viewType === 'mandala-grid';

        return buttons
            .map((group) => {
                return {
                    id: group.id,
                    buttons: group.buttons.filter((b) => {
                        if (isMandala) {
                            if (
                                b.id === 'minimap' ||
                                b.id === 'outline-mode' ||
                                b.id === 'center-active-node-h' ||
                                b.id === 'center-active-node-v' ||
                                b.id === 'mandala-mode' ||
                                b.id === 'style-rules' ||
                                b.id === 'space-between-cards' ||
                                b.id === 'hidden-card-info'
                            )
                                return false;

                            if (
                                (b.id as string) === 'mandala-detail-sidebar'
                            ) {
                                // Only show detail sidebar in 3x3 mode
                                const mandalaMode =
                                    view.plugin.settings.getValue().view
                                        .mandalaMode;
                                if (mandalaMode !== '3x3') return false;
                            }
                        }
                        return !set.has(b.id);
                    }),
                };
            })
            .filter((g) => g.buttons.length > 0);
    });
};
