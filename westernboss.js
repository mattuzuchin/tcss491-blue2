class WesternBoss {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/gunslingerStanding.png");
        this.width = 80;
        this.height = 76;
        this.speed = .5;
        this.facingLeft = false;
        this.direction = 1;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 1);
        this.isAttacking = false;
        this.isStart = true;
        this.introCooldown = 600;
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.attackDirection = "right";
        this.outlawSpawnCount = 0;
        this.randomMoveInterval = 60; 
        this.randomMoveCounter = 0;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.outlawTimer = 100;
        this.health = 10000;  
        this.damage = 1;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.isDead = false;
        this.shootCooldown = 300;
        this.currentShootCooldown = 0;
        this.shootRange = 1000;

        this.miniOutlaw = 12;
        this.stampedeAttackCooldown = 500; 
        this.currentStampedeAttackCooldown = 0; 
        this.stampedeAttackDuration = 120; 
        this.isStampedeAttacking = false; 
        this.stampedeAttackIndicatorDuration = 60;
        this.stampedeTargetX = 0;
        this.maxDynamite = 6;
        this.dynamiteSpace = 300;
        this.dynamiteAttackCooldown = 400; 
        this.currentDynamiteAttackCooldown = 0; 
        this.isDynamiteAttacking = false;
        this.dynamiteAttackIndicatorDuration = 60;
    }

    takeDamage(amount) {
        if(this.introCooldown > 0) {
            return;
        } else {
            this.health -= amount;
            if (this.health <= 0) {
                this.die();
            }
        }
    }

    die() {
        this.isDead = true;
        let artifact = new Artifact(this.game, this.x , this.y, 2);
        this.game.addEntity(artifact);
        this.removeFromWorld = true;
    }

    update() {
        if(this.isStart && this.introCooldown > 0) {
            this.introCooldown--;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/gunslingerWalk.png");
            this.animator = new Animator(this.spritesheet, 0, 0, 80, 76, 3, 0.1);
        }
        if(this.introCooldown <= 0) {
            this.isStart = false;
        }
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.currentShootCooldown > 0) this.currentShootCooldown--;
        if (this.currentStampedeAttackCooldown > 0) this.currentStampedeAttackCooldown--;
        if (this.currentDynamiteAttackCooldown > 0) this.currentDynamiteAttackCooldown--;

        if (!this.isDead && !this.isStart) {
            this.handleMovement();
            if (this.type === "gun") {
                this.handleShooting();
            }
            if (Math.random() < 0.01 && this.currentStampedeAttackCooldown <= 0) { 
                this.handleStampedeAttack();
            }

            this.handleOutLawSpawning();
            
            if (Math.random() < 0.008 && this.currentDynamiteAttackCooldown <= 0 && !this.isDynamiteAttacking) {
                this.handleDynamiteAttack();
            }
        }

        this.handleGravity();
        this.handleCollisions();
        this.updateBoundingBox();
    }
    
    handleOutLawSpawning() {
        if(this.outlawTimer > 0) {
            this.outlawTimer--;
        } else if(this.outlawSpawnCount < 10 && this.miniOutlaw > 0) {
            this.outlawTimer = 100;
            this.random = Math.floor(Math.random() * 2);
            let type = "";
            if(this.random === 0) {
                type = "gun";
            } else {
                type = "sword";
            }
            this.miniOutlaw--;
            let outlaw = new Outlaw(this.game, this.x, this.y, type);
            this.game.addEntity(outlaw);
        }
        this.outlawSpawnCount = 0;
        for (let entity of this.game.entities) {
            if(entity instanceof Outlaw) {
                this.outlawSpawnCount++;
            }
        }
    }
    
    handleDynamiteAttack() {
        if (!this.isDynamiteAttacking) {
            this.isDynamiteAttacking = true;
            this.currentDynamiteAttackCooldown = this.dynamiteAttackCooldown;
            setTimeout(() => {
                this.performDynamiteAttack();
            }, this.dynamiteAttackIndicatorDuration * 1000 / 60);
        }
    }
    
    performDynamiteAttack() {
        let dynamiteCount = 0;
        this.playSound("explode");
        while(dynamiteCount < this.maxDynamite) {
            let dynamite = new Dynamite(
                this.game, 
                (dynamiteCount * this.dynamiteSpace), 
                0
            );
            this.game.addEntity(dynamite);
            dynamiteCount++;
        }
        this.isDynamiteAttacking = false;
    }

    handleStampedeAttack() {
        if (this.currentStampedeAttackCooldown <= 0 && !this.isStampedeAttacking) {
            this.isStampedeAttacking = true;
            this.currentStampedeAttackCooldown = this.stampedeAttackCooldown;
            this.findPlayerPosition();
            setTimeout(() => {
                this.performStampedeAttack();
            }, this.stampedeAttackIndicatorDuration * 1000 / 60); 
        }
    }
    
    findPlayerPosition() {
        for (let entity of this.game.entities) {
            if (entity instanceof Player) {
                this.stampedeTargetX = entity.x;
                break;
            }
        }
    }
    
    performStampedeAttack() {
        const startX = -200;
        const floorY = 700;
        for (let i = 0; i < 5; i++) {
            let targetX;
            if (i === 2) {
                targetX = this.stampedeTargetX;
            } else if (i < 2) {
                targetX = this.stampedeTargetX - (75 * (2 - i));
            } else {
                targetX = this.stampedeTargetX + (75 * (i - 2));
            }
            
            let stampedingAnimal = new StampedingAnimal(this.game, startX - (i * 80), floorY - 40,targetX);
            this.playSound("bullsound");
            this.game.addEntity(stampedingAnimal);
            
        }
        setTimeout(() => {
            this.isStampedeAttacking = false;
        }, this.stampedeAttackDuration * 100 / 60); 
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
        if (hasGround && !this.isStampedeAttacking) {
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
            if (entity instanceof Player && this.BB.collide(entity.BB) && !this.isStart) {
                this.isAttacking = true;
                this.handleAttack(entity); 
            }
        }
    }

    handleAttack(player) {
        if (this.attackCooldown <= 0) {  
                this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/gunslingerFiring.png");
                this.animator = new Animator(this.spritesheet, 0, 0, 80, 86, 4, 0.1); 
                
                if (player) {
                    player.takeDamage(2);
                }
            }
            this.attackCooldown = this.attackDuration; 
        
        this.isAttacking = false;
            this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/gunslingerWalk.png");
            this.animator = new Animator(this.spritesheet, 0, 0, 80, 76, 3, 0.1);
        
    }
    playSound(sound) {
        this.Sound = new Audio(`./audio/${sound}.mp3`);
        this.Sound.play();
        this.Sound.volume = 0.7;
        this.Sound.loop = false;
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

        ctx.strokeStyle = "red";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
        if (this.isStampedeAttacking && this.currentStampedeAttackCooldown > this.stampedeAttackCooldown - this.stampedeAttackIndicatorDuration) {
            const floorY = 700;
            ctx.fillStyle = "rgba(139, 69, 19, 0.5)";
            const indicatorWidth = 300;
            const stampHeight = 40; 
    
            ctx.fillRect(this.stampedeTargetX - indicatorWidth/2,floorY - stampHeight,indicatorWidth,stampHeight);
            
            ctx.strokeStyle = "rgba(139, 69, 19, 0.7)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, floorY - stampHeight/2);
            ctx.lineTo(this.stampedeTargetX, floorY - stampHeight/2);
            ctx.stroke();
            ctx.lineWidth = 1;
        }

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

        if (this.isDynamiteAttacking && 
            this.currentDynamiteAttackCooldown > this.dynamiteAttackCooldown - this.dynamiteAttackIndicatorDuration) {
            
            ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
            let dynamiteCount = 0;
        
            while(dynamiteCount < this.maxDynamite) {
                ctx.fillRect(
                    (dynamiteCount * this.dynamiteSpace) - 25, 
                    0, 
                    50, 
                    this.game.ctx.canvas.height
                );
                dynamiteCount++;
            }
        }
    }
}
class Dynamite {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/dyna.png");
        this.velocity = 6;
        this.width = 24;
        this.height = 24;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.damage = 2;
        this.animator = new Animator(this.spritesheet, 0, 0, 24, 24, 1, 0.1);
        this.exploded = false;
        this.explosionRadius = 20; 
    }

    update() {
        
        if (!this.exploded) {
            this.y += this.velocity;
            this.BB.y = this.y;
            let hitGround = false;
            
            if (this.y + this.height >= this.game.ctx.canvas.height) {
                hitGround = true;
            }
            
            for (let entity of this.game.entities) {
                if (entity instanceof Platform && this.BB.collide(entity.boundingBox)) {
                    hitGround = true;
                    break;
                }
                
                if (entity instanceof Player && this.BB.collide(entity.BB)) {
                    entity.takeDamage(this.damage);
                    this.explode();
                    return;
                }
            }
            
            if (hitGround) {
                this.explode();
            }
        } else {
            this.removeFromWorld = true;
        }
    }
    
    explode() {
        this.exploded = true;
        let explosionBB = new BoundingBox(
            this.x - this.explosionRadius,
            this.y - this.explosionRadius,
            this.width + (this.explosionRadius * 2),
            this.height + (this.explosionRadius * 2)
        );
        for (let entity of this.game.entities) {
            if (entity instanceof Player && explosionBB.collide(entity.BB)) {
                entity.takeDamage(this.damage * 1.5);
            }
        }
        let explosion = new Explosion(this.game, this.x - this.explosionRadius, this.y - this.explosionRadius);
        this.game.addEntity(explosion);
    }

    draw(ctx) {
        if (!this.exploded) {
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
            ctx.strokeStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.x + this.width/2, this.y + this.height/2, this.explosionRadius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

class Explosion {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/projectiles/Fireball.png");
        this.width = 40;
        this.height = 40;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 6, 0.05);
        this.timeToLive = 30; 
    }
    
    update() {
        this.timeToLive--;
        if (this.timeToLive <= 0) {
            this.removeFromWorld = true;
        }
    }
    
    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
}

class StampedingAnimal {
    constructor(game, x, y, targetX) {
        Object.assign(this, { game, x, y, targetX });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemy entities/bull.png");
        this.velocity = 5;
        this.width = 40;
        this.height = 40;
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.damage = 3;
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 1, 1);
    }

    update() {
        this.x += this.velocity;
        this.BB.x = this.x;
        this.BB.y = this.y;

        for (let entity of this.game.entities) {
            if (entity instanceof Player && this.BB.collide(entity.BB)) {
                entity.takeDamage(this.damage);
            }
        }
        if (this.x > this.game.ctx.canvas.width + 100) {
            this.removeFromWorld = true;
        }
    }

    draw(ctx) {
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        ctx.strokeStyle = "brown";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}