class Pirate{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/piratewalk.png");
        this.x = 0;
        this.y = 500;
        this.width = 40;
        this.height = 40;
        this.speed = 2;
        this.direction = 1;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 3,  0.1);
        

    };
    update() {
        this.x += this.speed * this.direction;
        if(this.x>= this.game.ctx.canvas.width || this.x <= 0) {
            this.direction *= -1;
        }
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }


}