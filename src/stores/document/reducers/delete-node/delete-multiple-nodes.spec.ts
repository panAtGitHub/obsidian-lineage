import { describe, expect, it } from 'vitest';
import { deleteNode } from 'src/stores/document/reducers/delete-node/delete-node';

describe('delete multiple node', () => {
    it('[(n1 n2 n3)] [n1_1...]', () => {
        const c0 = 'cOKe4kJql';
        const c1 = 'c1lOsf7gI';
        const root = 'r4safQcN5';
        const n1 = 'nzeV62e6U';
        const n1_1 = 'nMhU-NVLG';
        const n1_2 = 'nb5cOfFeE';
        const n1_3 = 'na5XCuJdL';
        const n2 = 'nShHUFKQj';
        const n2_1 = 'nnmp6SLoG';
        const n2_2 = 'nxyCRSMpz';
        const n2_3 = 'n63HpSJ63';
        const n3 = 'nsrDQNkYK';
        const n3_1 = 'nzahkZPbX';
        const n3_3 = 'nGZXB86F_';
        const n3_2 = 'nC9C5KH-M';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2, n1_3], parentId: n1 },
                        { nodes: [n2_1, n2_2, n2_3], parentId: n2 },
                        { nodes: [n3_1, n3_2, n3_3], parentId: n3 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_3]: { content: '2.3' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_3]: { content: '3.2' },
            },
        };
        const action = {
            nodeId: n1,
            selectedNodes: new Set([n1, n2, n3]),
        };

        const nextNode = deleteNode(input, action.nodeId, action.selectedNodes);
        expect(nextNode).toBeDefined();
        expect(input.columns.length).toBe(1);
        expect(input.columns[0].groups.length).toBe(1);
        expect(input.columns[0].groups[0].nodes.length).toBe(1);
        expect(input).toEqual({
            columns: [
                { id: c0, groups: [{ nodes: [nextNode], parentId: root }] },
            ],
            content: {
                [nextNode]: { content: '' },
            },
        });
    });

    it('[n1 n2 n3] [n1_1 (n1_2 .... 3_2) n3_3]', () => {
        const c0 = 'crMKQIGCr';
        const c1 = 'cq2FP5hMT';
        const root = 'rtqj4mYjc';
        const n1 = 'nx0WEXsPA';
        const n1_1 = 'neEA3acu4';
        const n1_2 = 'nGpi5ruQ-';
        const n1_3 = 'nk_aTM-fe';
        const n2 = 'nGoGrGWyT';
        const n2_1 = 'nofvWpip3';
        const n2_2 = 'n8Ztw3FSp';
        const n2_3 = 'ngAecamtd';
        const n3 = 'nxup7Itx_';
        const n3_1 = 'nIT1j7xEm';
        const n3_3 = 'n8m3e2MIG';
        const n3_2 = 'nrVzhyDuH';
        const input = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1, n1_2, n1_3], parentId: n1 },
                        { nodes: [n2_1, n2_2, n2_3], parentId: n2 },
                        { nodes: [n3_1, n3_2, n3_3], parentId: n3 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n1_2]: { content: '1.2' },
                [n1_3]: { content: '1.3' },
                [n2]: { content: '2' },
                [n2_1]: { content: '2.1' },
                [n2_2]: { content: '2.2' },
                [n2_3]: { content: '2.3' },
                [n3]: { content: '3' },
                [n3_1]: { content: '3.1' },
                [n3_3]: { content: '3.3' },
                [n3_2]: { content: '3.2' },
            },
        };
        const action = {
            nodeId: n1_2,
            selectedNodes: new Set([n1_2, n1_3, n2_1, n2_2, n2_3, n3_1, n3_2]),
        };

        const output = {
            columns: [
                { id: c0, groups: [{ nodes: [n1, n2, n3], parentId: root }] },
                {
                    id: c1,
                    groups: [
                        { nodes: [n1_1], parentId: n1 },
                        { nodes: [n3_3], parentId: n3 },
                    ],
                },
            ],
            content: {
                [n1]: { content: '1' },
                [n1_1]: { content: '1.1' },
                [n2]: { content: '2' },
                [n3]: { content: '3' },
                [n3_3]: { content: '3.3' },
            },
        };
        expect(deleteNode(input, action.nodeId, action.selectedNodes)).toEqual(
            n3_3,
        );
        expect(input).toEqual(output);
    });
});
