import MandalaGrid from 'src/main';
import { MandalaGridDocumentFormat } from 'src/stores/settings/settings-type';

export const setDocumentFormat = (
    plugin: MandalaGrid,
    path: string,
    type: MandalaGridDocumentFormat,
) => {
    plugin.settings.dispatch({
        type: 'settings/documents/set-document-format',
        payload: {
            path: path,
            format: type,
        },
    });
};
