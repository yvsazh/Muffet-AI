class Road {
    constructor(x, y, position) {
        this.sprite = new Sprite(x, y, 400, 1, "n");
        this.sprite.stroke = "purple";
        this.sprite.color = "purple";
        this.sprite.layer = 0;

        this.position = position;
    }
}