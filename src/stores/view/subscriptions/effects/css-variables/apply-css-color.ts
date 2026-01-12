import { MandalaView } from 'src/view/view';
import { cssVariables } from 'src/stores/view/subscriptions/effects/css-variables/helpers/css-variables';

export const applyCssColor = (
    view: MandalaView,
    name: keyof typeof cssVariables.colors,
) => {
    const target = view.contentEl;
    const settings = view.plugin.settings.getValue();
    const color = settings.view.theme[name];
    if (color) {
        target.style.setProperty(cssVariables.colors[name], color);
    } else {
        target.style.removeProperty(cssVariables.colors[name]);
    }
};
