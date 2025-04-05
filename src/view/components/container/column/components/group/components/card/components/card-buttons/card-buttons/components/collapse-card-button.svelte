<script lang="ts">
    import { getView } from '../../../../../../../../../context';
    import FloatingButton from '../../shared/floating-button.svelte';
    import { Minus, Plus } from 'lucide-svelte';
    import { lang } from '../../../../../../../../../../../../lang/lang';

    export let nodeId: string;
    export let collapsed: boolean;
    const view = getView();
    const toggleCollapse = () => {
        view.viewStore.dispatch({
            type: 'view/outline/toggle-collapse-node',
            payload: {
                id: nodeId,
            },
        });
    };
</script>

<FloatingButton
    label={collapsed? lang.card_btn_expand_node: lang.card_btn_collapse_node}
    on:click={toggleCollapse}
    position="collapse"
>
    {#if collapsed}
        <Plus class="svg-icon" />
    {:else}
        <Minus class="svg-icon" />
    {/if}
</FloatingButton>
