import { renderBlock } from './Main';
import { Block } from './Block';
import { Space, canvas, canvasHeight } from './Space';
import { Keyboard } from './Keyboard';

export class Designer {
    private static readonly newMapBlocksDisplay = document.getElementById('newMapBlocks') || new HTMLElement();

    private static newBlocks: Block[] = [];

    public static tick() {
        if (Keyboard.mouseDown) {
            Designer.addBlock();
        }
    }

    public static addBlock() {
        const newBlockX = Keyboard.mouseX - (canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft);
        const newBlockY = canvasHeight - (Keyboard.mouseY - (canvas.offsetTop - canvas.scrollTop + canvas.clientTop));

        if(Space.fuzzyHasBlock(newBlockX, newBlockY)) {
            return;
        }

        const newBlock = new Block(newBlockX, newBlockY, "brown");

        renderBlock(newBlock);
        Designer.newBlocks.push(newBlock);

        Designer.newMapBlocksDisplay.innerText = Designer.newBlocks.map((block) => {
            return "new Block(" + block.x + ", " + block.y + ", \"" + block.color + "\"),";
        }).join('\n');
    }
}

