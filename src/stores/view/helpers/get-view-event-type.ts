import { ViewStoreAction } from 'src/stores/view/view-store-actions';

type ActionType = ViewStoreAction['type'];
const navigationEvents = new Set<ActionType>([
    'NAVIGATION/NAVIGATE_BACK',
    'NAVIGATION/NAVIGATE_FORWARD',
    'NAVIGATION/SELECT_NEXT_NODE',
]);

const searchEvents = new Set<ActionType>([
    'SEARCH/SET_QUERY',
    'SEARCH/SET_RESULTS',
    'SEARCH/TOGGLE_INPUT',
]);

const stateEvents = new Set<ActionType>([
    'view/set-active-node/document',
    'view/set-active-node/mouse',
    'view/set-active-node/mouse-silent',
    'view/set-active-node/search',
    'DOCUMENT/NAVIGATE_USING_KEYBOARD',
    'DOCUMENT/JUMP_TO_NODE',
    'view/selection/select-all',
]);

const editMainSplitEvents = new Set<ActionType>([
    'view/main/enable-edit',
    'view/main/disable-edit',
]);
const editSidebarEvents = new Set<ActionType>([
    'view/sidebar/enable-edit',
    'view/sidebar/disable-edit',
]);

export type ViewEventType = {
    activeNodeHistory?: boolean;
    activeNode?: boolean;
    search?: boolean;
    editMainSplit?: boolean;
    editSidebar?: boolean;
};
const cachedResults: { [key: string]: ViewEventType } = {};

export const getViewEventType = (type: ActionType): ViewEventType => {
    if (cachedResults[type]) {
        return cachedResults[type];
    }

    let result: ViewEventType | null = null;

    if (navigationEvents.has(type)) result = { activeNodeHistory: true };
    else if (stateEvents.has(type)) result = { activeNode: true };
    else if (searchEvents.has(type)) result = { search: true };
    else if (editMainSplitEvents.has(type)) result = { editMainSplit: true };
    else if (editSidebarEvents.has(type)) result = { editSidebar: true };
    if (!result) result = {};

    cachedResults[type] = result;

    return result;
};
