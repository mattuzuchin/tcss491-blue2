class Platform {
    constructor(x, y, width, height, number) {
        this.boundingBox = new BoundingBox(x, y, width, height);
        Object.assign(this, { x, y, width, height });
        if(number == 1) {
            this.image = ASSET_MANAGER.getAsset("./sprites/grassblockmiddle.png"); 
        } else if (number == 2) {
            this.image = ASSET_MANAGER.getAsset("./sprites/grassright.png"); 
        } else if (number == 3){
            this.image = ASSET_MANAGER.getAsset("./sprites/grassleft.png"); 
        } else if (number == 4) {
            this.image = ASSET_MANAGER.getAsset("./sprites/crate.png"); 
        } 
    }
    draw(ctx) {

        if(this.image) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = "#025104";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
    }

    update() {}
}

//as of now chest only just opens, will fix later
class Chest {
    constructor(x, y, width, height, game) {
        this.boundingBox = new BoundingBox(x, y, width, height);
        Object.assign(this, { x, y, width, height });
        this.image = ASSET_MANAGER.getAsset("./sprites/cheststand.png");
        this.sprite = ASSET_MANAGER.getAsset("./sprites/treasureChest.png");
        this.animator = new Animator(this.sprite, 0, 0, this.width, this.height, 4, 0.1)
        this.game = game;
    
    }
    openChest() {

    }
    draw(ctx) {

        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
  
    }

    update() {
        
    }
}


