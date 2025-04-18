import { level } from 'src/lib/data-conversion/helpers/html-comment-marker/create-html-comment-marker';

export const collapsedSpanMarker = (parentNumber: string, index: number) =>
    `<span data-section="${level(parentNumber, index)}"/>`;

export const expandedSpanMarker = (parentNumber: string, index: number) =>
    `<span data-section="${level(parentNumber, index)}"></span>`;
