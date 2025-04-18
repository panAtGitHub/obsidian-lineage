export type CardRange = {
    y_start: number;
    y_end: number;
    cardId: string;
};
export type CardRanges = {
    [cardId: string]: CardRange;
};
export type ScrollInfo = {
    scrollPosition_cpx: number;
    totalDrawnHeight_cpx: number;
    containerHeight_cpx: number;
};
export type MinimapDomElements = {
    canvas: HTMLCanvasElement;
    scrollIndicator: HTMLElement;
    offscreen: OffscreenCanvas;
    canvasContainer: HTMLElement;
};
export type MinimapState = {
    activeCardId: string;
    canvasId: string;
    scrollbar: ScrollInfo;
    ranges: {
        cards: CardRanges;
    };
};
