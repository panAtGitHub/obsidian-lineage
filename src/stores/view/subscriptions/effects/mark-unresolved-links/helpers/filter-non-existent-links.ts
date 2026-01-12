import MandalaGrid from 'src/main';
import { LinkCache } from 'obsidian';

export const filterNonExistentLinks = (
    plugin: MandalaGrid,
    links: LinkCache[],
    filePath: string,
) => {
    return links
        .map((link) => link.link.split('#')[0])
        .filter(
            (link) =>
                !plugin.app.metadataCache.getFirstLinkpathDest(link, filePath),
        );
};
