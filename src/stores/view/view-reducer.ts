import { ViewState } from 'src/stores/view/view-state-type';
import { ViewStoreAction } from 'src/stores/view/view-store-actions';
import { setSearchQuery } from 'src/stores/view/reducers/search/set-search-query';
import { setSearchResults } from 'src/stores/view/reducers/search/set-search-results';
import { toggleSearchInput } from 'src/stores/view/reducers/search/toggle-search-input';
import { enableEditMode } from 'src/stores/view/reducers/document/enable-edit-mode';
import { disableEditMode } from 'src/stores/view/reducers/document/disable-edit-mode';
import { onDragStart } from 'src/stores/view/reducers/document/on-drag-start';
import { onDragEnd } from 'src/stores/view/reducers/document/on-drag-end';
import { updateActiveBranch } from 'src/stores/view/reducers/document/helpers/update-active-branch';
import { updateActiveNode } from 'src/stores/view/reducers/document/helpers/update-active-node';
import { navigateUsingKeyboard } from 'src/stores/view/reducers/document/navigate-using-keyboard';
import { navigateActiveNodeHistory } from 'src/stores/view/reducers/ui/navigate-active-node-history';
import { jumpToNode } from 'src/stores/view/reducers/document/jump-to-node';

import { removeDeletedNavigationItems } from 'src/stores/view/reducers/ui/helpers/remove-deleted-navigation-items';
import { toggleFuzzySearch } from 'src/stores/view/reducers/search/toggle-fuzzy-search';
import { resetSelectionState } from 'src/stores/view/reducers/document/helpers/reset-selection-state';
import { navigateActiveNode } from 'src/stores/view/reducers/ui/navigate-active-node';
import { setActivePinnedNode } from 'src/stores/view/reducers/pinned-cards/set-active-pinned-node';
import { setActiveRecentNode } from 'src/stores/view/reducers/recent-nodes/set-active-recent-node';
import { toggleShowAllNodes } from 'src/stores/view/reducers/search/toggle-show-all-nodes';
import { resetPendingConfirmation } from 'src/stores/view/reducers/document/reset-pending-confirmation';
import { toggleCollapseNode } from 'src/stores/view/reducers/outline/toggle-collapse-node';
import { refreshCollapsedNodes } from 'src/stores/view/reducers/outline/refresh-collapsed-nodes';
import { toggleCollapseAllNodes } from 'src/stores/view/reducers/outline/toggle-collapse-all-nodes';
import { collapseNode } from 'src/stores/view/reducers/outline/helpers/collapse-node';
import { expandParentsOfActiveNode } from 'src/stores/view/reducers/outline/expand-parents-of-active-node';
import { LineageDocument } from 'src/stores/document/document-state-type';
import { selectAllNodes } from 'src/stores/view/reducers/selection/select-all-nodes';

