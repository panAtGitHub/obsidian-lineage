import { MandalaView } from 'src/view/view';

export const isEditing = (view: MandalaView) => {
    return !!view.viewStore.getValue().document.editing.activeNodeId;
};
export const isActive = (view: MandalaView) => {
    return !!view.viewStore.getValue().document.activeNode;
};
export const isNotEditing = (view: MandalaView) => {
    return !isEditing(view);
};
