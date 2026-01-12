import MandalaGrid from 'src/main';
import { TFile } from 'obsidian';
import { filterNonExistentLinks } from 'src/stores/view/subscriptions/effects/mark-unresolved-links/helpers/filter-non-existent-links';

export const getNonExistentLinks = (plugin: MandalaGrid, file: TFile) => {
    const cache = plugin.app.metadataCache.getFileCache(file);
    if (!cache?.links) {
        return new Set<string>();
    }

    const nonExistentLinks = filterNonExistentLinks(
        plugin,
        cache.links,
        file.path,
    );

    return new Set(nonExistentLinks);
};
