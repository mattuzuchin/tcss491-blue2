class Potion {
    constructor(game, x, y, player) {
        Object.assign(this, { game, x, y, player});
        this.type = Math.floor(Math.random() * 2) + 1; 
        if(this.type === 1){
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player entities/potion.png");
        } else {
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player entities/greenpotion.png");
        }
        this.width = 40;
        this.height = 40;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 0.1);

        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    update() {
        this.handleGravity();
        this.handleCollisions();
        this.updateBoundingBox();
    }

    updateBoundingBox() {
        if (this.BB.y >= 728) {
            this.removeFromWorld = true;
        } else {
            this.BB.x = this.x;
            this.BB.y = this.y;
        }
    }

    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
    }

    handleCollisions() {
        if (this.y + this.height > this.game.ctx.canvas.height) {
            this.y = this.game.ctx.canvas.height - this.height;
            this.velocity = 0;
            this.isOnGround = true;
        }

        for (let entity of this.game.entities) {
            if (entity instanceof Platform && this.BB.collide(entity.boundingBox)) {
                if (this.velocity > 0 && (this.y + this.height) >= (entity.boundingBox.top + this.velocity)) {
                    this.y = entity.boundingBox.top - this.height;
                    this.velocity = 0;
                    this.isOnGround = true;
                }
            }
            if (entity instanceof Player && this.BB.collide(entity.BB)) {
                
                if(this.player.hearts < 5 && this.type === 1) {
                    this.player.hearts = Math.min(this.player.hearts + 1, 5);
                    this.player.activateMessage("+1 Heart", entity.x, entity.y);
                } else {
                    this.player.setInvincible();
                    this.player.activateMessage("Invincibility Discovered!", entity.x, entity.y);
                }
                this.player.playSound("potion");
                this.removeFromWorld = true;
            }
        }
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}