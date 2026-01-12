import { parseHtmlCommentMarker } from 'src/lib/data-conversion/helpers/html-comment-marker/parse-html-comment-marker';
import { MandalaView } from 'src/view/view';
import { get } from 'svelte/store';

export const findSectionPosition = (view: MandalaView, nodeId: string) => {
    const lines = view.data.split('\n');
    const treeIndex = get(view.documentStore).sections.id_section[nodeId];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.startsWith('<!--')) {
            const section = parseHtmlCommentMarker(line);
            if (section && section[2] === treeIndex) {
                return i;
            }
        }
    }
};