const updateDocumentState = (
    state: ViewState,
    action: ViewStoreAction,
    context: LineageDocument,
) => {
    const activeNode = state.document.activeNode;
    if (
        action.type === 'view/set-active-node/mouse' ||
        action.type === 'view/set-active-node/mouse-silent' ||
        action.type === 'view/set-active-node/document' ||
        action.type === 'view/set-active-node/search'
    ) {
        updateActiveNode(state.document, action.payload.id, state);
        if (!state.document.selectedNodes.has(state.document.activeNode))
            resetSelectionState(state.document);
    } else if (action.type === 'DOCUMENT/NAVIGATE_USING_KEYBOARD') {
        navigateUsingKeyboard(state.document, state, action, context.columns);
    } else if (action.type === 'SEARCH/SET_QUERY') {
        setSearchQuery(state, action.payload.query);
    } else if (action.type === 'SEARCH/SET_RESULTS') {
        setSearchResults(state, action.payload.results);
    } else if (action.type === 'SEARCH/TOGGLE_INPUT') {
        toggleSearchInput(state);
    } else if (action.type === 'UI/TOGGLE_HISTORY_SIDEBAR') {
        const showHistorySidebar = state.ui.controls.showHistorySidebar;
        state.ui.controls = {
            showHistorySidebar: !showHistorySidebar,
            showHelpSidebar: false,
            showSettingsSidebar: false,
            showStyleRulesModal: false,
        };
    } else if (action.type === 'UI/TOGGLE_HELP_SIDEBAR') {
        const showHelpSidebar = state.ui.controls.showHelpSidebar;
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: !showHelpSidebar,
            showSettingsSidebar: false,
            showStyleRulesModal: false,
        };
    } else if (action.type === 'UI/TOGGLE_SETTINGS_SIDEBAR') {
        const showSettingsSidebar = state.ui.controls.showSettingsSidebar;
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: false,
            showSettingsSidebar: !showSettingsSidebar,
            showStyleRulesModal: false,
        };
    } else if (action.type === 'CLOSE_MODALS') {
        state.ui.controls = {
            showHistorySidebar: false,
            showHelpSidebar: action.payload?.closeAllModals
                ? false
                : state.ui.controls.showHelpSidebar,
            showSettingsSidebar: false,
            showStyleRulesModal: false,
        };
    } else if (action.type === 'view/main/enable-edit') {
        if (state.document.activeNode !== action.payload.nodeId) {
            updateActiveNode(state.document, action.payload.nodeId, state);
        }
        enableEditMode(state.document, action.payload.nodeId);
    } else if (action.type === 'view/sidebar/enable-edit') {
        if (action.context.activeSidebarTab === 'pinned-cards') {
            if (state.pinnedNodes.activeNode !== action.payload.id) {
                setActivePinnedNode(
                    state.document,
                    state.pinnedNodes,
                    action.payload.id,
                );
            }
        } else if (action.context.activeSidebarTab === 'recent-cards') {
            if (state.recentNodes.activeNode !== action.payload.id) {
                setActiveRecentNode(
                    state.document,
                    state.recentNodes,
                    action.payload.id,
                );
            }
        }
        enableEditMode(state.document, action.payload.id, true);
    } else if (action.type === 'view/confirmation/reset/disable-edit') {
        resetPendingConfirmation(state.document);
    } else if (action.type === 'view/confirmation/reset/delete-node') {
        resetPendingConfirmation(state.document);
    } else if (action.type === 'view/confirmation/confirm/delete-node') {
        state.document.pendingConfirmation = {
            ...state.document.pendingConfirmation,
            deleteNode:
                action.payload.includeSelection &&
                state.document.selectedNodes.size > 1
                    ? new Set(state.document.selectedNodes)
                    : new Set([action.payload.id]),
        };
    } else if (action.type === 'view/confirmation/confirm/disable-edit') {
        state.document.pendingConfirmation = {
            ...state.document.pendingConfirmation,
            disableEdit: action.payload.id,
        };
    } else if (
        action.type === 'view/main/disable-edit' ||
        action.type === 'view/sidebar/disable-edit'
    ) {
        disableEditMode(state.document);
    } else if (action.type === 'SET_DRAG_STARTED') {
        onDragStart(state.document, action);
    } else if (action.type === 'DOCUMENT/SET_DRAG_ENDED') {
        onDragEnd(state.document);
    } else if (action.type === 'view/update-active-branch?source=document') {
        updateActiveBranch(state.document, context.columns, true);
    } else if (action.type === 'NAVIGATION/NAVIGATE_FORWARD') {
        navigateActiveNodeHistory(state.document, state, true);
    } else if (action.type === 'NAVIGATION/NAVIGATE_BACK') {
        navigateActiveNodeHistory(state.document, state);
    } else if (action.type === 'DOCUMENT/JUMP_TO_NODE') {
        jumpToNode(state.document, state, action, context.columns);
    } else if (action.type === 'NAVIGATION/REMOVE_OBSOLETE') {
        removeDeletedNavigationItems(state, action.payload.content);
    } else if (action.type === 'SEARCH/TOGGLE_FUZZY_MODE') {
        toggleFuzzySearch(state);
    } else if (action.type === 'DOCUMENT/CLEAR_SELECTION') {
        resetSelectionState(state.document);
    } else if (action.type === 'view/selection/select-all') {
        selectAllNodes(state.document, context.columns);
    } else if (action.type === 'NAVIGATION/SELECT_NEXT_NODE') {
        navigateActiveNode(state.document, state, action);
    } else if (action.type === 'view/pinned-nodes/set-active-node') {
        setActivePinnedNode(
            state.document,
            state.pinnedNodes,
            action.payload.id,
        );
    } else if (action.type === 'view/recent-nodes/set-active-node') {
        setActiveRecentNode(
            state.document,
            state.recentNodes,
            action.payload.id,
        );
    } else if (action.type === 'search/toggle-show-all-nodes') {
        toggleShowAllNodes(state);
    } else if (action.type === 'view/modals/toggle-style-rules') {
        const showStyleRulesModal = state.ui.controls.showStyleRulesModal;
        state.ui.controls = {
            showHistorySidebar: false,
            showStyleRulesModal: !showStyleRulesModal,
            showSettingsSidebar: false,
            showHelpSidebar: false,
        };
    } else if (action.type === 'view/style-rules/update-results') {
        if (!action.payload.results) {
            state.styleRules.nodeStyles = new Map();
            state.styleRules.allMatches = new Map();
        } else {
            state.styleRules.nodeStyles = action.payload.results.nodeStyles;
            state.styleRules.allMatches = action.payload.results.allMatches;
        }
    } else if (action.type === 'view/keyboard/shift/up') {
        state.keyboard.shift = false;
        state.keyboard = { ...state.keyboard };
    } else if (action.type === 'view/keyboard/shift/down') {
        state.keyboard.shift = true;
        state.keyboard = { ...state.keyboard };
    } else if (action.type === 'view/hotkeys/set-search-term') {
        state.hotkeys.searchTerm = action.payload.searchTerm.toLowerCase();
    } else if (action.type === 'view/hotkeys/update-conflicts') {
        state.hotkeys.conflictingHotkeys = action.payload.conflicts;
    } else if (action.type === 'view/outline/toggle-collapse-node') {
        toggleCollapseNode(state, context.columns, action.payload.id);
    } else if (action.type === 'view/outline/refresh-collapsed-nodes') {
        refreshCollapsedNodes(state, context.columns);
    } else if (action.type === 'view/outline/toggle-collapse-all') {
        toggleCollapseAllNodes(state, context.columns);
    } else if (action.type === 'view/selection/set-selection') {
        state.document.selectedNodes = new Set(action.payload.ids);
    } else if (
        action.type === 'view/persisted-state/load-persisted-collapsed-parents'
    ) {
        for (const id of action.payload.collapsedIds) {
            collapseNode(state, context.columns, id);
        }
        expandParentsOfActiveNode(state, context.columns);
        state.outline = { ...state.outline };
    }
    if (activeNode !== state.document.activeNode) {
        updateActiveBranch(state.document, context.columns, false);
        expandParentsOfActiveNode(state, context.columns);
    }
};
export const viewReducer = (
    store: ViewState,
    action: ViewStoreAction,
    context: LineageDocument,
): ViewState => {
    updateDocumentState(store, action, context);
    return store;
};
