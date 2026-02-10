import {
    addDaysIsoDate,
    allSlotsFilled,
    extractDateFromCenterHeading,
    hasValidCenterDateHeading,
    isIsoDate,
    normalizeSlotTitle,
    toSlotsRecord,
    upsertCenterDateHeading,
    upsertSlotHeading,
} from 'src/lib/mandala/day-plan';
import { describe, expect, it } from 'vitest';

describe('day-plan helpers', () => {
    it('validates iso date correctly', () => {
        expect(isIsoDate('2026-02-10')).toBe(true);
        expect(isIsoDate('2026-02-30')).toBe(false);
        expect(isIsoDate('2026/02/10')).toBe(false);
    });

    it('adds days for iso date', () => {
        expect(addDaysIsoDate('2026-02-10', 1)).toBe('2026-02-11');
        expect(addDaysIsoDate('2026-12-31', 1)).toBe('2027-01-01');
    });

    it('extracts date from H2 heading only', () => {
        expect(extractDateFromCenterHeading('## 2026-02-10')).toBe('2026-02-10');
        expect(extractDateFromCenterHeading('2026-02-10')).toBeNull();
        expect(extractDateFromCenterHeading('### 2026-02-10')).toBeNull();
    });

    it('checks section center heading validity', () => {
        expect(hasValidCenterDateHeading('## 2026-02-10\ntext')).toBe(true);
        expect(hasValidCenterDateHeading('### 2026-02-10\ntext')).toBe(false);
        expect(hasValidCenterDateHeading('')).toBe(false);
    });

    it('upserts center heading and keeps body', () => {
        expect(upsertCenterDateHeading('plain body', '2026-02-10')).toBe(
            '## 2026-02-10\nplain body',
        );

        expect(
            upsertCenterDateHeading('## 2025-01-01\nbody', '2026-02-10'),
        ).toBe('## 2026-02-10\nbody');
    });

    it('upserts slot heading and keeps body', () => {
        expect(upsertSlotHeading('body', '09-12')).toBe('### 09-12\nbody');
        expect(upsertSlotHeading('### old\nbody', '12-14')).toBe(
            '### 12-14\nbody',
        );
    });

    it('normalizes slot titles and checks filled state', () => {
        expect(normalizeSlotTitle('### 19-21')).toBe('19-21');
        expect(
            allSlotsFilled(['1', '2', '3', '4', '5', '6', '7', '8']),
        ).toBe(true);
        expect(
            allSlotsFilled(['1', '2', '3', '4', '5', '6', '7', '']),
        ).toBe(false);
    });

    it('converts slot array to record', () => {
        expect(toSlotsRecord(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])).toEqual({
            '1': 'a',
            '2': 'b',
            '3': 'c',
            '4': 'd',
            '5': 'e',
            '6': 'f',
            '7': 'g',
            '8': 'h',
        });
    });
});
