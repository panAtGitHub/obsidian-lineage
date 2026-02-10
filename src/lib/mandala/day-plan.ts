export const DAY_PLAN_FRONTMATTER_KEY = 'mandala_plan';

export const DAY_PLAN_DEFAULT_SLOT_TITLES = [
    '接收太阳的能量，开心一天',
    '09-12',
    '12-14',
    '14-16',
    '16-18',
    '18-19',
    '19-21',
    '睡觉准备',
] as const;

export const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
export const DAY_PLAN_H2_DATE_PATTERN = /^##\s+(\d{4}-\d{2}-\d{2})\s*$/;

export type DayPlanFrontmatter = {
    enabled: boolean;
    version: number;
    center_date_h2: string;
    slots: Record<string, string>;
};

const normalizeLineEndings = (content: string) => content.replace(/\r\n/g, '\n');

const splitLines = (content: string) => normalizeLineEndings(content).split('\n');

const firstNonEmptyLineIndex = (lines: string[]) =>
    lines.findIndex((line) => line.trim().length > 0);

export const isIsoDate = (value: string) => {
    if (!ISO_DATE_PATTERN.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() + 1 === month &&
        date.getUTCDate() === day
    );
};

export const buildCenterDateHeading = (date: string) => `## ${date}`;

export const extractDateFromCenterHeading = (heading: string) => {
    const match = DAY_PLAN_H2_DATE_PATTERN.exec(heading.trim());
    if (!match) return null;
    const date = match[1];
    if (!isIsoDate(date)) return null;
    return date;
};

export const normalizeSlotTitle = (value: string) =>
    value.replace(/^#{1,6}\s*/, '').trim();

export const buildSlotHeading = (title: string) =>
    `### ${normalizeSlotTitle(title)}`;

export const hasValidCenterDateHeading = (content: string) => {
    const lines = splitLines(content);
    const index = firstNonEmptyLineIndex(lines);
    if (index === -1) return false;
    return extractDateFromCenterHeading(lines[index]) !== null;
};

export const upsertCenterDateHeading = (content: string, date: string) => {
    const nextHeading = buildCenterDateHeading(date);
    const lines = splitLines(content);
    if (lines.length === 1 && lines[0] === '') {
        return nextHeading;
    }

    const firstContentLine = firstNonEmptyLineIndex(lines);
    if (firstContentLine === -1) {
        return nextHeading;
    }

    if (/^#{1,6}\s+/.test(lines[firstContentLine].trim())) {
        lines[firstContentLine] = nextHeading;
        return lines.join('\n').replace(/^\n+/, '');
    }

    return [nextHeading, ...lines].join('\n').replace(/^\n+/, '');
};

export const upsertSlotHeading = (content: string, title: string) => {
    const nextHeading = buildSlotHeading(title);
    const lines = splitLines(content);

    if (lines.length === 1 && lines[0] === '') {
        return nextHeading;
    }

    const firstContentLine = firstNonEmptyLineIndex(lines);
    if (firstContentLine === -1) {
        return nextHeading;
    }

    if (/^###\s+/.test(lines[firstContentLine].trim())) {
        lines[firstContentLine] = nextHeading;
        return lines.join('\n').replace(/^\n+/, '');
    }

    return [nextHeading, ...lines].join('\n').replace(/^\n+/, '');
};

export const toSlotsRecord = (slots: string[]) => {
    const record: Record<string, string> = {};
    for (let i = 0; i < 8; i += 1) {
        record[String(i + 1)] = normalizeSlotTitle(slots[i] ?? '');
    }
    return record;
};

export const slotsRecordToArray = (slots: Record<string, unknown> | null | undefined) => {
    const values: string[] = [];
    for (let i = 1; i <= 8; i += 1) {
        const raw = slots?.[String(i)];
        values.push(typeof raw === 'string' ? normalizeSlotTitle(raw) : '');
    }
    return values;
};

export const allSlotsFilled = (slots: string[]) =>
    slots.length === 8 && slots.every((slot) => normalizeSlotTitle(slot).length > 0);
