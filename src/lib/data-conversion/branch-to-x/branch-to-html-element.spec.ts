import { describe, expect, test } from 'vitest';
import { ClipboardBranch } from 'src/stores/document/document-state-type';
import { branchToHtmlElement } from 'src/lib/data-conversion/branch-to-x/branch-to-html-element';

describe('branch-to-html-element', () => {
    test('case 1', () => {
        const n1_1 = 'nhHt';
        const n1_2 = 'nQUN';
        const n1_1_1 = 'n0hL';
        const n1_1_2 = 'n3AK';
        const n1_2_1 = 'nU3O';
        const n1_2_2 = 'n97l';
        const n1_1_2_1 = 'nNIa';
        const n1 = 'nBoi';
        const branch: ClipboardBranch = {
            sortedChildGroups: [
                [{ nodes: [n1_1, n1_2], parentId: n1 }],
                [
                    { nodes: [n1_1_1, n1_1_2], parentId: n1_1 },
                    { nodes: [n1_2_1, n1_2_2], parentId: n1_2 },
                ],
                [{ nodes: [n1_1_2_1], parentId: n1_1_2 }],
            ],
            content: {
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_1_1]: { content: '1.1.1' },
                [n1_1_2]: { content: '1.1.2' },
                [n1_2_1]: { content: '1.2.1' },
                [n1_2_2]: { content: '1.2.2' },
                [n1_1_2_1]: { content: '1.1.2.1' },
                [n1]: { content: '1a\n1b' },
            },
            nodeId: n1,
            mode: 'copy',
        };
        const text = `<span data-section="1"></span>1a
1b

<span data-section="1.1"></span>1.1

<span data-section="1.1.1"></span>1.1.1

<span data-section="1.1.2"></span>1.1.2

<span data-section="1.1.2.1"></span>1.1.2.1

<span data-section="1.2"></span>1.2

<span data-section="1.2.1"></span>1.2.1

<span data-section="1.2.2"></span>1.2.2`;
        expect(branchToHtmlElement([branch])).toEqual(text);
    });
    test('multiple branches', () => {
        const input = [
            {
                sortedChildGroups: [
                    [
                        {
                            nodes: ['nX5FJMc4Q', 'nCs0uUHmh'],
                            parentId: 'nVfOijYyQ',
                        },
                    ],
                ],
                content: {
                    nX5FJMc4Q: { content: '1.1' },
                    nCs0uUHmh: { content: '1.2' },
                    nVfOijYyQ: { content: '1' },
                },
                nodeId: 'nVfOijYyQ',
                mode: 'copy',
            },
            {
                sortedChildGroups: [
                    [
                        {
                            nodes: ['nrwDAxf7O', 'nG2BkexG0'],
                            parentId: 'nbbfjtFUV',
                        },
                    ],
                ],
                content: {
                    nrwDAxf7O: { content: '2.1' },
                    nG2BkexG0: { content: '2.2' },
                    nbbfjtFUV: { content: '2' },
                },
                nodeId: 'nbbfjtFUV',
                mode: 'copy',
            },
        ] as ClipboardBranch[];
        const text = `<span data-section="1"></span>1

<span data-section="1.1"></span>1.1

<span data-section="1.2"></span>1.2

<span data-section="2"></span>2

<span data-section="2.1"></span>2.1

<span data-section="2.2"></span>2.2`;
        expect(branchToHtmlElement(input)).toEqual(text);
    });
});
