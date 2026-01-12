import { MandalaView } from 'src/view/view';

export const isGrabbing = (view: MandalaView) => {
    const cursor = view.container!.style.cursor;
    if (cursor === 'grab') return true;
    return false;
};
