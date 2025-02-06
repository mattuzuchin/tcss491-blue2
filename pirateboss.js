class PirateBoss {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pirateBossIdle.png");
        this.width = 75.25;
        this.height = 72;
        this.speed = .5;
        this.facingLeft = false;
        this.direction = 1;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 1);
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
        this.damage = 1;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.isDead = false;
        this.shootCooldown = 300;
        this.currentShootCooldown = 0;
        this.shootRange = 1000;

    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        let artifact = new Artifact(this.game, this.x , this.y );
        this.game.addEntity(artifact);
        
    }

    update() {
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.currentShootCooldown > 0) this.currentShootCooldown--;
        if(!this.isDead) {
            this.handleMovement();
            if (this.type === "gun") {
                this.handleShooting();
            }
        }
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
    
        let nextX = this.x + this.speed * this.direction;
        let hasGround = false;
    
        for (let entity of this.game.entities) {
            if (entity instanceof Platform) {
                let nextPositionBB = new BoundingBox(nextX, this.y + this.height, this.width, 5);
                if (nextPositionBB.collide(entity.boundingBox)) {
                    hasGround = true;
                    break;
                }
            }
        }
    
        if (hasGround) {
            this.x = nextX;
            this.facingLeft = this.direction === -1;
            this.attackDirection = this.facingLeft ? "left" : "right";
        } else {
            this.direction *= -1;
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
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pirateBossAttack.png");
                this.animator = new Animator(this.spritesheet, 0, 0, 80, 72, 4, 0.1); 
                
                if (player) {
                    player.takeDamage(2);
                }
            }
            this.attackCooldown = this.attackDuration; 
        
        this.isAttacking = false;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pirateBossIdle.png");
            this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 0.1);
        
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

       // Debug bounding box
       ctx.strokeStyle = "red";
       ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
           
       // Debug attack hitbox
       if (this.isAttacking) {
           let attackBB;
           if (this.attackDirection === "right") {
               attackBB = new BoundingBox(this.x + this.width, this.y + 10, 20, 20);
           } else if (this.attackDirection === "left") {
               attackBB = new BoundingBox(this.x - 20, this.y + 10, 20, 20);
           } else if (this.attackDirection === "up") {
               attackBB = new BoundingBox(this.x + 10, this.y - 20, 20, 20);
           }
           ctx.strokeStyle = "green";
           ctx.strokeRect(attackBB.x, attackBB.y, attackBB.width, attackBB.height);
       }
    }
}
