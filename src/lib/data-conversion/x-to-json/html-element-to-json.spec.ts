import { describe, expect, it } from 'vitest';
import { ginkgo_welcome } from 'src/lib/data-conversion/test-data/ginkgo_welcome';
import { ginkgo_academic_paper } from 'src/lib/data-conversion/test-data/ginkgo_acedemic_paper';
import { htmlElementToJson } from 'src/lib/data-conversion/x-to-json/html-element-to-json';
import { collapsedSpanMarker } from 'src/lib/data-conversion/helpers/html-element-marker/collapsed-span-marker';

describe('html element to json', () => {
    it('case', () => {
        let index = 1;
        let index2 = 1;
        const input = [
            'one' + collapsedSpanMarker('', index++),
            'one > two' + collapsedSpanMarker('1', index2++),
            'two' + collapsedSpanMarker('', index++),
        ];

        const output = [
            {
                content: 'one',
                children: [{ content: 'one > two', children: [] }],
            },
            {
                content: 'two',
                children: [],
            },
        ];
        const actual = htmlElementToJson(input.join('\n'));
        expect(actual).toEqual(output);
    });

    it('no text', () => {
        const input = `<span data-section="1"/>

<span data-section="2"/>

<span data-section="2.1"/>

<span data-section="2.2"/>

<span data-section="2.3"/>`;

        const output = [
            { content: '', children: [] },
            {
                content: '',
                children: [
                    { content: '', children: [] },

                    { content: '', children: [] },
                    { content: '', children: [] },
                ],
            },
        ];
        const actual = htmlElementToJson(input);
        expect(actual).toEqual(output);
    });
    it('text with no markers', () => {
        const output = [{ content: 'text', children: [] }];
        const actual = htmlElementToJson('text');
        expect(actual).toEqual(output);
    });
    it('text above first marker', () => {
        const output = [
            { content: 'text 1', children: [] },
            { content: 'text 2', children: [] },
            { content: 'text 3', children: [] },
        ];
        const actual = htmlElementToJson(
            [
                `text 1`,
                `<span data-section="1"/>text 2`,
                '<span data-section="2"/>text 3',
            ].join('\n'),
        );

        expect(actual).toEqual(output);
    });
    it('multi line text', () => {
        const output = [
            { content: 'text 1', children: [] },
            { content: 'text 2a\ntext 2b', children: [] },
            { content: 'text 3', children: [] },
        ];
        const input = [
            `text 1`,
            `<span data-section="1"/>text 2a`,
            'text 2b',
            '<span data-section="2"/>text 3',
        ].join('\n');

        const actual = htmlElementToJson(input);

        expect(actual).toEqual(output);
    });
    it('bug 24-02-28', () => {
        const input = `
<span data-section="1"/>text 1

<span data-section="1.1"/>text 2

<span data-section="1.1.1"/>text 3

<span data-section="1.2"/>text 6

<span data-section="2"/>text 7`;
        const output = [
            {
                content: 'text 1',
                children: [
                    {
                        content: 'text 2',
                        children: [
                            { content: 'text 3', children: [] },
                            /*   { content: 'text 4', children: [] },
                            { content: 'text 5', children: [] },*/
                        ],
                    },
                    { content: 'text 6', children: [] },
                ],
            },

            { content: 'text 7', children: [] },
        ];

        const actual = htmlElementToJson(input);
        expect(actual).toEqual(output);
    });

    it('ginkgo_welcome', () => {
        const { mdWithHtmlElement, json } = ginkgo_welcome;
        const actual = htmlElementToJson(mdWithHtmlElement);
        expect(actual).toEqual(json);
    });

    it('ginkgo_academic_paper', () => {
        const { mdWithHtmlElement, json } = ginkgo_academic_paper;
        const actual = htmlElementToJson(mdWithHtmlElement);

        expect(actual).toEqual(json);
    });
});
