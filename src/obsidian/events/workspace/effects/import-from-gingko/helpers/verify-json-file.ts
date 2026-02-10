export const verifyJsonFile = (tree: unknown[]) => {
    for (const treeNode of tree) {
        if (!treeNode) return false;
        if (typeof treeNode !== 'object') return false;
        if (!('content' in treeNode)) return false;
        if (!('children' in treeNode)) return false;
        if (typeof treeNode.content !== 'string') return false;
        if (!Array.isArray(treeNode.children)) return false;
        if (!verifyJsonFile(treeNode.children)) return false;
    }
    return true;
};
