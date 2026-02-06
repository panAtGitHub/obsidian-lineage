<script lang="ts">
    import Group from './group.svelte';
    import Front from './front.svelte';
    import NumberOfConflicts from './status-bar.svelte';
    import { FilteredHotkeysStore } from '../../../../../stores/settings/derived/view-hotkeys-store';
    import { getView } from '../../context';
    import {
        DynamicLabelState
    } from 'src/view/components/container/modals/hotkeys/components/helpers/get-dynamic-label';
    import { OutlineModeStore } from '../../../../../stores/settings/derived/view-settings-store';

    import { X, Check } from 'lucide-svelte';
    import { Platform } from 'obsidian';

    const view = getView();
    const store = FilteredHotkeysStore(view);
    const outlineMode = OutlineModeStore(view);
    let labelState: DynamicLabelState;
    $: {
        labelState = {
            outlineMode: $outlineMode,
        };
    }

    const closeHotkeys = () => {
        view.viewStore.dispatch({ type: 'view/hotkeys/toggle-modal' });
    };

    const isMobile = Platform.isMobile;
</script>

<div 
    class="mandala-modal mandala-modal--full-height hotkeys-modal"
    class:is-mobile={isMobile}
    on:mousedown|stopPropagation
    on:touchstart|stopPropagation
>
    {#if isMobile}
        <div class="mobile-modal-header">
            <div class="mobile-sheet-handle" aria-hidden="true" />
            <div class="mobile-header-row">
                <div class="mobile-modal-title">快捷键</div>
                <button class="mobile-done-button" on:click={closeHotkeys}>
                    <Check size={18} />
                    <span>完成</span>
                </button>
            </div>
        </div>
    {:else}
        <button class="modal-close-button" on:click={closeHotkeys} aria-label="关闭快捷键">
            <X size={18} />
        </button>
    {/if}
    <Front />
    <div class="groups">
        {#each Object.entries($store.hotkeys) as [groupName, group] (groupName)}
            <Group {groupName} {group} {labelState} />
        {/each}
    </div>
    <NumberOfConflicts conflicts={$store.numberOfConflictingHotkeys}/>
</div>

<style>
    :global(.is-mobile) .hotkeys-modal {
        left: 12px;
        right: 12px;
        top: calc(env(safe-area-inset-top, 0px) + 12px);
        bottom: calc(env(safe-area-inset-bottom, 0px) + 12px);
        width: auto;
        height: auto;
        max-width: none;
        max-height: none;
        padding: 0;
        border-radius: 20px;
        border: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.22),
            0 4px 12px rgba(0, 0, 0, 0.12);
        overflow: hidden;
        backdrop-filter: blur(20px) saturate(180%);
        -webkit-backdrop-filter: blur(20px) saturate(180%);
    }

    .mobile-sheet-handle {
        width: 36px;
        height: 4px;
        border-radius: 999px;
        background: var(--background-modifier-border);
        margin: 6px auto 8px;
    }

    .mobile-modal-header {
        display: flex;
        flex-direction: column;
        padding-top: calc(env(safe-area-inset-top, 12px) + 6px);
        padding-bottom: 10px;
        padding-left: 12px;
        padding-right: 12px;
        border-bottom: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
        position: sticky;
        top: 0;
        z-index: 10;
        width: 100%;
    }

    .mobile-header-row {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        min-height: 28px;
    }

    .mobile-modal-title {
        font-weight: 600;
        color: var(--text-normal);
    }

    .mobile-done-button {
        display: flex;
        align-items: center;
        gap: 4px;
        background: transparent;
        color: var(--interactive-accent);
        border: none;
        border-radius: 999px;
        padding: 6px 10px;
        font-weight: var(--font-semibold);
        cursor: pointer;
        transition: opacity 0.2s;
        position: absolute;
        right: 0;

        &:hover {
            opacity: 0.9;
        }
    }

    :global(.is-mobile) .hotkeys-modal .front {
        padding: 6px 12px 0;
    }

    :global(.is-mobile) .hotkeys-modal .groups {
        padding: 12px;
        gap: 12px;
    }

    :global(.is-mobile) .hotkeys-modal .hotkey-group {
        background: var(--background-secondary);
        border-radius: 14px;
        padding: 12px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
    }

    :global(.is-mobile) .hotkeys-modal .hotkey-group-name {
        font-size: 13px;
        font-weight: 600;
        color: var(--text-muted);
        padding-bottom: 8px;
    }

    :global(.is-mobile) .hotkeys-modal .command {
        background: var(--background-primary);
        border-radius: 10px;
        padding: 10px 12px;
    }

    :global(.is-mobile) .hotkeys-modal .hotkey {
        padding: 4px 6px;
        border-radius: 8px;
    }

    :global(.is-mobile) .hotkeys-modal kbd {
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 6px;
    }

    .groups {
        width: 500px;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        overflow-y: auto;
        flex: 1;
    }

    .hotkeys-modal:not(.is-mobile) :global(.front) {
        padding: var(--size-4-2) var(--size-4-6) 0;
    }

    .hotkeys-modal:not(.is-mobile) :global(.front .search-input-container) {
        padding-right: 40px;
    }

    @media (max-width: 720px) {
        .groups {
            width: 100%;
            padding: var(--size-4-4) var(--size-4-6);
        }
    }
</style>
