const htmlCommentRegex = /\s*<!--\s*section:\s*((\d\.?)*(\d))[\w\s]*-->/;
export const parseHtmlCommentMarker = (line: string) => {
    const results = htmlCommentRegex.exec(line);
    if (results) {
        const result = results[1];
        const split = result.split('.');
        const index = split[split.length - 1];
        const parent = result.substring(0, result.length - index.length - 1);
        return [parent, index, result];
    }
};
