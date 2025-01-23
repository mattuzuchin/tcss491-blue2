class GhostPirate{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpiratestand.png");
        this.x = 0;
        this.y = 500;
        this.width = 40;
        this.height = 40;
        

    };
    update() {

    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width * 5, this.height * 5);
    }

}