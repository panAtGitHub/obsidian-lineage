import { MandalaGridDocumentFormat } from 'src/stores/settings/settings-type';
import { MandalaView } from 'src/view/view';

export const loadFullDocument = (
    view: MandalaView,
    data: string,
    frontmatter: string,
    format: MandalaGridDocumentFormat,
    activeSection: string | null,
) => {
    view.documentStore.dispatch({
        payload: {
            document: { data: data, frontmatter, position: null },
            format,
            activeSection,
        },
        type: 'document/file/load-from-disk',
    });
};
