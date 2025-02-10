class Cloud {
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cloud1.png");
        
    }   
    update(){

    }
    draw(ctx){
        ctx.drawImage(this.spritesheet, this.x - this.game.camera.x, this.y );
    }
    
}