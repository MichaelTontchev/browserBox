import { renderBlock, canvas, canvasHeight } from './Main';
import { Block } from './Block';

export class Designer {
    public static setup() {
        canvas.addEventListener('click', function (e) {
            renderBlock(
                new Block(e.clientX - (canvas.offsetLeft - canvas.scrollLeft + canvas.clientLeft),
                    canvasHeight - (e.clientY - (canvas.offsetTop - canvas.scrollTop + canvas.clientTop)),
                    "brown"));
        });
    }
}

