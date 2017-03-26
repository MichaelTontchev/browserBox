export class Player {
    private static player = document.getElementById('player') || new HTMLElement();

    public static readonly instance = new Player();

    public readonly width = 15;
    public readonly height = 30;
    public readonly speed = 5;

    public isFalling = false;

    private constructor() {
        Player.player.style.left = '240px';
        Player.player.style.bottom = '150px';
    }

    public getX(): number {
        return parseInt(Player.player.style.left as string, 10);
    }

    public setX(newX: number) {
        Player.player.style.left = newX + 'px';
    }

    public getY(): number {
        return parseInt(Player.player.style.bottom as string, 10);
    }

    public setY(newY: number) {
        Player.player.style.bottom = newY + 'px';
    }
}