import { readable, type Readable } from 'svelte/store';
import { Platform } from 'obsidian';

export interface LayoutState {
    isPortrait: boolean;
    containerWidth: number;
    containerHeight: number;
    squareSize: number; // 当前容器下能容纳的最大正方形尺寸
}

/**
 * 监听屏幕方向及容器尺寸变化
 */
export function createLayoutStore(): Readable<LayoutState> {
    const initialState: LayoutState = {
        isPortrait: false,
        containerWidth: 0,
        containerHeight: 0,
        squareSize: 0
    };

    return readable(initialState, (set) => {
        const update = () => {
            const w = window.innerWidth;
            const h = window.innerHeight;

            // 判定竖屏逻辑：
            // 1. 显式处于手机竖屏模式
            // 2. 容器高度大于宽度（适配 iPad 分屏）
            const isPortrait = Platform.isMobile && (window.matchMedia('(orientation: portrait)').matches || w < h);

            set({
                isPortrait,
                containerWidth: w,
                containerHeight: h,
                squareSize: Math.min(w, h)
            });
        };

        // 初始化
        update();

        // 监听变化
        window.addEventListener('resize', update);
        const query = window.matchMedia('(orientation: portrait)');
        query.addEventListener('change', update);

        return () => {
            window.removeEventListener('resize', update);
            query.removeEventListener('change', update);
        };
    });
}
