<script lang="ts">
    import { FileText, Globe } from 'lucide-svelte';
    import ClickableIcon from './components/clickable-icon.svelte';
    import { lang } from 'src/lang/lang';
    import { ActiveStyleRulesTab } from 'src/stores/settings/derived/style-rules';
    import { getView } from 'src/view/components/container/context';
    import { RulesTab } from 'src/stores/settings/settings-type';

    const view = getView();
    const activeTab = ActiveStyleRulesTab(view);

    const setActiveTab = (tab: RulesTab) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/set-active-tab',
            payload: { tab },
        });
    }
</script>

<div class="style-rules-tabs-header">
    <div class="tab-header-buttons">
        <ClickableIcon
            isActive={$activeTab === 'global-rules'}
            label={lang.modals_rules_tab_global_rules}
            onClick={() => setActiveTab('global-rules')}
        >
            <Globe class="svg-icon" />
        </ClickableIcon>
        <ClickableIcon
            isActive={$activeTab === 'document-rules'}
            label={lang.modals_rules_tab_document_rules}
            onClick={() => setActiveTab('document-rules')}
        >
            <FileText class="svg-icon" />
        </ClickableIcon>
    </div>
</div>

<style>
    .style-rules-tabs-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;

        width: 100%;
        align-self: center;
        justify-self: center;
        box-sizing: border-box;
        height: auto;
        padding-top: 10px;
    }

    .tab-header-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
</style>
