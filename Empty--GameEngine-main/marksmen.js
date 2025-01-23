class Marksmen{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //this.game.marksmen = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/marksmentemp.png");
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        

    };
    // updateBB() {
    //     if(this.size == 0 || this.size == 3) {
    //         this.BB = new BoundingBox(this.z)
    //     }
    // }
    update() {

    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.spritesheet, this.x, this.y, this.width * 5, this.height * 5);
    }

}