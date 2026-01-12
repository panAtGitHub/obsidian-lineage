import { MandalaView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { MandalaGridDocumentFormat } from 'src/stores/settings/settings-type';

export const getPersistedDocumentFormat = (
    view: MandalaView,
    fail = true,
): MandalaGridDocumentFormat => {
    invariant(view.file);
    const format =
        view.plugin.settings.getValue().documents[view.file.path]
            ?.documentFormat;

    if (fail) invariant(format);
    return format;
};
