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

    const view = getView();
    const store = FilteredHotkeysStore(view);
    const outlineMode = OutlineModeStore(view);
    let labelState: DynamicLabelState;
    $: {
        labelState = {
            outlineMode: $outlineMode,
        };
    }
</script>

<div class="mandala-modal mandala-modal--full-height">
    <Front />
    <div class="groups">
        {#each Object.entries($store.hotkeys) as [groupName, group] (groupName)}
            <Group {groupName} {group} {labelState} />
        {/each}
    </div>
    <NumberOfConflicts conflicts={$store.numberOfConflictingHotkeys}/>
</div>

<style>
    .groups {
        width:500px;
        display: flex;
        flex-direction: column;
        gap: var(--size-4-2);
        overflow-y: auto;
        flex:1
    }
    @media (max-width: 720px) {
        .groups {
            width: fit-content;
        }
    }
</style>
