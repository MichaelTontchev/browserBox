import { Player } from './Player';
import { Space } from './Space';
import { Block } from './Block';

var canvas = document.getElementById('canvas') || new HTMLElement();

export const player = Player.instance;

var canvasWidth = 500;
var canvasHeight = 500;

var rightKeyDown = false;
var leftKeyDown = false;

export interface IBlock {
    left: number;
    bottom: number;
    color: string;
}

var blocks = [
    new Block(225, 120, "brown"),
    new Block(210, 120, "brown"),
    new Block(195, 120, "brown"),
    new Block(180, 120, "brown"),
    new Block(165, 120, "brown"),
    new Block(150, 120, "brown"),
    new Block(135, 120, "brown"),
    new Block(120, 120, "brown"),
    new Block(105, 135, "brown"),

    new Block(225, 165, "brown"),
    new Block(270, 165, "brown"),
    new Block(270, 180, "brown"),

    new Block(240, 135, "brown"),
    new Block(255, 135, "brown"),
    new Block(270, 135, "brown"),
    new Block(285, 135, "brown"),
    new Block(300, 135, "brown"),
    new Block(315, 135, "brown"),

    new Block(330, 180, "brown"),
    new Block(345, 180, "brown"),
    new Block(360, 180, "brown"),
    new Block(375, 180, "brown"),
    new Block(390, 180, "brown"),

    new Block(405, 225, "brown"),
    new Block(420, 225, "brown"),
    new Block(435, 225, "brown"),
    new Block(450, 225, "brown"),
    new Block(465, 225, "brown"),
];

(function renderElements() {
    blocks.forEach(function (block) {
        var node = document.createElement("div");
        node.className = 'block';
        node.style.bottom = block.y + 'px';
        node.style.left = block.x + 'px';
        node.style.backgroundColor = block.color;
        canvas.appendChild(node);

        Space.put(block);
    });

    Space.movableObjects.push(player);
})();

var hitPlayer = false;

setInterval(function tick() {
    player.tick();
}, 5);