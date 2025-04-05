import { LineageView } from 'src/view/view';
import Lineage from 'src/main';
import { statusBarWorker } from 'src/workers/worker-instances';

export class StatusBar {
    private container: HTMLElement;
    private elements: {
        numberOfCards: HTMLElement;
        documentProgress: HTMLElement;
        // numberOfChildren: HTMLElement;
    };

    constructor(public plugin: Lineage) {
        this.onload();
    }

    onload() {
        this.container = this.plugin.addStatusBarItem();
        this.elements = {
            numberOfCards: this.container.createDiv(),
            // numberOfChildren: this.container.createDiv(),
            documentProgress: this.container.createDiv(),
        };
        this.elements.numberOfCards.style.marginRight = '5px';
        // this.elements.numberOfChildren.style.marginRight = '5px';
        this.elements.documentProgress.ariaLabel =
            'Progress through the document';
        // this.elements.numberOfChildren.ariaLabel =
        //     'Total number of subsections';
        this.plugin.registerEvent(
            this.plugin.app.workspace.on('active-leaf-change', (x) => {
                const visible = Boolean(x && x.view instanceof LineageView);
                this.setVisibility(visible);
            }),
        );
    }

    private setVisibility(visible: boolean) {
        this.container.toggleClass('lineage__hidden-element', !visible);
    }
    private setElementVisibility(element: HTMLElement, visible: boolean) {
        element.toggleClass('lineage__hidden-element', !visible);
    }

    updateAll = (view: LineageView) => {
        this.updateCardsNumber(view);
        this.updateProgressIndicatorAndChildCount(view);
    };

    updateCardsNumber = (view: LineageView) => {
        const cards = Object.keys(
            view.documentStore.getValue().document.content,
        ).length;
        this.elements.numberOfCards.setText(
            cards + ' section' + (cards === 1 ? '' : 's'),
        );
    };
    updateProgressIndicatorAndChildCount = async (view: LineageView) => {
        const document = view.documentStore.getValue().document;
        const activeNode = view.viewStore.getValue().document.activeNode;
        const result = await statusBarWorker.run({
            document,
            activeNode,
        });
        this.elements.documentProgress.setText(result.progress + ' %');
        /* const totalChildCount = result.totalChildCount;
         if (totalChildCount > 0) {
             this.elements.numberOfChildren.setText(
                 totalChildCount +
                     ' subsection' +
                     (totalChildCount === 1 ? '' : 's'),
             );
             this.setElementVisibility(this.elements.numberOfChildren, true);
         } else {
             this.setElementVisibility(this.elements.numberOfChildren, false);
         }*/
    };
}
