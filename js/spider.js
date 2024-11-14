class Spider {
    constructor(x, road = roads[0], direction = "left", activateAfter = 0) {
        this.width = 50;
        this.height = 50;
        this.road = road;
        this.sprite = new Sprite(x, this.road.sprite.y, this.width, this.height, "k");
        spider_img.resize(this.width, this.height)
        this.sprite.image = spider_img;
        this.sprite.immovable = true;

        this.sprite.layer = 1;

        this.direction = direction;
        this.speed = 5;

        this.deadTimer = activateAfter + 150;
        this.deadIndex = 0;

        this.activateAfter = activateAfter;
        this.activateIndex = 0;
        this.activated = false;

        this.sprite.update = () => {
            this.deadIndex++;
            if (this.deadIndex > this.deadTimer) {
                this.sprite.remove();
                this.activated = false;
            }

            if (this.activateAfter > this.activateIndex) {
                this.activateIndex++;
                this.activated = true;
            } else {
                if (this.direction == "left") {
                    this.sprite.vel.x = -this.speed;
                }   
                if (this.direction == "right") {
                    this.sprite.vel.x = +this.speed;
                }  
            }
        }
    }

    update() {
        
    }
}