import { MandalaView } from 'src/view/view';
import { writePinnedToFrontmatter } from 'src/view/helpers/mandala/pinned-frontmatter';

export const persistActivePinnedNode = (view: MandalaView) => {
    const documentState = view.documentStore.getValue();
    const sections = documentState.sections;
    const pinnedSections = documentState.pinnedNodes.Ids
        .map((id) => sections.id_section[id])
        .filter((section): section is string => Boolean(section));

    const viewState = view.viewStore.getValue();
    const section = sections.id_section[viewState.pinnedNodes.activeNode];
    writePinnedToFrontmatter(view, pinnedSections, section || null);
};
