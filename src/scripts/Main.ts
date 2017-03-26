import { Player } from './Player';
import { Space } from './Space';

var canvas = document.getElementById('canvas') || new HTMLElement();

var player = Player.instance;

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
];

var space: { [key: string]: IBlock } = {};

(function setupKeyBoardListeners() {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            leftKeyDown = true;
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            rightKeyDown = true;
        } else if (e.keyCode === 32 || e.keyCode === 87) {
            if (!player.isFalling) {
                jumpUp();
            }
        }
    });

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            leftKeyDown = false;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            rightKeyDown = false;
        }
    });
})();

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

function jumpUp() {
    var repetitions = 0;

    var jumpInterval = setInterval(function () {
        if (repetitions === 38) {
            clearInterval(jumpInterval);
        }

        var currPlayerY = player.getY();

        player.setY(currPlayerY + 4);

        repetitions++;
    }, 2);
}

var hitPlayer = false;

setInterval(function tick() {
    (function movePlayer() {
        var currPlayerX = player.getX();

        if (leftKeyDown) {
            player.setX(currPlayerX - player.speed);
        } else if (rightKeyDown) {
            player.setX(currPlayerX + player.speed)
        }
    })();

    (function gravity() {
        var currPlayerY = player.getY();
        var currPlayerX = player.getX();

        let shouldFall = false;
        if (currPlayerY % 15 !== 0) {
            shouldFall = true;
        } else {
            const isBlockBelowFree = !Space.fuzzyHasBlock(currPlayerX, currPlayerY - 1);
            if (isBlockBelowFree) {
                shouldFall = true;
            }
        }

        if (shouldFall) {
            player.isFalling = true;
            player.setY(currPlayerY - 4);
        } else {
            player.isFalling = false;
        }

    })();

    (function handleCollision() {
        var currPlayerX = player.getX();
        var currPlayerY = player.getY();

        if (1 + 1 === 3) {
            if (!hitPlayer) {
                hitPlayer = true;
            }
        } else {
            hitPlayer = false;
        }
    })();
}, 10);