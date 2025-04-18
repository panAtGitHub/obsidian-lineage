<script lang="ts">
    import { SettingsTab } from '../../../../actions/settings/render-settings';

    export let setActiveTab : (tab: SettingsTab)=>void
    export let activeTab: SettingsTab
    const tabs: SettingsTab[] = ['General', 'Appearance', 'Layout']

</script>

<div class="lineage-vertical-tab-header">
    <div class="vertical-tab-header-group">
<!--        <div class="vertical-tab-header-group-title">Options</div>-->
        <div class="vertical-tab-header-group-items">
            {#each tabs as tab}
                <div
                    class={'vertical-tab-nav-item' +
                        (tab === activeTab ? ' is-active' : '')}
                    on:click={() => setActiveTab(tab)}
                >
                    {tab}
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .lineage-vertical-tab-header {
        width: 250px;
        padding: var(--size-4-3);
        background-color: var(--background-secondary);
    }
</style>
