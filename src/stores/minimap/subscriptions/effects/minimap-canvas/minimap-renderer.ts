import { MandalaGridDocument } from 'src/stores/document/document-state-type';
import { ShapesAndRanges } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/shapes/shapes-and-ranges';
import { Renderer } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/renderer';
import {
    MinimapTheme,
    minimapTheme,
} from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/consts/minimap-theme';
import { VisibleRangeManager } from 'src/stores/minimap/subscriptions/effects/minimap-canvas/worker/renderer/visible-range-manager';

export class MinimapRenderer {
    private renderer: Renderer;
    private shapes: ShapesAndRanges;
    private range: VisibleRangeManager;

    private state: {
        theme: MinimapTheme;
    } = {
        theme: minimapTheme.current,
    };

    constructor(
        ctx: OffscreenCanvasRenderingContext2D,
        canvas: OffscreenCanvas,
        theme: MinimapTheme,
        canvas_height_cpx: number,
    ) {
        this.shapes = new ShapesAndRanges();
        this.renderer = new Renderer(ctx, canvas, this.shapes);
        this.range = new VisibleRangeManager(canvas_height_cpx);
        this.state.theme = theme;
    }

    setTheme = (theme: MinimapTheme) => {
        this.state.theme = theme;
    };

    setDocument = (document: MandalaGridDocument, canvasId: string) => {
        const shapes = this.shapes.calculateDocument(document, canvasId);
        this.renderer.drawDocument(this.state.theme, this.range.visibleRange);
        return {
            totalDrawnHeight_cpx: shapes.totalDrawnHeight_cpx,
            cardRanges: shapes.cardRanges,
        };
    };

    drawDocument = () => {
        this.renderer.drawDocument(this.state.theme, this.range.visibleRange);
    };

    setScrollPosition = (scroll_position_cpx: number) => {
        const shouldRerender =
            this.range.updateScrollPosition(scroll_position_cpx);
        if (shouldRerender) {
            return this.range.visibleRange;
        }
        return null;
    };
}
