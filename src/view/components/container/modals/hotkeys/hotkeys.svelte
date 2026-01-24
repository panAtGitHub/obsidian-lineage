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
        view.viewStore.dispatch({ type: 'view/settings/toggle-help-modal' });
    };

    const isMobile = Platform.isMobile;
</script>

<div 
    class="mandala-modal mandala-modal--full-height"
    class:is-mobile={isMobile}
    on:mousedown|stopPropagation
    on:touchstart|stopPropagation
>
    {#if isMobile}
        <div class="mobile-modal-header">
            <div class="mobile-modal-title">快捷键</div>
            <button class="mobile-done-button" on:click={closeHotkeys}>
                <Check size={18} />
                <span>完成</span>
            </button>
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
    .mobile-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: calc(env(safe-area-inset-top, 20px) + var(--size-4-2));
        padding-bottom: var(--size-4-4);
        padding-left: var(--size-4-6);
        padding-right: var(--size-4-6);
        border-bottom: 1px solid var(--background-modifier-border);
        background: var(--background-primary);
        position: sticky;
        top: 0;
        z-index: 10;
        width: 100%;
    }

    .mobile-modal-title {
        font-weight: var(--font-bold);
        color: var(--text-normal);
    }

    .mobile-done-button {
        display: flex;
        align-items: center;
        gap: 4px;
        background: var(--interactive-accent);
        color: white;
        border: none;
        border-radius: var(--radius-m);
        padding: 6px 14px;
        font-weight: var(--font-semibold);
        cursor: pointer;
        transition: opacity 0.2s;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);

        &:hover {
            opacity: 0.9;
        }
    }

    .groups {
        width: 500px;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        overflow-y: auto;
        flex: 1;
    }
    @media (max-width: 720px) {
        .groups {
            width: 100%;
            padding: var(--size-4-4) var(--size-4-6);
        }
    }
</style>
