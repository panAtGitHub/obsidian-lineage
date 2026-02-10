import {
    ConditionNode,
    NumericConditionNode,
    NumericOperator,
} from 'src/stores/settings/types/style-rules-types';
import { Content } from 'src/stores/document/document-state-type';
import { NodePropertyResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/node-property-resolver/node-property-resolver';
import { evaluateStringCondition } from 'src/stores/view/subscriptions/effects/style-rules/helpers/helpers/evaluate-string-condition';
import { evaluateNumericCondition } from 'src/stores/view/subscriptions/effects/style-rules/helpers/helpers/evaluate-numeric-condition';
import { TargetNodeResolver } from 'src/stores/view/subscriptions/effects/style-rules/helpers/resolvers/target-node-resolver';

export const evaluateCondition = (
    nodeId: string,
    condition: ConditionNode,
    content: Content,
    targetResolver: TargetNodeResolver,
    propertyResolver: NodePropertyResolver,
): boolean => {
    if (!condition.enabled) return false;

    const targetNodes = targetResolver.getTargetNodes(condition.scope, nodeId);

    for (const targetId of targetNodes) {
        const nodeContent = content[targetId]?.content ?? '';
        if ('value' in condition) {
            let matches = false;

            if (
                condition.property === 'content' ||
                condition.property === 'headings'
            ) {
                const value =
                    condition.property === 'content'
                        ? nodeContent.toLowerCase()
                        : propertyResolver.getProperty(nodeId, 'headings');

                matches = evaluateStringCondition(
                    value as string,
                    condition.operator,
                    condition.value.toLowerCase(),
                );
            } else {
                const value = propertyResolver.getProperty(
                    targetId,
                    condition.property,
                ) as number | null;
                if (value === null)
                    throw new Error(
                        'Value is null:' +
                            condition.property +
                            ' - ' +
                            targetId,
                    );
                matches = evaluateNumericCondition(
                    value,
                    condition.operator as NumericOperator,
                    (condition as NumericConditionNode).value,
                    (condition as NumericConditionNode).valueB,
                );
            }

            if (matches) return true;
        }
    }

    return false;
};
