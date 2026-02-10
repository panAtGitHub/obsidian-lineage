import { _electron as electron } from 'playwright-core';
import { Page } from '@playwright/test';
import { delay } from '../../general/delay';

export const __test_notice__ = async (text: string) => {
    if (!__obsidian__) return;
    await __obsidian__.evaluate((message) => {
        const scope = window as Window & {
            Notice?: new (noticeText: string) => unknown;
        };
        if (scope.Notice) {
            new scope.Notice(message);
        }
    }, text);
};
export let __obsidian__: Page;
export const loadObsidian = async () => {
    if (!__obsidian__) {
        // works with 1.4.16 Obsidian installer
        const electronApp = await electron.launch({
            executablePath: process.env.OBSIDIAN_EXECUTABLE_PATH,
        });
        __obsidian__ = await electronApp.firstWindow();
    }
};

export const closeObsidian = async () => {
    if (__obsidian__) {
        await __obsidian__.close();
        __obsidian__ = undefined as never;
        await delay(1000);
    }
};
