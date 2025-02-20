class PirateBoss {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/pirateBossIdle.png");
        this.width = 75.25;
        this.height = 72;
        this.speed = .5;
        this.facingLeft = false;
        this.direction = 1;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 1);
        this.isAttacking = false;
        
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.attackDirection = "right";
        this.pirateSpawnCount = 0;
        this.randomMoveInterval = 60; 
        this.randomMoveCounter = 0;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.pirateTimer = 100;
        this.health = 10000;  
        this.damage = 1;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.isDead = false;
        this.shootCooldown = 300;
        this.currentShootCooldown = 0;
        this.shootRange = 1000;

        this.miniPirate = 12;


        this.bigAttackCooldown = 500; 
        this.currentBigAttackCooldown = 0; 
        this.bigAttackDuration = 120; 
        this.isBigAttacking = false; 
        this.bigAttackIndicatorDuration = 60; 

        this.maxCannon = 10;
        this.cannonSpace = 200;
        this.cannonAttackCooldown = 400; 
        this.currentCannonAttackCooldown = 0; 
        this.isCannonAttacking = false;
        this.cannonAttackIndicatorDuration = 60;
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
    if (this.currentBigAttackCooldown > 0) this.currentBigAttackCooldown--;

    if (!this.isDead) {
        this.handleMovement();
        if (this.type === "gun") {
            this.handleShooting();
        }


        if (Math.random() < 0.01 && this.currentBigAttackCooldown <= 0) { 
            this.handleBigAttack();
        }
        
    }

        if(this.pirateTimer > 0) {
            this.pirateTimer--;
        } else if(this.pirateSpawnCount < 10 && this.miniPirate > 0) {
            this.pirateTimer = 100;
            this.random = Math.floor(Math.random() * 2);
            let type = "";
            if(this.random === 0) {
                type = "gun";
            } else {
                type = "sword";
            }
            this.miniPirate--;
            let ghostPirate = new GhostPirate(this.game, this.x, this.y, type);
            this.game.addEntity(ghostPirate);
        }
        this.pirateSpawnCount = 0;
        for (let entity of this.game.entities) {
            if(entity instanceof GhostPirate) {
                this.pirateSpawnCount++;
        }
    
        }
        if (this.currentCannonAttackCooldown > 0) this.currentCannonAttackCooldown--;
        
        if (!this.isDead && Math.random() < 0.008 && this.currentCannonAttackCooldown <= 0) {
            this.handleCannonAttack();
        }
        this.handleGravity();
        this.handleCollisions();
        this.updateBoundingBox();
    }
    handleCannonAttack() {
        if (!this.isCannonAttacking) {
            this.isCannonAttacking = true;
            this.currentCannonAttackCooldown = this.cannonAttackCooldown;
            setTimeout(() => {
                this.performCannonAttack();
            }, this.cannonAttackIndicatorDuration * 1000 / 60);
        }
    }
    performCannonAttack() {
        let cannonCount = 0;
        while(cannonCount < this.maxCannon) {
            let cannonball = new CannonBall(
                this.game, 
                 (cannonCount * this.cannonSpace), 
                0
            );
            this.game.addEntity(cannonball);
            cannonCount++;
        }
        this.isCannonAttacking = false;
    }

    handleBigAttack() {
        if (this.currentBigAttackCooldown <= 0 && !this.isBigAttacking) {
            this.isBigAttacking = true;
            this.currentBigAttackCooldown = this.bigAttackCooldown;
    
            setTimeout(() => {
                this.performBigAttack();
            }, this.bigAttackIndicatorDuration * 1000 / 60); 
        }
    }
    
    performBigAttack() {
        let bigAttackBB = new BoundingBox(0, 568, 3000, 300);
        for (let entity of this.game.entities) {
            if (entity instanceof Player) {
                if (entity.BB.collide(bigAttackBB)) {
                    entity.takeDamage(2); 
                }
            }
        }
        setTimeout(() => {
            this.isBigAttacking = false;
        }, this.bigAttackDuration * 100 / 60); 
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
        if (hasGround && !this.isBigAttacking) {
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
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/pirateBossAttack.png");
                this.animator = new Animator(this.spritesheet, 0, 0, 80, 72, 4, 0.1); 
                
                if (player) {
                    player.takeDamage(2);
                }
            }
            this.attackCooldown = this.attackDuration; 
        
        this.isAttacking = false;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/pirateBossIdle.png");
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
    
        // Draw big attack indicator (keep this)
        if (this.isBigAttacking && this.currentBigAttackCooldown > this.bigAttackCooldown - this.bigAttackIndicatorDuration) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(0, 568, 3000, 300); 
        }
    
        // Debug attack hitbox (maybe delete or comment)
        if (this.isAttacking) {
            let attackBB;
            if (this.attackDirection === "right") {
                attackBB = new BoundingBox(this.x + this.width, 0, 20, 20);
            } else if (this.attackDirection === "left") {
                attackBB = new BoundingBox(this.x - 20, this.y + 10, 20, 20);
            } else if (this.attackDirection === "up") {
                attackBB = new BoundingBox(this.x + 10, this.y - 20, 20, 20);
            }
            ctx.strokeStyle = "green";
            ctx.strokeRect(attackBB.x, attackBB.y, attackBB.width, attackBB.height);
        }

        // Draw cannon ball attack indicator (keep this)
        if (this.isCannonAttacking && 
            this.currentCannonAttackCooldown > this.cannonAttackCooldown - this.cannonAttackIndicatorDuration) {
            
            ctx.fillStyle = "rgba(255, 100, 0, 0.4)";
            let cannonCount = 0;
        
            while(cannonCount < this.maxCannon) {
                ctx.fillRect(
                    (cannonCount * this.cannonSpace) - 25, 
                    0, 
                    50, 
                    this.game.ctx.canvas.height
                );
                cannonCount++;
            }
        }
    }
}
class CannonBall {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/bullet.png");
        this.velocity = 8;
        this.width = 24;
        this.height = 24;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.damage = 2;
        this.animator = new Animator(this.spritesheet, 0, 0, 24, 24, 1, 0.1);
    }

    update() {
        this.y += this.velocity;
        this.BB.y = this.y;
        
 
        for (let entity of this.game.entities) {
            if (entity instanceof Player && this.BB.collide(entity.BB)) {
                entity.takeDamage(this.damage);
                this.removeFromWorld = true;
            }
        }
        

        if (this.y > this.game.ctx.canvas.height) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        // debug hitbox
        ctx.strokeStyle = "orange";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
} 