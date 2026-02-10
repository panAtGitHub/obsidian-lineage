import { MandalaView } from 'src/view/view';

export const getFileLinkElements = (view: MandalaView) => {
    return Array.from(
        view.contentEl.querySelectorAll('.internal-link'),
    );
};
