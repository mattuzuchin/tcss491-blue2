class GhostPirate {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpiratewalk.png");
        this.width = 40;
        this.height = 40;
        this.speed = 2;
        this.facingLeft = false;
        this.direction = 1;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 3, 0.1);
        this.isAttacking = false;
        // gravity stuffs
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.attackDirection = "right";
        // Movement stuffs  
        this.randomMoveInterval = 60; 
        this.randomMoveCounter = 0;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        
        this.health = 1200;  
        this.damage = 10;
        this.attackCooldown = 0;
        this.attackDuration = 60;

    }

    takeDamage(amount) {
        this.health -= amount;
        console.log("Damage left: " + this.health);
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        console.log("GhostPirate has been defeated!");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpiratestanddead.png")
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 1);
    }

    update() {
        if (this.attackCooldown > 0) this.attackCooldown--;

        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.updateBoundingBox();
    }

    handleMovement() {
        this.randomMoveCounter++;
        if (this.randomMoveCounter >= this.randomMoveInterval) {
            this.direction = Math.random() > 0.5 ? 1 : -1; 
            this.randomMoveCounter = 0; 
        }

        this.x += this.speed * this.direction;
        this.facingLeft = this.direction === -1;
        if(this.facingLeft) {
            this.attackDirection = "left";
        }
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
       
        if (this.x + this.width >= this.game.ctx.canvas.width || this.x <= 0 + this.width) {
            this.direction *= -1;
        }

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
                this.isAttacking = true;
                this.handleAttack(entity); 
            }
        }
    }

    handleAttack(player) {
        if (this.attackCooldown <= 0) {  
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpirateattack.png");
            this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 3, 0.1); 
            
            if (player) {
                player.takeDamage(this.damage);
                console.log("Player took damage!");
            }
    
            this.attackCooldown = this.attackDuration; 
        }
        this.isAttacking = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpiratewalk.png");
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 3, 0.1); 
    }
    
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        if (this.facingLeft) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }

        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.facingLeft) {
            ctx.restore();
        }
    }
}
