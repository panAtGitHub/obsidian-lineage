import {
    calculateWordBlocks,
    MinimapLine,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-word-blocks';
import { calculateIndentationLines } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/calculate-indentation-lines';
import { MandalaGridDocument } from 'src/stores/document/document-state-type';
import { columnsToExtendedJson } from 'src/lib/data-conversion/x-to-json/columns-to-extended-json';
import { createYRangeMap } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/helpers/create-y-range-map';
import { LINE_HEIGHT_CPX } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/constants';
import { CardRanges } from 'src/stores/minimap/minimap-state-type';

export class ShapesAndRanges {
    #lines: MinimapLine[] = [];
    #isEmpty = true;
    #totalLines: number = 0;
    #cardRanges: CardRanges = {};

    calculateDocument(document: MandalaGridDocument, canvasId: string) {
        const tree = columnsToExtendedJson(document.columns, document.content);
        const blocks = calculateWordBlocks(tree, canvasId);

        this.#lines = blocks.lines;
        this.#totalLines = blocks.totalLines;
        calculateIndentationLines(blocks.lines);
        this.#isEmpty =
            blocks.lines.length === 0 ||
            blocks.lines.every(
                (line) =>
                    line.wordBlocks.length === 1 && line.wordBlocks[0].empty,
            );

        this.#cardRanges = createYRangeMap(this.#lines);

        return {
            totalLines: this.#totalLines,
            totalDrawnHeight_cpx: this.#totalLines * LINE_HEIGHT_CPX,
            cardRanges: this.#cardRanges,
        };
    }

    get lines(): MinimapLine[] {
        return this.#lines;
    }

    get isEmpty(): boolean {
        return this.#isEmpty;
    }
}
