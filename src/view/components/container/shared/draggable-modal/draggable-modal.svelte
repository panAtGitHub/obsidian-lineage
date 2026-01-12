<script lang="ts">
    import { getView } from 'src/view/components/container/context';

    let modal: HTMLElement;
    let startX: number;
    let startY: number;
    let modalX = 0;
    let modalY = 0;
    let isDragging = false;
    const view = getView();
    const container = view.contentEl;

    const startDrag = (event: MouseEvent) => {
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;

        const computedStyle = getComputedStyle(modal);
        const transform = computedStyle.transform;

        if (transform && transform !== 'none') {
            const matrix = transform.match(/matrix.*\((.+)\)/);
            if (matrix) {
                const [x, y] = matrix[1].split(', ').slice(4, 6).map(Number);
                modalX = x || 0;
                modalY = y || 0;
            }
        }

        container.addEventListener('mousemove', onDrag);
        container.addEventListener('mouseup', stopDrag);
    };

    const onDrag = (event: MouseEvent) => {
        if (!isDragging) return;

        modalX += event.clientX - startX;
        modalY += event.clientY - startY;

        startX = event.clientX;
        startY = event.clientY;

        modal.style.transform = `translate(${modalX}px, ${modalY}px)`;
    };

    const stopDrag = () => {
        isDragging = false;
        container.removeEventListener('mousemove', onDrag);
        container.removeEventListener('mouseup', stopDrag);
    };
</script>

<div
    class="mandala-modal"
    bind:this={modal}
    style="transform: translate(0px, 0px);"
>
    <div class="drag-handle" on:mousedown={startDrag}></div>
    <slot />
</div>

<style>
    .drag-handle {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 8px;
        cursor: grab;
        background-color: transparent;
        z-index: 1;
    }
    .mandala-modal:hover .drag-handle {
        background-size: 2px 4px;
        background-image: linear-gradient(
            0deg,
            hsla(0, 0%, 60%, 0.35) 20%,
            transparent 40%
        );
    }

    .drag-handle:active {
        cursor: grabbing;
    }
</style>
