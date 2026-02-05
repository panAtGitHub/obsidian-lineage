import { MandalaView } from 'src/view/view';

type PersistedViewState = {
    subgridTheme: string | null;
    activeSection: string | null;
    activeCell9x9: { row: number; col: number } | null;
    mode: '3x3' | '9x9' | null;
    zoom: number | null;
    leftSidebar: boolean | null;
    leftSidebarWidth: number | null;
    detailSidebar: boolean | null;
    detailSidebarWidth: number | null;
};

export const readMandalaViewStateFromFrontmatter = (
    view: MandalaView,
): PersistedViewState | null => {
    void view;
    return null;
};

export const persistMandalaViewStateToFrontmatter = (view: MandalaView) => {
    void view;
};

export const schedulePersistMandalaViewState = (view: MandalaView) => {
    void view;
};

export const applyMandalaViewStateFromFrontmatter = (view: MandalaView) => {
    void view;
};
