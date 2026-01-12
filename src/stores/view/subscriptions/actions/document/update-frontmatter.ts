import { MandalaView } from 'src/view/view';

export const updateFrontmatter = (view: MandalaView, frontmatter: string) => {
    view.documentStore.dispatch({
        type: 'document/file/update-frontmatter',
        payload: {
            frontmatter,
        },
    });
};
