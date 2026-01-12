import { describe, expect, test } from 'vitest';
import { compareDocuments } from 'src/helpers/test-helpers/compare-documents';
import { ginkgo_academic_paper } from 'src/lib/data-conversion/test-data/ginkgo_acedemic_paper';
import { clone } from 'src/helpers/clone';
import { MandalaGridDocument } from 'src/stores/document/document-state-type';
import invariant from 'tiny-invariant';

describe('compare documents', () => {
    test('should be equal', () => {
        expect(
            compareDocuments(
                ginkgo_academic_paper.mandalaDocument,
                ginkgo_academic_paper.mandalaDocument,
            ),
        ).toBe(true);
    });

    test('should not be equal: content', () => {
        const docB: MandalaGridDocument = clone(
            ginkgo_academic_paper.mandalaDocument,
        );
        const firstNode = docB.columns[0].groups[0].nodes[0];
        invariant(docB.content[firstNode]);
        docB.content[firstNode].content = String(Math.random());
        expect(
            compareDocuments(ginkgo_academic_paper.mandalaDocument, docB),
        ).toBe(false);
    });

    test('should not be equal: columns', () => {
        const docB: MandalaGridDocument = clone(
            ginkgo_academic_paper.mandalaDocument,
        );

        docB.columns.pop();
        expect(
            compareDocuments(ginkgo_academic_paper.mandalaDocument, docB),
        ).toBe(false);
    });
    test('should not be equal: groups', () => {
        const docB: MandalaGridDocument = clone(
            ginkgo_academic_paper.mandalaDocument,
        );

        docB.columns[0].groups.pop();
        expect(
            compareDocuments(ginkgo_academic_paper.mandalaDocument, docB),
        ).toBe(false);
    });
    test('should not be equal: node', () => {
        const docB: MandalaGridDocument = clone(
            ginkgo_academic_paper.mandalaDocument,
        );

        docB.columns[0].groups[0].nodes.pop();
        expect(
            compareDocuments(ginkgo_academic_paper.mandalaDocument, docB),
        ).toBe(false);
    });
});
