import { MandalaView } from 'src/view/view';
import { applyViewSize } from 'src/stores/view/subscriptions/effects/css-variables/apply-view-size';
import invariant from 'tiny-invariant';

export const watchViewSize = (view: MandalaView) => {
    const element = view.contentEl.querySelector('.mandala-main');
    invariant(element);

    const observer = new ResizeObserver(() => {
        applyViewSize(view);
    });

    observer.observe(element);

    return () => {
        observer.disconnect();
    };
};
