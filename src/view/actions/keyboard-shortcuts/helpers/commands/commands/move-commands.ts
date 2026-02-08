import { moveNode } from 'src/view/actions/keyboard-shortcuts/helpers/commands/commands/helpers/move-node';
import { DefaultViewCommand } from 'src/view/actions/keyboard-shortcuts/helpers/commands/default-view-hotkeys';

export const moveCommands = () => {
    return [
        {
            name: 'move_node_up',
            callback: (view) => {
                void moveNode(view, 'up');
            },
            hotkeys: [
                { key: 'K', modifiers: ['Alt', 'Shift'], editorState: 'both' },
                {
                    key: 'ArrowUp',
                    modifiers: ['Alt', 'Shift'],
                    editorState: 'both',
                },
            ],
        },
        {
            name: 'move_node_down',
            callback: (view) => {
                void moveNode(view, 'down');
            },
            hotkeys: [
                { key: 'J', modifiers: ['Alt', 'Shift'], editorState: 'both' },
                {
                    key: 'ArrowDown',
                    modifiers: ['Alt', 'Shift'],
                    editorState: 'both',
                },
            ],
        },
        {
            name: 'move_node_right',
            callback: (view) => {
                void moveNode(view, 'right');
            },
            hotkeys: [
                { key: 'L', modifiers: ['Alt', 'Shift'], editorState: 'both' },
                {
                    key: 'ArrowRight',
                    modifiers: ['Alt', 'Shift'],
                    editorState: 'both',
                },
            ],
        },
        {
            name: 'move_node_left',
            callback: (view) => {
                void moveNode(view, 'left');
            },
            hotkeys: [
                { key: 'H', modifiers: ['Alt', 'Shift'], editorState: 'both' },
                {
                    key: 'ArrowLeft',
                    modifiers: ['Alt', 'Shift'],
                    editorState: 'both',
                },
            ],
        },
    ] satisfies DefaultViewCommand[];
};
