import { MandalaView } from 'src/view/view';

const PINNED_SECTIONS_KEY = 'mandala_pinned_sections';
const PINNED_ACTIVE_SECTION_KEY = 'mandala_pinned_active_section';

type PinnedFrontmatter = {
    sections: string[];
    activeSection: string | null;
};

const normalizeSections = (value: unknown): string[] => {
    if (Array.isArray(value)) {
        return value.filter((item): item is string => typeof item === 'string');
    }
    if (typeof value === 'string') {
        return [value];
    }
    return [];
};

export const readPinnedFromFrontmatter = (
    view: MandalaView,
): PinnedFrontmatter | null => {
    if (!view.file) return null;
    const cache = view.plugin.app.metadataCache.getFileCache(view.file);
    const frontmatter = cache?.frontmatter;
    if (!frontmatter) return null;
    const sections = normalizeSections(frontmatter[PINNED_SECTIONS_KEY]);
    const activeSectionValue = frontmatter[PINNED_ACTIVE_SECTION_KEY];
    const activeSection =
        typeof activeSectionValue === 'string' ? activeSectionValue : null;

    if (sections.length === 0 && !activeSection) return null;
    return { sections, activeSection };
};

export const writePinnedToFrontmatter = (
    view: MandalaView,
    sections: string[],
    activeSection: string | null,
): void => {
    if (!view.file) return;
    void view.plugin.app.fileManager.processFrontMatter(
        view.file,
        (frontmatter) => {
            if (sections.length > 0) {
                frontmatter[PINNED_SECTIONS_KEY] = sections;
            } else {
                delete frontmatter[PINNED_SECTIONS_KEY];
            }
            if (activeSection) {
                frontmatter[PINNED_ACTIVE_SECTION_KEY] = activeSection;
            } else {
                delete frontmatter[PINNED_ACTIVE_SECTION_KEY];
            }
        },
    );
};
