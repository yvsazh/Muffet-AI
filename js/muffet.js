class Muffet {
    constructor(x, y) {
        this.sprite = new Sprite(x, y, 200, 200, "n");
        this.sprite.addAnimation("idle", '/Muffet-AI/assets/muffet/img0.png', 34);
        this.sprite.animation.scale = 1.3;
    }
}
