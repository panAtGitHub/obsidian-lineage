import { StyleRule } from 'src/stores/settings/types/style-rules-types';

export const fixConditionTypes = (rule: StyleRule) => {
    if (rule.condition.type === 'condition') {
        const cnd = rule.condition;
        const isStringCondition =
            cnd.property === 'headings' || cnd.property === 'content';
        if (isStringCondition) {
            if (cnd.value === null || cnd.value === undefined) {
                cnd.value = '';
            } else if (typeof cnd.value === 'number') {
                cnd.value = String(cnd.value);
            }
        } else {
            if (cnd.value && typeof cnd.value === 'string') {
                cnd.value = parseFloat(cnd.value);
            }
            if ('valueB' in cnd && typeof cnd.valueB === 'string') {
                cnd.valueB = parseFloat(cnd.valueB as string);
            }
        }
    }
};
