import { MandalaView } from 'src/view/view';
import { Platform } from 'obsidian';
import { get } from 'svelte/store';
import { onLongPress } from 'src/helpers/on-long-press';
import { showNodeContextMenu } from 'src/view/actions/context-menu/card-context-menu/show-node-context-menu';
import { shouldShowNodeContextMenu } from 'src/view/actions/context-menu/card-context-menu/should-show-node-context-menu';
import { shouldShowViewContextMenu } from 'src/view/actions/context-menu/view-context-menu/should-show-view-context-menu';
import { showViewContextMenu } from 'src/view/actions/context-menu/view-context-menu/show-view-context-menu';
import { enterSubgridForNode } from 'src/view/helpers/mandala/mobile-navigation';
import { mobileInteractionMode } from 'src/stores/view/mobile-interaction-store';

const RIGHT_DOUBLE_CLICK_WINDOW_MS = 250;

export const showContextMenu = (element: HTMLElement, view: MandalaView) => {
    let rightClickTimer: ReturnType<typeof setTimeout> | null = null;
    let lastRightClickAt = 0;
    let lastRightClickNodeId: string | null = null;

    const listener = (e: MouseEvent | TouchEvent) => {
        if (shouldShowNodeContextMenu(e)) {
            if (e.instanceOf(MouseEvent)) {
                const target = e.target as HTMLElement;
                const cardEl = target.closest('.mandala-card') as HTMLElement | null;
                const nodeId = cardEl?.id ?? null;
                const isLocked = get(mobileInteractionMode) === 'locked';
                const docState = view.documentStore.getValue();
                const section = nodeId
                    ? docState.sections.id_section[nodeId]
                    : null;
                const theme =
                    view.viewStore.getValue().ui.mandala.subgridTheme ?? '1';
                const isCoreCenter =
                    view.mandalaMode === '3x3' &&
                    isLocked &&
                    Boolean(section && section === theme && !section.includes('.'));

                if (isCoreCenter && nodeId) {
                    e.preventDefault();
                    e.stopPropagation();

                    const now = Date.now();
                    const isDouble =
                        lastRightClickNodeId === nodeId &&
                        now - lastRightClickAt <= RIGHT_DOUBLE_CLICK_WINDOW_MS;

                    lastRightClickAt = now;
                    lastRightClickNodeId = nodeId;

                    if (isDouble) {
                        if (rightClickTimer) {
                            clearTimeout(rightClickTimer);
                            rightClickTimer = null;
                        }
                        lastRightClickNodeId = null;
                        enterSubgridForNode(view, nodeId);
                        return;
                    }

                    if (rightClickTimer) {
                        clearTimeout(rightClickTimer);
                    }
                    rightClickTimer = setTimeout(() => {
                        rightClickTimer = null;
                        if (lastRightClickNodeId === nodeId) {
                            showNodeContextMenu(e, view);
                        }
                    }, RIGHT_DOUBLE_CLICK_WINDOW_MS);
                    return;
                }

                showNodeContextMenu(e, view);
            } else showNodeContextMenu(new MouseEvent('contextmenu', e), view);
        } else if (shouldShowViewContextMenu(e)) {
            if (e.instanceOf(MouseEvent)) showViewContextMenu(e, view);
            else showViewContextMenu(new MouseEvent('contextmenu', e), view);
        }
    };
    element.addEventListener('contextmenu', listener);

    let unsubFromLongPress: (() => void) | null = null;
    if (Platform.isMobile) {
        unsubFromLongPress = onLongPress(
            element,
            listener,
            shouldShowNodeContextMenu,
        );
    }
    return {
        destroy: () => {
            element.removeEventListener('contextmenu', listener);
            if (unsubFromLongPress) {
                unsubFromLongPress();
            }
        },
    };
};
