import { Player } from './Player';
import { Space } from './Space';

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
    { left: 240, bottom: 135, color: "brown" },
    { left: 255, bottom: 135, color: "brown" },
    { left: 270, bottom: 135, color: "brown" },
    { left: 285, bottom: 135, color: "brown" },
    { left: 300, bottom: 135, color: "brown" },
    { left: 315, bottom: 135, color: "brown" },
    { left: 225, bottom: 120, color: "brown" },
    { left: 210, bottom: 120, color: "brown" },
    { left: 195, bottom: 120, color: "brown" },
    { left: 180, bottom: 120, color: "brown" },
    { left: 165, bottom: 120, color: "brown" },
    { left: 150, bottom: 120, color: "brown" },
    { left: 135, bottom: 120, color: "brown" },
    { left: 120, bottom: 120, color: "brown" },
];

var space: { [key: string]: IBlock } = {};

(function renderBlocks() {
    blocks.forEach(function (block) {
        var node = document.createElement("div");
        node.className = 'block';
        node.style.bottom = block.bottom + 'px';
        node.style.left = block.left + 'px';
        node.style.backgroundColor = block.color;
        canvas.appendChild(node);

        Space.putBlock(block);
    });
})();

var hitPlayer = false;

setInterval(function tick() {
    player.tick();
}, 5);