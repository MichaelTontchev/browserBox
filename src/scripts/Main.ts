import { Player } from './Player';
import { Space, canvas } from './Space';
import { Block } from './Block';
import { blocks } from './Map';
import { Designer } from './Designer';

export const player = Player.instance;

Designer.setup();

export function renderBlock(block: Block) {
    var node = document.createElement("div");
    node.className = 'block';
    node.style.bottom = block.y + 'px';
    node.style.left = block.x + 'px';
    node.style.backgroundColor = block.color;
    canvas.appendChild(node);

    Space.put(block);
}

function renderElements() {
    blocks.forEach(function (block) {
        renderBlock(block);
    });

    Space.movableObjects.push(player);
}

renderElements();

setInterval(function tick() {
    player.tick();
}, 5);