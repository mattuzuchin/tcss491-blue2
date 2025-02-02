class Player {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.isDead = false;
        this.width = 40;
        this.height = 40;
        this.speed = 3;
        this.jump = -10;
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.facingLeft = false;

        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackDuration = 60;
        this.attackDirection = "right";

        this.isDownstriking = false;
        this.downstrikeCooldown = 0;
        this.downstrikeDuration = 30;
        this.downstrikeDamage = 200;

        this.damage = 50;
        this.isDashing = false;
        this.currentScene = 1;
        this.dashCooldown = 0;
        this.dashDuration = 60;
        this.dashSpeed = 15;
        this.artifactCounts = 0;
        this.globalArtifacts = 0;
        this.totalChests = 0;
        this.coinCount = 0;
        this.hearts = 5;
        this.totalKills = 0;

        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    takeDamage(amount) {
console.log("Damage left: " + this.hearts);
this.hearts -= amount;
if (this.hearts < 0) {
    this.hearts = 0;
}
if (this.hearts == 0) {
    this.die();
}
        }
    }

    die() {
        console.log("Player has been defeated!");
        this.isDead = true;
        this.totalKills = 0;
        this.removeFromWorld = true;
    }

    update() {
        if (this.isDead) return;
        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.handleAttack();
        this.handleDash();
        this.updateBoundingBox();
        this.checkComplete();

        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.dashCooldown > 0) this.dashCooldown--;
    }

    handleMovement() {
        

        if (this.game.left) {
            this.x -= this.speed;
            this.attackDirection = "left";
            this.facingLeft = true;
        }
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            this.facingLeft = false;
        }
        if (this.game.isJump && this.isOnGround) {
            this.velocity = this.jump;
            this.isOnGround = false;
        }
        if (this.game.up && this.isOnGround) {
            this.attackDirection = "up";
        }

        if (this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
        }
    }

    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.isOnGround = false;
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
            if (entity instanceof Artifact && this.BB.collide(entity.BB)) {
                this.artifactCounts += 1;
                this.globalArtifacts += 1;
                entity.removeFromWorld = true;
            }
            if (entity instanceof Coins && this.BB.collide(entity.BB)) {
                this.coinCount += 1;
                entity.removeFromWorld = true;
            }
        }
      
    }
    checkComplete() {

        if (this.currentScene === 1) {
            this.level = level1Scene1;
            this.checkObjectives(this.level)
        } else if (this.currentScene === 2) {
            this.level = level1Scene2;
            this.checkObjectives(this.level)
        }
    }

    checkObjectives(level) {
        this.levelO = level;
        if (this.totalKills >= this.levelO.objectives[0].pirates && 
            this.totalChests >= this.levelO.objectives[0].chests && 
            this.artifactCounts >= this.levelO.objectives[0].artifact) {
            this.removechest();
            this.resetValues();
            console.log("Moving to next scene!");
            this.moveToNextScene();
        }
    
    }
    resetValues() {
        this.totalKills = 0;
        this.totalChests = 0;
        this.artifactCounts = 0;
        this.x = 0;
        this.y = 0;
    }

    removechest() {
        for (let entity of this.game.entities) {
            if(entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                entity.removeFromWorld = true;
 
            }
        }
    }

    
    moveToNextScene() {
        this.currentScene++;
        this.game.camera.loadLevel(this.getNextLevel());
    }
    //note: 4 scenes in level 1. current scene values will be 1-4 for level 1 
    getNextLevel() {
        switch (this.currentScene) {
            case 2:
                return level1Scene2;
            default:
                return level1Scene1;
        }
    }
    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackDuration = 60;
            this.attackCooldown = 80;
        }

        if (this.isAttacking && this.attackDuration > 0) {
            this.attackDuration--;
            let attackBB;
            if (this.attackDirection === "right") {
                attackBB = new BoundingBox(this.x + this.width, this.y + 10, 20, 20);
            } else if (this.attackDirection === "left") {
                attackBB = new BoundingBox(this.x - 20, this.y + 10, 20, 20);
            } else if (this.attackDirection === "up") {
                attackBB = new BoundingBox(this.x + 10, this.y - 20, 20, 20);
            }
            for (let entity of this.game.entities) {
                if ((entity instanceof GhostPirate || entity instanceof Pirate) && attackBB.collide(entity.BB)) {
                    entity.takeDamage(this.damage);
                    if (entity.isDead) {
                        this.totalKills++;
                        entity.removeFromWorld = true;
                    }
                }
                if (entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                    this.totalChests += 1;
                    entity.openChest();
                    entity.keepOpen();
                }
            }
        } else {
            this.isAttacking = false;
            this.attackDuration = 60;
        }
    }

    handleDash() {
        if (this.game.dash && this.dashCooldown <= 0 && !this.isDashing && this.isOnGround) {
            this.isDashing = true;
            this.dashCooldown = 60;
        }

        if (this.isDashing && this.dashDuration > 0) {
            this.dashDuration--;
            if (this.attackDirection === "right") {
                this.x += this.dashSpeed;
            } else if (this.attackDirection === "left") {
                this.x -= this.dashSpeed;
            }
        } else if (this.isDashing) {
            this.isDashing = false;
            this.dashDuration = 10;
        }
    }

    updateBoundingBox() {
        if (this.BB.y >= 728) {
            this.x = 0;
            this.y = 0;
            this.takeDamage(1);
            this.BB.x = this.x;
            this.BB.y = this.y;
        }
        this.BB.x = this.x;
        this.BB.y = this.y;
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        if (this.facingLeft) {
            ctx.save();
            ctx.scale(-1, 1);
            ctx.translate(-this.x * 2 - this.width, 0);
        }
        this.currentAnimator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        if (this.facingLeft) {
            ctx.restore();
        }

        // Debug bounding box
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);
    }
}
class Marksman extends Player {
    constructor(game, x, y) {
        super(game, x, y);
        this.characterType = "Marksman";
        this.damage = 30; // Lower damage but ranged attacks
        this.speed = 4; // Slightly faster
        this.assets = {
            idle: ASSET_MANAGER.getAsset("./sprites/marksmentemp.png"),
            walking: ASSET_MANAGER.getAsset("./sprites/marksmenwalkLeft.png"),
            attacking: ASSET_MANAGER.getAsset("./sprites/pirateswordattack.png")
        };
        this.animators = {
            idle: new Animator(this.assets.idle, 0, 0, this.width, this.height, 1, 0.3),
            walking: new Animator(this.assets.walking, 0, 0, this.width, this.height, 8, 0.1),
            attacking: new Animator(this.assets.attacking, 0, 0, this.width, this.height, 3, 0.1)
        };
        this.currentAnimator = this.animators.idle;
    }

    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            let projectile = new Projectile(this.game, this.x, this.y, this.attackDirection, this);
            this.game.addEntity(projectile);
            this.attackCooldown = 100;
        }
    }
}
class Warrior extends Player {
    constructor(game, x, y) {
        super(game, x, y);
        this.characterType = "Warrior";
        this.damage = 50; // Higher damage for melee attacks
        this.health = 120; // More health
        this.assets = {
            idle: ASSET_MANAGER.getAsset("./sprites/warriortemp.png"),
            walking: ASSET_MANAGER.getAsset("./sprites/warriorwalk1.png"),
            attacking: ASSET_MANAGER.getAsset("./sprites/warriorattack.png")
        };
        this.animators = {
            idle: new Animator(this.assets.idle, 0, 0, this.width, this.height, 1, 0.3),
            walking: new Animator(this.assets.walking, 0, 0, 50, this.height, 8, 0.1),
            attacking: new Animator(this.assets.attacking, 0, 0, 45, this.height, 6, 0.1)
        };
        this.currentAnimator = this.animators.idle;
    }
    handleSkill() {
        if (this.game.down && this.game.attack && this.downstrikeCooldown <= 0 && !this.isOnGround) {
            this.isDownstriking = true;
            this.downstrikeCooldown = 60;
            this.velocity = 10;
        } else {
            this.downstrikeCooldown--;
        }
    }
}
class Projectile {
    constructor(game, x, y, direction, player) {
        Object.assign(this, { game, x, y, direction, player});
        this.width = 20;
        this.height = 10;
        this.speed = 5;
        this.damage = 1400;
        this.removeFromWorld = false;
        this.image = ASSET_MANAGER.getAsset("./sprites/heart.png"); //change in future to arrow
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }
        
    update() {
        if (this.direction === "right") {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

        this.BB.x = this.x;
        
        for (let entity of this.game.entities) {
            if ((entity instanceof GhostPirate || entity instanceof Pirate) && this.BB.collide(entity.BB)) {
                entity.takeDamage(this.damage);
                if(entity.isDead) {
                    this.player.totalKills++;
                    //console.log(this.totalKills);
                    entity.removeFromWorld = true;
                }
                this.removeFromWorld = true;
            }
            if((entity instanceof Platform || entity instanceof Chest) && this.BB.collide(entity.boundingBox)) {
                    this.removeFromWorld = true;    //make sure arrow doesnt go through chest or platform
            }
            if(entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                this.player.totalChests += 1;
                entity.openChest();
                entity.keepOpen();  
            }
        }

    }

    draw(ctx) {
        if (this.image) {
            ctx.drawImage(this.image, this.x, this.y+10, this.width, this.height);
        }
    }
}