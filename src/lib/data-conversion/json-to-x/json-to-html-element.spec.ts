import { describe, expect, it } from 'vitest';
import { TreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { expandedSpanMarker } from 'src/lib/data-conversion/helpers/html-element-marker/collapsed-span-marker';
import { jsonToHtmlElement } from 'src/lib/data-conversion/json-to-x/json-to-html-element';
import { ginkgo_welcome } from 'src/lib/data-conversion/test-data/ginkgo_welcome';
import { ginkgo_academic_paper } from 'src/lib/data-conversion/test-data/ginkgo_acedemic_paper';
import { html_element_conflicting_elements } from 'src/lib/data-conversion/test-data/html-element-conflicting-elements';
import { htmlCommentToJson } from 'src/lib/data-conversion/x-to-json/html-comment-to-json';
import { htmlElementToJson } from 'src/lib/data-conversion/x-to-json/html-element-to-json';
import { jsonToHtmlComment } from './json-to-html-comment';

describe('json to html element', () => {
    it('case 1', () => {
        const input: TreeNode[] = [
            {
                content: 'one',
                children: [{ content: 'one > one', children: [] }],
            },
        ];
        const output = [
            expandedSpanMarker('', 1) + 'one',
            '',
            expandedSpanMarker('1', 1) + 'one > one',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });
    it('case 1', () => {
        const input: TreeNode[] = [
            {
                content: 'one',
                children: [
                    {
                        content: 'one > one',
                        children: [
                            { content: 'one > one > one', children: [] },
                        ],
                    },
                ],
            },
            {
                content: 'two',
                children: [
                    {
                        content: 'two > one',
                        children: [
                            { content: 'two > one > one', children: [] },
                        ],
                    },
                ],
            },
        ];
        const output = [
            expandedSpanMarker('', 1) + 'one',
            '',
            expandedSpanMarker('1', 1) + 'one > one',
            '',
            expandedSpanMarker('1.1', 1) + 'one > one > one',
            '',
            expandedSpanMarker('', 2) + 'two',
            '',
            expandedSpanMarker('2', 1) + 'two > one',
            '',
            expandedSpanMarker('2.1', 1) + 'two > one > one',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('case: multi line text', () => {
        const input: TreeNode[] = [
            {
                content: '1a\n1b',
                children: [{ content: '1.1a\n1.1b', children: [] }],
            },
            { content: '2a\n2b', children: [] },
            { content: '3', children: [] },
        ];

        const output = [
            expandedSpanMarker('', 1) + '1a',
            '1b',
            '',
            expandedSpanMarker('1', 1) + '1.1a',
            '1.1b',
            '',
            expandedSpanMarker('', 2) + '2a',
            '2b',
            '',
            expandedSpanMarker('', 3) + '3',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('ginkgo_welcome', () => {
        const { mdWithHtmlElement, json } = ginkgo_welcome;
        const actual = jsonToHtmlElement(json);
        expect(actual).toEqual(mdWithHtmlElement);
    });

    it('ginkgo_academic_paper', () => {
        const { mdWithHtmlElement, json } = ginkgo_academic_paper;
        const actual = jsonToHtmlElement(json);

        expect(actual).toEqual(mdWithHtmlElement);
    });

    it('htmlElementConflictingElements', () => {
        const { mdWithHtmlElement, mdWithHtmlComment } =
            html_element_conflicting_elements;
        const actual = jsonToHtmlElement(htmlCommentToJson(mdWithHtmlComment));

        expect(actual).toEqual(mdWithHtmlElement);
    });

    it('case: tasks', () => {
        const input: TreeNode[] = [
            {
                content: '- [x] task',
                children: [
                    {
                        content: '- [ ] sub task',
                        children: [],
                    },
                ],
            },
            {
                content: '* [x] [[task]]',
                children: [],
            },
            { content: '+ [/] [[task]]', children: [] },
        ];

        const output = [
            expandedSpanMarker('', 1),
            '- [x] task',
            '',
            expandedSpanMarker('1', 1),
            '- [ ] sub task',
            '',
            expandedSpanMarker('', 2),
            '* [x] [[task]]',
            '',
            expandedSpanMarker('', 3),
            '+ [/] [[task]]',
        ];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('case: tags', () => {
        const input: TreeNode[] = [
            {
                content: '#🙄 text',
                children: [],
            },
        ];

        const output = [expandedSpanMarker('', 1), '#🙄 text'];
        expect(jsonToHtmlElement(input)).toEqual(output.join('\n'));
    });

    it('html comments matches html elements', () => {
        const pairs = [
            [
                html_element_conflicting_elements.mdWithHtmlComment,
                html_element_conflicting_elements.mdWithHtmlElement,
            ],
            [
                ginkgo_academic_paper.annotatedMd,
                ginkgo_academic_paper.mdWithHtmlElement,
            ],
        ];
        for (const [htmlComments, htmlElements] of pairs) {
            const jsonFromHtmlElements = htmlElementToJson(htmlElements);
            const jsonFromHtmlComments = htmlCommentToJson(htmlComments);
            const toHtmlElement = jsonToHtmlElement(jsonFromHtmlElements);
            const toHtmlComment = jsonToHtmlComment(jsonFromHtmlComments);
            expect(jsonFromHtmlElements).toEqual(jsonFromHtmlComments);
            expect(toHtmlElement).toEqual(htmlElements);
            expect(toHtmlComment).toEqual(htmlComments);
        }
    });
});
