class Marksmen {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.marksmenWalk = ASSET_MANAGER.getAsset("./sprites/piratewalk.png");
        this.marksmenIdle = ASSET_MANAGER.getAsset("./sprites/piratestand.png");
        this.marksmenAttack = ASSET_MANAGER.getAsset("./sprites/pirateswordattack.png")
        this.width = 40;
        this.height = 40;
        this.speed = 0;
        this.state = 0;
        this.currentspeed = this.speed;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = y;
        this.facingRight = true;
        this.animator = new Animator(this.marksmenIdle, 0, 0, this.width, this.height, 1, 0.1);
    }

    update() {
        let isMoving = false;
        if (this.game.left) {
            this.x -= this.speed;
            isMoving = true;
            this.facingRight = false;
        }
        if (this.game.right) {
            this.x += this.speed;
            isMoving = true;
            this.facingRight = true;
        }
        if (this.game.up && this.y >= this.groundLevel) {
            this.velocityY = -10;
        }

        this.velocityY += this.gravity;
        this.y += this.velocityY;

        if (this.y + 300 >= 768) {
            this.y = this.game.ctx.canvas.height - 300;
            this.velocityY = 0;
        }

        if (this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
        }

        if (isMoving) {
            if (this.animator.spritesheet !== this.marksmenWalk) {
                this.animator = new Animator(this.marksmenWalk, 0, 0, this.width, this.height, 3, 0.1);
            }
        } else {
            if (this.animator.spritesheet !== this.marksmenIdle) {
                this.animator = new Animator(this.marksmenIdle, 0, 0, this.width, this.height, 1, 0.1);
            }
        }
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.save();
        
        if (!this.facingRight) {
            ctx.scale(-1, 1);
            this.animator.drawFrame(this.game.clockTick, ctx, -this.x - 200, this.y);
        } else {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }  
        ctx.restore();
    }
}