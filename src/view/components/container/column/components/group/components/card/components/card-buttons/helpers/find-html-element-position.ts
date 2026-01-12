import { parseHtmlElementMarker } from 'src/lib/data-conversion/helpers/html-element-marker/parse-html-element-marker';
import { MandalaView } from 'src/view/view';
import { get } from 'svelte/store';

export const findHtmlElementPosition = (view: MandalaView, nodeId: string) => {
    const lines = view.data.split('\n');
    const treeIndex = get(view.documentStore).sections.id_section[nodeId];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.includes('<span data-section=')) {
            const section = parseHtmlElementMarker(line);
            if (section && section[2] === treeIndex) {
                return i;
            }
        }
    }
};
