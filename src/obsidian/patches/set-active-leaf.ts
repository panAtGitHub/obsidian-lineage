import { Workspace, WorkspaceLeaf } from 'obsidian';
import { MandalaView } from 'src/view/view';

type SetActiveLeafArgs =
    | [WorkspaceLeaf, { focus?: boolean; reveal?: boolean; state?: unknown }?]
    | [WorkspaceLeaf, boolean, boolean];

export function setActiveLeaf(
    next: (this: Workspace, ...args: SetActiveLeafArgs) => unknown,
) {
    return function (this: Workspace, ...args: SetActiveLeafArgs) {
        const leaf = args[0];
        const isMandalaViewAndIsEditing =
            leaf.view &&
            leaf.view instanceof MandalaView &&
            leaf.view.inlineEditor?.nodeId;
        if (isMandalaViewAndIsEditing) return;
        next.call(this, ...args);
    };
}
