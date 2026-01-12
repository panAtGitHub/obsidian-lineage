import { MandalaGridDocument } from 'src/stores/document/document-state-type';
import { MandalaGridDocumentFormat } from 'src/stores/settings/settings-type';
import { columnsToJson } from 'src/lib/data-conversion/x-to-json/columns-to-json';
import { jsonToHtmlComment } from 'src/lib/data-conversion/json-to-x/json-to-html-comment';
import { jsonToOutline } from 'src/lib/data-conversion/json-to-x/json-to-outline';
import { jsonToHtmlElement } from 'src/lib/data-conversion/json-to-x/json-to-html-element';

export const stringifyDocument = (
    document: MandalaGridDocument,
    format: MandalaGridDocumentFormat,
) => {
    const json = columnsToJson(document.columns, document.content);
    if (format === 'outline') {
        return jsonToOutline(json);
    } else if (format === 'html-element') {
        return jsonToHtmlElement(json);
    } else {
        return jsonToHtmlComment(json);
    }
};
