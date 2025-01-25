class Pirate{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/piratestand.png");
        this.width = 40;
        this.height = 40;
        

    };
    update() {

    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width, this.height);
    }

}