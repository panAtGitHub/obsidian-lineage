import { MandalaView } from 'src/view/view';
import { getElementById } from 'src/lib/align-element/helpers/get-element-by-id';
import { delay } from 'src/helpers/delay';

const LOOP_DELAY_MS = 10;
const MAX_ATTEMPTS = 100;
const REQUIRED_MATCHES = 20;

export const waitForActiveNodeToStopMoving = async (
    view: MandalaView,
    signal: AbortSignal,
) => {
    const activeBranch = view.viewStore.getValue().document.activeBranch;

    let columnEl: HTMLElement | undefined;

    let retries = 0;
    let hits = 0;

    let lastScrollTop = -1;
    let lastScrollLeft = -1;

    const container = view.container!;
    while (retries < MAX_ATTEMPTS && !signal.aborted) {
        if (!columnEl) {
            columnEl = getElementById(container, activeBranch.column)!;
        } else {
            const isStill =
                lastScrollTop === columnEl.scrollTop &&
                lastScrollLeft === container.scrollLeft;
            if (isStill) {
                hits++;
                if (hits === REQUIRED_MATCHES) return;
            } else {
                hits = 0;
            }
            lastScrollTop = columnEl.scrollTop;
            lastScrollLeft = container.scrollLeft;
        }
        retries++;
        await delay(LOOP_DELAY_MS);
    }
};
