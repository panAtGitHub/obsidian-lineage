import MandalaGrid from 'src/main';
import { MandalaView } from 'src/view/view';

export const getActiveMandalaView = (plugin: MandalaGrid) => {
    return plugin.app.workspace.getActiveViewOfType(MandalaView);
};
