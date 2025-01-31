class Player {
    constructor(game, x, y, characterNumber) { 
        Object.assign(this, { game, x, y });

        const characterTypes = ["Marksman", "Warrior"];
        this.characterType = characterTypes[characterNumber] || "Marksman"; 
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
        this.damage = 50;
        this.health = 100;
        this.isDashing = false;
        this.currentScene = 1;
        this.dashCooldown = 0;
        this.dashDuration = 60;
        this.dashSpeed = 15;
        this.artifactCounts = 0;
        this.totalChests = 0;
        this.assets = {
            Marksman: ASSET_MANAGER.getAsset("./sprites/marksmenwalkLeft.png"),
            MarksmanIdle: ASSET_MANAGER.getAsset("./sprites/marksmentemp.png"),
            WarriorIdle: ASSET_MANAGER.getAsset("./sprites/warriortemp.png"),
            WarriorAttack: ASSET_MANAGER.getAsset("./sprites/warriorattack.png"),
            Warrior: ASSET_MANAGER.getAsset("./sprites/warriorwalk1.png"),
            MarksmanAttack: ASSET_MANAGER.getAsset("./sprites/pirateswordattack.png")
        };
        this.sprite = this.assets[this.characterType];
    
        this.animators = {
            Marksman: {
                idle: new Animator(this.assets.MarksmanIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Marksman, 0, 0, this.width, this.height, 8, 0.1),
                attacking: new Animator(this.assets.MarksmanAttack, 0, 0, this.width, this.height, 3, 0.1),
            },
            Warrior: {
                idle: new Animator(this.assets.WarriorIdle, 0, 0, this.width, this.height, 1, 0.3),
                walking: new Animator(this.assets.Warrior, 0, 0, 50, this.height, 8, 0.1),
                attacking: new Animator(this.assets.WarriorAttack, 0, 0, 45, this.height, 6, 0.1),
            }
        };
    
        this.currentAnimator = this.animators[this.characterType].idle;
        
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
        this.coinCount = 0;
        this.hearts = 5;
        this.totalKills = 0;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log("Damage left: " + this.health);
        this.hearts = this.hearts - .5;
        if (this.health <= 0) {
            this.die(); 
        }
    }

    die() {
        console.log("player has been defeated!");
        this.isDead = true;
        this.totalKills = 0;
        this.removeFromWorld=true;
        
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
            this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = true; 
   
            
        } 
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            this.currentAnimator = this.animators[this.characterType].walking;
            this.facingLeft = false;
 
            
        } 
        if (this.game.isJump && this.isOnGround) {
            this.velocity = this.jump;
            this.isOnGround = false;
        } 
        if (this.game.up && this.isOnGround) {
            this.attackDirection = "up";
        } 
        
        if (!this.game.left && !this.game.right) {

            this.currentAnimator = this.animators[this.characterType].idle;
            
        }

        if (this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
        }
    }
    
    // gravity
    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
        this.isOnGround = false;
    }
    
    // collision handling
    handleCollisions() {
        // stop falling below the canvas
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
                entity.removeFromWorld = true;
                console.log(this.artifactCounts);
    

            }
            if(entity instanceof Coins && this.BB.collide(entity.BB)) {
                this.coinCount += 1;
                entity.removeFromWorld = true;
            }
        }
    }

    checkComplete() {
        if(this.currentScene == 1) {
            this.level = level1Scene1;
            if((this.totalKills == this.level.objectives[0].pirates) && (this.totalChests == this.level.objectives[0].chests) && (this.artifactCounts == this.level.objectives[0].artifact)) {
                console.log("next scene!");
            }
        }
    }
    handleAttack() {
    
        if (this.characterType === "Marksman" && this.game.attack && this.attackCooldown <= 0) {
            let projectile = new Projectile(this.game, this.x, this.y, this.attackDirection, this);
            this.game.addEntity(projectile);
            console.log(this.totalKills);
            this.attackCooldown = 100;
        } else {
            if (this.game.attack && this.attackCooldown <= 0) {
                this.isAttacking = true; 
                this.attackDuration = 60; 
                this.attackCooldown = 80;
            }
        
            if (this.isAttacking && this.attackDuration > 0) {
                this.attackDuration--;
                this.currentAnimator = this.animators[this.characterType].attacking;

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
                            console.log(this.totalKills);
                            entity.removeFromWorld = true;
                        }
                    }
                    if(entity instanceof Chest && this.BB.collide(entity.boundingBox)) {
                        this.totalChests += 1;
                        console.log(entity);
                        //entity.openChest();
                        //entity.removeFromWorld = true;
                    }
                }
                
            
            } else {
                
                this.isAttacking = false;
                this.attackDuration = 60; 
            }
        }
    }
    
    

    // Dash 
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
            //TODO: may not used for can be cool if dash diagonally
            // else if (this.attackDirection === "up") {
            //     this.y -= this.dashSpeed;
            // }
        } else if (this.isDashing) {
            this.isDashing = false;
            this.dashDuration = 10; 
        }
    }

    updateBoundingBox() {
        if(this.BB.y >= 728) {
            this.x = 0;
            this.y = 0;
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

class Projectile {
    constructor(game, x, y, direction, player) {
        Object.assign(this, { game, x, y, direction, player});
        this.width = 20;
        this.height = 10;
        this.speed = 5;
        this.damage = 400;
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
                //entity.removeFromWorld = true;
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