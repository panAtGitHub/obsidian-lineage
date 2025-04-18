export const calculateScrollDeltaToActiveCard = (
    y_start_cpx: number,
    y_end_cpx: number,
    totalDrawnHeight_cpx: number,
    scrollPosition_cpx: number,
    containerHeight_cpx: number,
) => {
    const contentFitsContainer = totalDrawnHeight_cpx <= containerHeight_cpx;
    if (contentFitsContainer) {
        return null;
    }

    const currentScroll_cpx = scrollPosition_cpx;
    const visibleStart_cpx = currentScroll_cpx;
    const visibleEnd_cpx = currentScroll_cpx + containerHeight_cpx;

    const startIsVisible =
        y_start_cpx > visibleStart_cpx && y_start_cpx < visibleEnd_cpx;
    const endIsVisible =
        y_end_cpx > visibleStart_cpx && y_end_cpx < visibleEnd_cpx;
    if (startIsVisible && endIsVisible) {
        return null;
    }

    // calculate new scroll position
    let newScroll_cpx = 0;

    const range_height_cpx = y_end_cpx - y_start_cpx;
    const rangeIsTallerThanContainer = range_height_cpx > containerHeight_cpx;
    if (rangeIsTallerThanContainer) {
        //  scroll to start of range
        newScroll_cpx = y_start_cpx;
    } else {
        if (!startIsVisible) {
            newScroll_cpx = y_start_cpx - 10;
        } else if (!endIsVisible) {
            newScroll_cpx = y_end_cpx - containerHeight_cpx + 10;
        }
    }

    const maxScroll_cpx = totalDrawnHeight_cpx - containerHeight_cpx;
    newScroll_cpx = Math.max(0, Math.min(newScroll_cpx, maxScroll_cpx));

    return newScroll_cpx;
};
