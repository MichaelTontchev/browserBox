import { renderBlock } from './Main';
import { Block } from './Block';
import { canvas, canvasHeight } from './Space';

export class Designer {
    private static readonly newMapBlocksDisplay = document.getElementById('newMapBlocks') || new HTMLElement();

    private static newBlocks: Block[] = [];

    public static setup() {
        canvas.addEventListener('click', function (e) {
            const newBlock = new Block(
                e.clientX - (canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft),
                canvasHeight - (e.clientY - (canvas.offsetTop - canvas.scrollTop + canvas.clientTop)),
                "brown");

            renderBlock(newBlock);
            Designer.newBlocks.push(newBlock);

            Designer.newMapBlocksDisplay.innerText = Designer.newBlocks.map((block) => {
                return "new Block(" + block.x + ", " + block.y + ", " + block.color + "),";
            }).join('\n');
        });
    }
}

