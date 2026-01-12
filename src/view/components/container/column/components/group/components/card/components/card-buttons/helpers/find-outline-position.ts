import { MandalaView } from 'src/view/view';
import { clone } from 'src/helpers/clone';
import { nanoid } from 'nanoid';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-x/json-to-outline';
import { columnsToJson } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { extractFrontmatter } from 'src/view/helpers/extract-frontmatter';

export const findOutlinePosition = (view: MandalaView, nodeId: string) => {
    const documentStore = view.documentStore;
    const document = clone(documentStore.getValue().document);
    const id = nanoid(12);
    document.content[nodeId].content = id;
    const outline = jsonToOutline(
        columnsToJson(document.columns, document.content),
    );
    const { frontmatter } = extractFrontmatter(view.data);
    const frontmatterOffset = frontmatter.length
        ? frontmatter.split('\n').length - 1
        : 0;
    const lines = outline.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.contains(id)) {
            return i + frontmatterOffset;
        }
    }
};
