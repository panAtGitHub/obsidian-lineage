import { debounce } from 'src/helpers/debounce';
import { drawDocument } from './draw-document';
import { updateVisibleRange } from 'src/stores/minimap/subscriptions/effects/update-visible-range';

export class DebouncedMinimapEffects {
    drawDocument = debounce(drawDocument, 100);

    updateVisibleRange = debounce(updateVisibleRange, 16);
}
