import {
    calculateChunkPositions,
    ElementName,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-chunk-positions';
import {
    CHAR_WIDTH_CPX,
    INDENT_BLOCK_TOTAL_WIDTH_CPX,
    LINE_HEIGHT_CPX,
    N_CHARS_OF_INDENT,
    N_CHARS_PER_LINE,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { ExtendedTreeNode } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { IndentationLine } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-indentation-lines';

const lineOffset = 1;

export type WordBlock = {
    x_px: number;
    width_px: number;
    empty: boolean;
    chunkType: ElementName | null;
};

type State = { nextLineOffset: number; depth: number; lines: MinimapLine[] };
const calculateWordBlocksOfCard = (
    node: ExtendedTreeNode,
    state: State,
    canvasId: string,
) => {
    const availableLineCharacters =
        N_CHARS_PER_LINE - state.depth * N_CHARS_OF_INDENT;
    const wordPositions = calculateChunkPositions(
        node.content,
        availableLineCharacters,
        node.id,
        canvasId,
    );

    let line: MinimapLine = {
        indentationLines: [],
        lineNumber: state.nextLineOffset,
        wordBlocks: [],
        depth: state.depth,
        nodeId: node.id,
        y_px: LINE_HEIGHT_CPX * state.nextLineOffset,
    };
    state.lines.push(line);
    let lineNumberRelativeToSection = wordPositions.chunks[0]?.line || 0;
    for (const wordPos of wordPositions.chunks) {
        const lineNumberRelativeToCanvas = state.nextLineOffset + wordPos.line;

        if (wordPos.line > lineNumberRelativeToSection) {
            line = {
                indentationLines: [],
                lineNumber: lineNumberRelativeToCanvas,
                wordBlocks: [],
                depth: state.depth,
                nodeId: node.id,
                y_px: LINE_HEIGHT_CPX * lineNumberRelativeToCanvas,
            };
            state.lines.push(line);
            lineNumberRelativeToSection = wordPos.line;
        }
        line.wordBlocks.push({
            width_px: wordPos.length_chars * CHAR_WIDTH_CPX,
            x_px:
                state.depth * INDENT_BLOCK_TOTAL_WIDTH_CPX +
                wordPos.x_chars * CHAR_WIDTH_CPX,
            empty: wordPositions.empty,
            chunkType: wordPos.type,
        });
    }

    state.nextLineOffset = state.nextLineOffset + wordPositions.totalLines + 1;

    const currentDepth = state.depth;
    state.depth = currentDepth + 1;
    for (const child of node.children) {
        calculateWordBlocksOfCard(child, state, canvasId);
    }
    state.depth = currentDepth;
};

export type MinimapLine = {
    wordBlocks: WordBlock[];
    indentationLines: IndentationLine[];
    lineNumber: number;
    depth: number;
    nodeId: string;
    y_px: number;
};

export type WordBlocksResult = { totalLines: number; lines: MinimapLine[] };
export const calculateWordBlocks = (
    nodes: ExtendedTreeNode[],
    canvasId: string,
) => {
    const state: State = {
        nextLineOffset: lineOffset, // keep an empty line at the start for card focus rectangle
        depth: 0,
        lines: [],
    };
    for (const node of nodes) {
        calculateWordBlocksOfCard(node, state, canvasId);
    }
    return {
        lines: state.lines,
        totalLines: state.nextLineOffset + 1,
    };
};
