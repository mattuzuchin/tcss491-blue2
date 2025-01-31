class Pirate {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/piratewalk.png");
        this.width = 40;
        this.height = 40;
        this.speed = .5;
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
        
        this.health = 800;  
        this.damage = 10;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.isDead = false;

    }

    takeDamage(amount) {
        this.health -= amount;
        //console.log("Damage left: " + this.health);
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        //console.log("GhostPirate has been defeated!");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/ghostpiratestanddead.png");
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 1);
        let coin = new Coins(this.game, this.x, this.y);
        this.game.addEntity(coin);

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
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/piratswordattack.png");
            this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 3, 0.1); 
            
            if (player) {
                player.takeDamage(this.damage);
                //console.log("Player took damage!");
            }
    
            this.attackCooldown = this.attackDuration; 
        }
        this.isAttacking = false;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/piratewalk.png");
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
