class Wall {
    constructor(x, y, width, height) {
        noStroke();
        this.sprite = new Sprite(x, y, width, height, "s");
        this.sprite.color = "white";
        this.sprite.immovable = true;
    }
}