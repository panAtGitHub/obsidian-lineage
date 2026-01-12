import { MandalaView } from 'src/view/view';
import { markUnresolvedLinks } from 'src/stores/view/subscriptions/effects/mark-unresolved-links/mark-unresolved-links';
import { TAbstractFile, TFile } from 'obsidian';

const metadataCallback = (view: MandalaView, updatedFile: TFile) => {
    const viewFile = view.file;
    if (!viewFile) return;

    if (updatedFile === viewFile) {
        markUnresolvedLinks(view);
    }
};

const vaultCallback = (view: MandalaView, affectedFile: TAbstractFile) => {
    if (!(affectedFile instanceof TFile)) return;
    const viewFile = view.file;
    if (!viewFile) return;

    const viewFileLinks =
        view.plugin.app.metadataCache.getFileCache(viewFile)?.links;
    if (!viewFileLinks) return;

    let affectedFileIsALink = false;
    for (const link of viewFileLinks) {
        const linkBasename = link.link.split('#')[0];

        if (affectedFile.basename === linkBasename) {
            affectedFileIsALink = true;
            break;
        }
    }
    if (affectedFileIsALink) {
        markUnresolvedLinks(view);
    }
};

export const onMetadataCache = (view: MandalaView) => {
    const app = view.plugin.app;

    const metadataRef = app.metadataCache.on('changed', (file) =>
        metadataCallback(view, file),
    );
    const createRef = app.vault.on('create', (file) =>
        vaultCallback(view, file),
    );
    const deleteRef = app.vault.on('delete', (file) =>
        vaultCallback(view, file),
    );

    return () => {
        app.metadataCache.offref(metadataRef);
        app.vault.offref(createRef);
        app.vault.offref(deleteRef);
    };
};
