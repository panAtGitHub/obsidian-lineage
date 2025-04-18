import { describe, expect, it } from 'vitest';
import { collapsedSpanMarker } from 'src/lib/data-conversion/helpers/html-element-marker/collapsed-span-marker';
import { parseHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/parse-html-element-marker';

describe('parseHtmlElementMarker', () => {
    it('case 1', () => {
        const input = collapsedSpanMarker('3.2', 2);
        const output = ['3.2', '2', '3.2.2'];
        expect(parseHtmlElementMarker(input)).toEqual(output);
    });
    it('case 2', () => {
        const input = collapsedSpanMarker('3.2.1.1', 2);
        const output = ['3.2.1.1', '2', '3.2.1.1.2'];
        expect(parseHtmlElementMarker(input)).toEqual(output);
    });
});
