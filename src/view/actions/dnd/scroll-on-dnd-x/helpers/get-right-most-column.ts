import { DND_ACTIVE_CLASS } from 'src/view/actions/dnd/draggable';

export const getRightMostColumn = (
    container: HTMLElement,
    direction: number,
) => {
    return direction === 1
        ? (Array.from(container.querySelectorAll('.column'))
              .reverse()
              .find(
                  (x) =>
                      x.querySelectorAll(
                          `.mandala-card:not(.${DND_ACTIVE_CLASS})`,
                      ).length > 0,
              ) as HTMLElement)
        : null;
};
