import { derived } from 'src/lib/store/derived';
import { MandalaView } from 'src/view/view';
import {
    createSectionColorIndex,
    parseSectionColorsFromFrontmatter,
    SECTION_COLOR_PALETTE,
} from 'src/view/helpers/mandala/section-colors';

export const SectionColorBySectionStore = (view: MandalaView) =>
    derived(view.documentStore, (state) => {
        const map = parseSectionColorsFromFrontmatter(state.file.frontmatter);
        const index = createSectionColorIndex(map);
        const result: Record<string, string> = {};
        for (const [section, key] of Object.entries(index)) {
            result[section] = SECTION_COLOR_PALETTE[key];
        }
        return result;
    });
