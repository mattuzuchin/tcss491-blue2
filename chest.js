class Chest {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/treasureChest.png");
        this.spriteKeep = ASSET_MANAGER.getAsset("./sprites/treasureChestOpen.png");
        this.width = 32;
        this.height = 32;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height,  1, 0.1);
        this.animatorOpen = new Animator(this.spritesheet, 0, 0, this.width, this.height,  4, 0.1);
        this.animatorStay = new Animator(this.spriteKeep, 0, 0, this.width, this.height,  1, 0.1);
        this.open = false;
        this.stayOpen = false;
        // gravity stuffs
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.isPower =false;
        this.health = 10;
        this.boundingBox = new BoundingBox(this.x, this.y, this.width, this.height);
        
    }
    update() {
        this.handleGravity();
        this.handleCollisions();
        this.updateBoundingBox();
    }

    openChest() {
        //implement logic here to give user stuff
        if(!this.open && !this.stayOpen) {
            let randomNum= Math.floor(Math.random() * 10);
            if(randomNum === 6) { // 10% chance to get a powerboost
                this.isPower = true;
            } else {
                this.isPower = false;
            }
            for(let i = 0; i < randomNum; i++) {
                let coin = new Coins(this.game, this.x, this.y);
                this.game.addEntity(coin);
            }
        }
        this.open = true;
        
        return this.isPower;
    }

    keepOpen() {
        this.stayOpen = true;
        this.open = false;
    }
    updateBoundingBox() {
        this.boundingBox.x = this.x;
        this.boundingBox.y = this.y;
    }
    // gravity
    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }
    // collision handling
    handleCollisions() {
        // check if it;s outside canvas
        if (this.y + this.height > this.game.ctx.canvas.height) {
            this.y = this.game.ctx.canvas.height - this.height;
            this.velocity = 0;
            this.isOnGround = true;
        }

        for (let entity of this.game.entities) {
            if (entity instanceof Platform && this.boundingBox.collide(entity.boundingBox)) {
                if (this.velocity > 0 && (this.y + this.height) >= (entity.boundingBox.top + this.velocity)) {
                    this.y = entity.boundingBox.top - this.height;
                    this.velocity = 0;
                    this.isOnGround = true;
                }
            }

        }
    }


    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        if(this.open && this.stayOpen) {
            this.animatorOpen.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else if(this.stayOpen){
            this.animatorStay.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        } else {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }
    }
}