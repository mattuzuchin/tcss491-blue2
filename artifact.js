class Artifact {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/polymorphism-full.png");
        this.width = 40;
        this.height = 40;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height,  1, 0.1);

        // gravity stuffs
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
        this.BB.x = this.x;
        this.BB.y = this.y;
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
            if (entity instanceof Platform && this.BB.collide(entity.boundingBox)) {
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
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}