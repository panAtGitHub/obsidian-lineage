import {
    NumericOperator,
    NumericProperty,
    StringOperator,
    StringProperty,
    StyleRuleTarget,
    StyleVariant,
} from 'src/stores/settings/types/style-rules-types';

export const targets: StyleRuleTarget[] = [
    'self',
    'self-or-any-parent',
    'self-or-any-children',
    'self-or-direct-parent',
    'self-or-direct-children',
    'any-parent',
    'any-children',
    'direct-parent',
    'direct-children',
];

export const stringOperators: StringOperator[] = [
    'contains',
    'not-contains',
    'equals',
    'not-equals',
    'empty',
    'not-empty',
    'starts-with',
    'not-starts-with',
    'ends-with',
    'not-ends-with',
    'matches-regex',
    'not-matches-regex',
];

export const numericOperators: NumericOperator[] = [
    'equals',
    'not-equals',
    'empty',
    'not-empty',
    'greater-than',
    'less-than',
    'between',
    'not-between',
];

export const properties: (NumericProperty | StringProperty)[] = [
    'content',
    'headings',
    'headings-word-count',
    'depth',
    'character-count',
    'word-count',
    'line-count',
    'direct-children-count',
    'total-children-count',
];

export const styleVariants: StyleVariant[] = [
    'background-color',
    'left-border',
];
