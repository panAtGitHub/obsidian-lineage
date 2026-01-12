import { MandalaView } from 'src/view/view';
import { derived } from 'src/lib/store/derived';

export const NodeStylesStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.styleRules.nodeStyles);

export const AllRuleMatchesStore = (view: MandalaView) =>
    derived(view.viewStore, (state) => state.styleRules.allMatches);
