<script lang="ts">
    import { getView } from 'src/view/components/container/context';
    import { FileText, Palette, Printer, Square, Trash2, X } from 'lucide-svelte';
    import { Notice, Platform } from 'obsidian';
    import { createEventDispatcher } from 'svelte';
    import { toPng } from 'html-to-image';
    import { createClearEmptyMandalaSubgridsPlan } from 'src/lib/mandala/clear-empty-subgrids';
    import {
        MandalaA4DpiStore,
        MandalaA4ModeStore,
        MandalaA4OrientationStore,
        MandalaBorderOpacityStore,
        MandalaGrayBackgroundStore,
        MandalaSectionColorOpacityStore,
        MandalaShowSectionColorsStore,
    } from 'src/stores/settings/derived/view-settings-store';

    const dispatch = createEventDispatcher();
    const view = getView();

    export let show = false;
    let showA4Options = false;
    let showViewStyleOptions = false;

    const a4Mode = MandalaA4ModeStore(view);
    const a4Orientation = MandalaA4OrientationStore(view);
    const a4Dpi = MandalaA4DpiStore(view);
    const borderOpacity = MandalaBorderOpacityStore(view);
    const showSectionColors = MandalaShowSectionColorsStore(view);
    const sectionColorOpacity = MandalaSectionColorOpacityStore(view);
    const grayBackground = MandalaGrayBackgroundStore(view);

    const toggleSquareLayout = () => {
        view.plugin.settings.dispatch({
            type: 'settings/view/toggle-square-layout',
        });
        closeMenu();
    };

    const toggleWhiteTheme = () => {
        view.plugin.settings.dispatch({
            type: 'settings/view/toggle-white-theme',
        });
        closeMenu();
    };

    const toggleA4Mode = () => {
        view.plugin.settings.dispatch({
            type: 'settings/view/mandala/toggle-a4-mode',
        });
    };

    const updateA4Orientation = (event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLSelectElement)) return;
        const orientation =
            target.value === 'landscape' ? 'landscape' : 'portrait';
        view.plugin.settings.dispatch({
            type: 'settings/view/mandala/set-a4-orientation',
            payload: { orientation },
        });
    };

    const updateA4Dpi = (event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLSelectElement)) return;
        const dpi = Number(target.value);
        if (!Number.isFinite(dpi)) return;
        view.plugin.settings.dispatch({
            type: 'settings/view/mandala/set-a4-dpi',
            payload: { dpi },
        });
    };

    const updateBorderOpacity = (event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        view.plugin.settings.dispatch({
            type: 'settings/view/mandala/set-border-opacity',
            payload: { opacity: Number(target.value) },
        });
    };

    const updateSectionColorOpacity = (event: Event) => {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return;
        view.plugin.settings.dispatch({
            type: 'settings/view/mandala/set-section-color-opacity',
            payload: { opacity: Number(target.value) },
        });
    };

    type ElectronDialog = {
        dialog?: {
            showSaveDialog: (options: {
                title: string;
                defaultPath: string;
                filters: { name: string; extensions: string[] }[];
            }) => Promise<{ canceled: boolean; filePath?: string }>;
        };
        remote?: {
            dialog?: {
                showSaveDialog: (options: {
                    title: string;
                    defaultPath: string;
                    filters: { name: string; extensions: string[] }[];
                }) => Promise<{ canceled: boolean; filePath?: string }>;
            };
        };
    };

    type ElectronFs = {
        writeFile: (
            path: string,
            data: Uint8Array,
            cb: (err?: Error) => void,
        ) => void;
    };

    const exportToPNG = async (
        target: HTMLElement,
        options?: {
            width?: number;
            height?: number;
            pixelRatio?: number;
        },
    ) => {
        const loadingNotice = new Notice('正在导出 PNG...', 0);
        if (!target) {
            loadingNotice.hide();
            new Notice('未找到可导出的视图区域。');
            return;
        }

        const backgroundColor = getComputedStyle(
            document.documentElement,
        ).getPropertyValue('--background-primary');
        const safeBackground =
            backgroundColor && backgroundColor.trim().length > 0
                ? backgroundColor.trim()
                : '#ffffff';
        let dataUrl = '';
        try {
            dataUrl = await toPng(target, {
                pixelRatio: options?.pixelRatio ?? 2,
                backgroundColor: safeBackground,
                width: options?.width,
                height: options?.height,
            });
        } catch (error) {
            loadingNotice.hide();
            new Notice('导出失败，请稍后再试。');
            closeMenu();
            return;
        }

        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');
        const defaultName = `mandala-${timestamp}.png`;

        const electronRequire = (
            window as unknown as { require?: (module: string) => unknown }
        ).require;
        const electron = electronRequire?.('electron') as
            | ElectronDialog
            | undefined;
        const dialog = electron?.dialog ?? electron?.remote?.dialog;
        if (dialog) {
            const result = await dialog.showSaveDialog({
                title: '导出 PNG',
                defaultPath: defaultName,
                filters: [{ name: 'PNG', extensions: ['png'] }],
            });
            if (!result.canceled && result.filePath) {
                const fs = electronRequire?.('fs') as ElectronFs | undefined;
                if (!fs) {
                    loadingNotice.hide();
                    new Notice('导出失败，请稍后再试。');
                    closeMenu();
                    return;
                }
                const base64 = dataUrl.split(',')[1] ?? '';
                const binary = atob(base64);
                const bytes = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i += 1) {
                    bytes[i] = binary.charCodeAt(i);
                }
                fs?.writeFile(result.filePath, bytes, (err) => {
                    loadingNotice.hide();
                    if (err) {
                        new Notice('导出失败，请稍后再试。');
                    } else {
                        new Notice('PNG 导出完成。');
                    }
                });
                closeMenu();
                return;
            }
            loadingNotice.hide();
            closeMenu();
            return;
        }

        loadingNotice.hide();
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = defaultName;
        link.click();
        closeMenu();
    };

    const exportCurrentView = async () => {
        const target = view.contentEl.querySelector(
            '.mandala-content-wrapper',
        ) as HTMLElement | null;
        if (!target) {
            new Notice('未找到可导出的视图区域。');
            return;
        }
        await exportToPNG(target);
    };

    const clearEmptySubgrids = () => {
        const state = view.documentStore.getValue();
        if (!state.meta.isMandala) {
            new Notice('当前文档不是九宫格格式。');
            closeMenu();
            return;
        }

        view.viewStore.dispatch({ type: 'view/mandala/subgrid/exit' });
        const centerNodeId = state.sections.section_id['1'];
        if (!centerNodeId) {
            new Notice('未找到中心格子。');
            closeMenu();
            return;
        }

        view.viewStore.dispatch({
            type: 'view/set-active-node/document',
            payload: { id: centerNodeId },
        });
        view.viewStore.dispatch({
            type: 'view/selection/set-selection',
            payload: { ids: [centerNodeId] },
        });
        view.alignBranch.align({ type: 'view/align-branch/center-node' });

        const plan = createClearEmptyMandalaSubgridsPlan(state.document);
        if (plan.parentIds.length === 0) {
            new Notice('没有可清空的空白九宫格。');
            closeMenu();
            return;
        }

        view.documentStore.dispatch({
            type: 'document/mandala/clear-empty-subgrids',
            payload: { parentIds: plan.parentIds, activeNodeId: centerNodeId },
        });

        new Notice(
            `已清空 ${plan.parentIds.length} 个空白九宫格，删除 ${plan.nodesToRemove.length} 个子格。`,
        );
        closeMenu();
    };

    const closeMenu = () => {
        dispatch('close');
        showA4Options = false;
        showViewStyleOptions = false;
    };

    // 点击外部关闭菜单 - 使用全局点击事件
    const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.view-options-menu') && !target.closest('[aria-label="视图选项"]')) {
            closeMenu();
        }
    };

    $: if (show) {
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
</script>

{#if show && !Platform.isMobile}
    <div class="view-options-menu">
        <div class="view-options-menu__header">
            <span class="view-options-menu__title">视图选项</span>
            <button
                class="view-options-menu__close"
                on:click={closeMenu}
                aria-label="关闭"
            >
                <X class="icon" size={16} />
            </button>
        </div>
        
        <div class="view-options-menu__items">
            <button class="view-options-menu__item" on:click={toggleSquareLayout}>
                <div class="view-options-menu__icon">
                    <Square class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">正方形布局</div>
                    <div class="view-options-menu__desc">将格子规整为正方形</div>
                </div>
            </button>

            <button class="view-options-menu__item" on:click={toggleWhiteTheme}>
                <div class="view-options-menu__icon">
                    <Palette class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">纯白背景</div>
                    <div class="view-options-menu__desc">切换为纯白主题</div>
                </div>
            </button>

            <button
                class="view-options-menu__item"
                on:click={() => {
                    toggleA4Mode();
                    showA4Options = true;
                }}
            >
                <div class="view-options-menu__icon">
                    <FileText class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">A4 视图</div>
                    <div class="view-options-menu__desc">
                        切换为固定画布大小
                    </div>
                </div>
            </button>

            {#if showA4Options}
                <div class="view-options-menu__submenu">
                    <label class="view-options-menu__row">
                        <span>启用 A4 视图</span>
                        <input
                            type="checkbox"
                            checked={$a4Mode}
                            on:change={toggleA4Mode}
                        />
                    </label>
                    <label class="view-options-menu__row">
                        <span>方向</span>
                        <select
                            value={$a4Orientation}
                            on:change={updateA4Orientation}
                        >
                            <option value="portrait">竖向</option>
                            <option value="landscape">横向</option>
                        </select>
                    </label>
                    <label class="view-options-menu__row">
                        <span>DPI</span>
                        <select value={$a4Dpi} on:change={updateA4Dpi}>
                            <option value="96">96</option>
                            <option value="150">150</option>
                            <option value="300">300</option>
                        </select>
                    </label>
                </div>
            {/if}

            <button class="view-options-menu__item" on:click={exportCurrentView}>
                <div class="view-options-menu__icon">
                    <Printer class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">导出 PNG</div>
                    <div class="view-options-menu__desc">保存当前视图为 PNG</div>
                </div>
            </button>

            <button
                class="view-options-menu__item"
                on:click={() =>
                    (showViewStyleOptions = !showViewStyleOptions)}
            >
                <div class="view-options-menu__icon">
                    <Palette class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">视图样式</div>
                    <div class="view-options-menu__desc">
                        边框与背景显示
                    </div>
                </div>
            </button>

            {#if showViewStyleOptions}
                <div class="view-options-menu__submenu">
                    <label class="view-options-menu__row">
                        <span>边框透明度</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={$borderOpacity}
                            on:input={updateBorderOpacity}
                        />
                    </label>
                    <label class="view-options-menu__row">
                        <span>显示背景色</span>
                        <input
                            type="checkbox"
                            checked={$showSectionColors}
                            on:change={() =>
                                view.plugin.settings.dispatch({
                                    type: 'settings/view/mandala/toggle-section-colors',
                                })
                            }
                        />
                    </label>
                    <label class="view-options-menu__row">
                        <span>背景透明度</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={$sectionColorOpacity}
                            on:input={updateSectionColorOpacity}
                        />
                    </label>
                    <label class="view-options-menu__row">
                        <span>灰白相间背景</span>
                        <input
                            type="checkbox"
                            checked={$grayBackground}
                            on:change={() =>
                                view.plugin.settings.dispatch({
                                    type: 'settings/view/mandala/toggle-gray-background',
                                })
                            }
                        />
                    </label>
                </div>
            {/if}

            <button class="view-options-menu__item" on:click={clearEmptySubgrids}>
                <div class="view-options-menu__icon">
                    <Trash2 class="view-options-menu__icon-svg" size={18} />
                </div>
                <div class="view-options-menu__content">
                    <div class="view-options-menu__label">清空空白九宫格</div>
                    <div class="view-options-menu__desc">
                        删除空白子主题分支，保留中心格
                    </div>
                </div>
            </button>
        </div>
    </div>
{/if}

<style>
    .view-options-menu {
        position: absolute;
        top: 48px;
        right: 8px;
        min-width: 260px;
        background: var(--background-primary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        overflow: hidden;
        z-index: 1000;
        /* 使用轻量级阴影提升可视性 */
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
    }

    .view-options-menu__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        border-bottom: 1px solid var(--background-modifier-border);
        background: var(--background-secondary);
    }

    .view-options-menu__title {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-normal);
    }

    .view-options-menu__close {
        background: transparent;
        border: none;
        padding: 4px;
        cursor: pointer;
        color: var(--text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
    }

    .view-options-menu__close:hover {
        background: var(--background-modifier-hover);
        color: var(--text-normal);
    }

    .view-options-menu__items {
        padding: 6px;
    }

    .view-options-menu__submenu {
        margin: 6px;
        padding: 8px;
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        background: var(--background-secondary);
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .view-options-menu__subitem {
        background: var(--background-primary);
        border: 1px solid var(--background-modifier-border);
        border-radius: 6px;
        padding: 6px 8px;
        cursor: pointer;
        text-align: left;
    }

    .view-options-menu__subsection {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .view-options-menu__subsection-title {
        font-size: 12px;
        color: var(--text-muted);
        margin-bottom: 2px;
    }

    .view-options-menu__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        font-size: 12px;
        color: var(--text-normal);
    }

    .view-options-menu__row select,
    .view-options-menu__row input[type='range'] {
        flex: 1 1 auto;
    }

    .view-options-menu__item {
        width: 100%;
        display: flex !important;
        align-items: flex-start;
        gap: 12px;
        padding: 10px 12px;
        min-height: 44px;
        height: auto !important;
        border: none !important;
        background: transparent !important;
        cursor: pointer;
        border-radius: 4px;
        text-align: left;
        box-sizing: border-box;
        overflow: hidden;
    }

    .view-options-menu__item:hover {
        background: var(--background-modifier-hover);
    }

    .view-options-menu__item:active {
        background: var(--background-modifier-active-hover);
    }

    .view-options-menu__item + .view-options-menu__item {
        margin-top: 4px;
    }

    .view-options-menu__icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .view-options-menu__icon-svg {
        color: var(--text-accent);
    }

    .view-options-menu__content {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .view-options-menu__label {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-normal);
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .view-options-menu__desc {
        font-size: 12px;
        color: var(--text-muted);
        line-height: 1.2;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
