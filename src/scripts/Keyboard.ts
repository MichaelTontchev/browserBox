import { player } from './Main';
import { canvas } from './Space';

export class Keyboard {
    public static rightKeyDown = false;
    public static leftKeyDown = false;
    public static mouseDown = false;
    public static mouseX: number;
    public static mouseY: number;
}

(function setupKeyBoardListeners() {
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 37 || e.keyCode === 65) {
            Keyboard.leftKeyDown = true;
        } else if (e.keyCode === 39 || e.keyCode === 68) {
            Keyboard.rightKeyDown = true;
        } else if (e.keyCode === 32 || e.keyCode === 87) {
            player.tryJumping = true;
        }
    });

    document.addEventListener('keyup', function (e) {
        if (e.keyCode == 37 || e.keyCode == 65) {
            Keyboard.leftKeyDown = false;
        } else if (e.keyCode == 39 || e.keyCode == 68) {
            Keyboard.rightKeyDown = false;
        } else if (e.keyCode === 32 || e.keyCode === 87) {
            player.tryJumping = false;
        }
    });

    canvas.addEventListener('mousedown', function (e) {
        Keyboard.mouseDown = true;
    });

    canvas.addEventListener('mousemove', function (e) {
        Keyboard.mouseX = e.clientX;
        Keyboard.mouseY = e.clientY;
    });

    canvas.addEventListener('mouseup', function (e) {
        Keyboard.mouseDown = false;
    });
})();