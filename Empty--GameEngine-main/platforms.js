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
        } else if (number == 5) {
            this.image = ASSET_MANAGER.getAsset("./sprites/grassblockmiddleplat.png"); 
        }else if (number == 6) {
            this.image = ASSET_MANAGER.getAsset("./sprites/grassrightplat.png"); 
        }else if (number == 7) {
            this.image = ASSET_MANAGER.getAsset("./sprites/grassleftplat.png"); 
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



