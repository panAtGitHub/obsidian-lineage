import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const ConflictingHotkeys = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.hotkeys.conflictingHotkeys);

export const HotkeysSearchTerm = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.hotkeys.searchTerm);
