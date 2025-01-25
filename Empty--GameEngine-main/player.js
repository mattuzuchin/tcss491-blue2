class Marksmen{
    constructor(game, x, y) {
        Object.assign(this, {game, x, y});
        //this.game.marksmen = this;
        this.marksmen = ASSET_MANAGER.getAsset("./sprites/piratewalk.png");
        this.warrior = ASSET_MANAGER.getAsset("./sprites/warriortemp.png");
        this.selected_character = "marksmen";
        this.width = 40;
        this.height = 40;
        this.speed = 0;
        this.state = 0;
        this.velocityY = 0;
        this.gravity = 0.5;
        this.groundLevel = y;
        this.animator = new Animator(this.marksmen, 0, 0, this.width, this.height, 3,  0.1);

    };
    // updateBB() {
    //     if(this.size == 0 || this.size == 3) {
    //         this.BB = new BoundingBox(this.z)
    //     }
    // }
    update() {
        if(this.game.left) {
            this.x -= this.speed;
        }
        if(this.game.right) {
            this.x += this.speed;
        }
        if(this.game.up && this.y >= this.groundLevel) {
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
        this.velocityY += this.gravity; 
        this.y += this.velocityY;
        // if(this.y >= this.groundLevel) {
        //     this.y = this.groundLevel;
        //     this.velocityY;
        // }
        console.log(this.y);
        console.log(this.height);
        if(this.y + 300 >= 768) {
            // this.y = this.groundLevel;
            this.y = this.game.ctx.canvas.height - 300;
            this.velocityY = 0; 
        }
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