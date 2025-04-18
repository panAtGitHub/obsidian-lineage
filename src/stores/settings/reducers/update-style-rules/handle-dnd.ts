import { StyleRule } from 'src/stores/settings/types/style-rules-types';
import { MoveNodePayload } from 'src/stores/settings/reducers/update-style-rules/update-style-rules';
import { moveArrayItem } from 'src/helpers/array-helpers/move-array-item';

export const handleDND = (
    rules: StyleRule[],
    payload: Omit<MoveNodePayload, 'documentPath'>,
) => {
    const { droppedId, targetId, position } = payload;
    const fromIndex = rules.findIndex((r) => r.id === droppedId);
    let toIndex = rules.findIndex((r) => r.id === targetId);
    if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return rules;
    }
    const droppedWasAboveTarget = fromIndex < toIndex;
    if (droppedWasAboveTarget) {
        toIndex--;
    }

    if (position === 'before') {
        rules = moveArrayItem(rules, fromIndex, toIndex);
    } else {
        rules = moveArrayItem(rules, fromIndex, toIndex + 1);
    }
    return rules;
};
