import {
    ComparisonOperator,
    ConditionNode,
    StyleRuleCondition,
    StyleRuleTarget,
} from 'src/stores/settings/types/style-rules-types';
import { MandalaView } from 'src/view/view';

export const ruleEditorEventHandlers = (view: MandalaView, ruleId: string) => {
    const documentPath = () => view.file?.path ?? '';

    const updateCondition = (updates: Partial<StyleRuleCondition>) => {
        view.plugin.settings.dispatch({
            type: 'settings/style-rules/update-condition',
            payload: {
                documentPath: documentPath(),
                ruleId: ruleId,
                updates,
            },
        });
    };

    const handleScopeChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ scope: target.value as StyleRuleTarget });
    };

    const handlePropertyChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({
            property: target.value as ConditionNode['property'],
        });
    };

    const handleOperatorChange = (e: Event) => {
        const target = e.target as HTMLSelectElement;
        updateCondition({ operator: target.value as ComparisonOperator });
    };

    const handleValueChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ value: target.value });
    };
    const handleValueBChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        updateCondition({ valueB: parseFloat(target.value) });
    };

    return {
        handleScopeChange,
        handlePropertyChange,
        handleOperatorChange,
        handleValueChange,
        handleValueBChange,
    };
};
