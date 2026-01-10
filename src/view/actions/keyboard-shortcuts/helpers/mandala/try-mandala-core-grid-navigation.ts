import { LineageView } from 'src/view/view';
import { AllDirections } from 'src/stores/document/document-store-actions';

const coreGrid = [
    ['2', '3', '4'],
    ['5', '1', '6'],
    ['7', '8', '9'],
] as const;

const themeGrid = [
    ['1', '2', '3'],
    ['4', null, '5'],
    ['6', '7', '8'],
] as const;

const positions: Record<string, { row: number; col: number } | undefined> = {
    '1': { row: 1, col: 1 },
    '2': { row: 0, col: 0 },
    '3': { row: 0, col: 1 },
    '4': { row: 0, col: 2 },
    '5': { row: 1, col: 0 },
    '6': { row: 1, col: 2 },
    '7': { row: 2, col: 0 },
    '8': { row: 2, col: 1 },
    '9': { row: 2, col: 2 },
};

const deltas: Record<AllDirections, { dr: number; dc: number }> = {
    up: { dr: -1, dc: 0 },
    down: { dr: 1, dc: 0 },
    left: { dr: 0, dc: -1 },
    right: { dr: 0, dc: 1 },
};

const themeSlotPositions: Record<string, { row: number; col: number } | undefined> =
    {
        '1': { row: 0, col: 0 },
        '2': { row: 0, col: 1 },
        '3': { row: 0, col: 2 },
        '4': { row: 1, col: 0 },
        '5': { row: 1, col: 2 },
        '6': { row: 2, col: 0 },
        '7': { row: 2, col: 1 },
        '8': { row: 2, col: 2 },
    };

export const tryMandalaCoreGridNavigation = (
    view: LineageView,
    direction: AllDirections,
    options?: { extendSelection?: boolean },
) => {
    const docState = view.documentStore.getValue();
    if (!docState.meta.isMandala) return false;

    const activeNodeId = view.viewStore.getValue().document.activeNode;
    const activeSection = docState.sections.id_section[activeNodeId];
    if (!activeSection) return false;

    const pos = positions[activeSection];
    const { dr, dc } = deltas[direction];

    let nextSection: string | null = null;

    if (view.mandalaMode === '3x3') {
        if (activeSection.includes('.')) return false;
        if (!pos) return false;
        const nextRow = pos.row + dr;
        const nextCol = pos.col + dc;
        nextSection = coreGrid[nextRow]?.[nextCol] ?? null;
    } else if (view.mandalaMode === '9x9') {
        if (activeSection === '1') {
            if (!pos) return false;
            const nextRow = pos.row + dr;
            const nextCol = pos.col + dc;
            nextSection = coreGrid[nextRow]?.[nextCol] ?? null;
        } else if (activeSection.includes('.')) {
            const [theme, slot] = activeSection.split('.');
            const slotPos = themeSlotPositions[slot];
            if (!slotPos) return false;
            const nextRow = slotPos.row + dr;
            const nextCol = slotPos.col + dc;
            if (nextRow < 0 || nextRow > 2 || nextCol < 0 || nextCol > 2) {
                nextSection = null;
            } else if (nextRow === 1 && nextCol === 1) {
                nextSection = theme;
            } else {
                const nextSlot = themeGrid[nextRow]?.[nextCol];
                nextSection = nextSlot ? `${theme}.${nextSlot}` : null;
            }
        } else {
            // 2..9：在 9×9 模式下当作“主题子九宫”的中心格来导航
            const theme = activeSection;
            const nextRow = 1 + dr;
            const nextCol = 1 + dc;
            if (nextRow < 0 || nextRow > 2 || nextCol < 0 || nextCol > 2) {
                nextSection = null;
            } else if (nextRow === 1 && nextCol === 1) {
                nextSection = theme;
            } else {
                const nextSlot = themeGrid[nextRow]?.[nextCol];
                nextSection = nextSlot ? `${theme}.${nextSlot}` : null;
            }
        }
    } else {
        return false;
    }

    if (!nextSection) return true;

    const nextNodeId = docState.sections.section_id[nextSection];
    if (!nextNodeId) return true;
    if (nextNodeId === activeNodeId) return true;

    if (options?.extendSelection) {
        const selected = new Set(view.viewStore.getValue().document.selectedNodes);
        selected.add(activeNodeId);
        selected.add(nextNodeId);
        view.viewStore.dispatch({
            type: 'view/selection/set-selection',
            payload: { ids: Array.from(selected) },
        });
    }

    view.viewStore.dispatch({
        type: 'view/set-active-node/mouse-silent',
        payload: { id: nextNodeId },
    });
    return true;
};
