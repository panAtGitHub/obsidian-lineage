import MandalaGrid from 'src/main';

export const getActiveFile = (plugin: MandalaGrid) => {
    const activeFile = plugin.app.workspace.getActiveFile();
    if (activeFile && activeFile.extension === 'md') return activeFile;
};
