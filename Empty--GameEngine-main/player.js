class Marksmen{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //this.game.marksmen = this;
        this.marksmen1 = ASSET_MANAGER.getAsset("./sprites/marksmentemp.png");
        this.marksmen2 = ASSET_MANAGER.getAsset("./sprites/marksmenwalkLeft.png");
        this.currentSprite = this.marksmen2;
        this.width = 40;
        this.height = 40;
        this.speed = 0;
        this.state = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = y;
        //this.animator = new Animator(this.marksmen1, 8, 0, 40, 110, 8,  0.1);
        this.animator = new Animator(this.currentSprite, 0, 0, 39, 55, 1,  11);

    };
    // updateBB() {
    //     if(this.size == 0 || this.size == 3) {
    //         this.BB = new BoundingBox(this.z)
    //     }
    // }
    update() {
        if(this.game.left) {
            this.x -= this.speed;
            this.currentSprite = this.marksmen1;
            this.animator = new Animator(this.marksmen1, 0, 0, 40, 50, 8,  0.1);
        }
        if(this.game.right) {
            this.x += this.speed;
            this.currentSprite = this.marksmen2;
            this.animator = new Animator(this.currentSprite, 0, 0, 39, 55, 8,  0.1);
        }
        if(this.game.up && this.y + this.height >= this.game.ctx.canvas.height) {
            this.velocityY = -10;
        }
        if(this.game.down) {
            this.y += this.speed;
            
        }
        if(this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
        }
        if(this.game.up) {
            this.velocityY = -10;
        }
        // this.velocityY += this.gravity; 
        // this.y += this.velocityY;
        // if(this.y >= this.groundLevel) {
        //     this.y = this.groundLevel;
        //     this.velocityY;
        // }
        if (this.y + this.height >= this.game.ctx.canvas.height) {
            this.y = this.game.ctx.canvas.height - this.height; // Reset to ground level
            this.velocityY = 0; // Stop vertical movement
        }
        console.log(this.y);
        console.log(this.height);
        // if(this.y + 300 >= 768) {
        //     // this.y = this.groundLevel;
        //     this.y = this.game.ctx.canvas.height - 300;
        //     this.velocityY = 0; 
        // }
        if (this.x < 0) this.x = 0; // Left boundary
        if (this.x + this.width > this.game.ctx.canvas.width) this.x = this.game.ctx.canvas.width - this.width; // Right boundary
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        // if(this.selected_character = "warrior") {
        //     ctx.drawImage(this.warrior, this.x, this.y, this.width * 1, this.height * 1);
        // } if(this.selected_character = "marksmen") {
        //     ctx.drawImage(this.marksmen, this.x, this.y, this.width * 1, this.height * 1);
        // }
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y)
        
    }

}