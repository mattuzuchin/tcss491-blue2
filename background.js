class Background {
    constructor(game, x, y, type) {
        Object.assign(this, {game, x, y, type});
        if(this.type === 1) {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/jungleBackground.png");
            console.log(this.spritesheet);
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/background/westernbackground01.png");
        }
        
    }   
    update() {
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.spritesheet, this.x, this.y, 1024, 768);
     }
    
}