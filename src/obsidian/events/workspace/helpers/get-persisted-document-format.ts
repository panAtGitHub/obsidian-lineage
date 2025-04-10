import { LineageView } from 'src/view/view';
import invariant from 'tiny-invariant';
import { LineageDocumentFormat } from 'src/stores/settings/settings-type';

export const getPersistedDocumentFormat = (
    view: LineageView,
    fail = true,
): LineageDocumentFormat => {
    invariant(view.file);
    const format =
        view.plugin.settings.getValue().documents[view.file.path]
            ?.documentFormat;

    if (fail) invariant(format);
    return format;
};
