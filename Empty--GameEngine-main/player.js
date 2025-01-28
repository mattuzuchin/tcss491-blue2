class Player {
    constructor(game, x, y, characterType = "Marksman") {
        Object.assign(this, { game, x, y });
    
        this.characterType = characterType;
        this.width = 40;
        this.height = 40;
        this.speed = 3;
        this.jump = -20;
        this.gravity = 0.5;
        this.velocity = 0;
        this.groundLevel = y;
        this.isOnGround = false;
        this.facingLeft = false; 
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackDuration = 10;
        this.attackDirection = "right";
    
        this.isDashing = false;
        this.dashCooldown = 0;
        this.dashDuration = 10;
        this.dashSpeed = 15;
    
        this.assets = {
            Marksman: ASSET_MANAGER.getAsset("./sprites/marksmenwalkLeft.png"),
            MarksmanIdle: ASSET_MANAGER.getAsset("./sprites/marksmentemp.png"),
            Warrior: ASSET_MANAGER.getAsset("./sprites/warriortemp.png"),
            MarksmanAttack: ASSET_MANAGER.getAsset("./sprites/pirateswordattack.png")
        };
        this.sprite = this.assets[this.characterType];
    
        // TODO: Create animators for different states
        this.animators = {
            idle: new Animator(this.assets.MarksmanIdle, 0, 0, this.width, this.height, 1, 0.3),
            walking: new Animator(this.assets.Marksman, 0, 0, this.width, this.height, 8, 0.1),
            running: 0,
            attacking: new Animator(this.assets.MarksmanAttack, 0, 0, this.width, this.height, 3, .1),
            die: 0,
            jumping: 0,
            falling: 0,
        };
    
        this.currentAnimator = this.animators.idle;
    
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }
    
    update() {
        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.handleAttack(); 
        this.handleDash(); 
        this.updateBoundingBox();
        
        if (this.attackCooldown > 0) this.attackCooldown--;
        if (this.dashCooldown > 0) this.dashCooldown--;
    }

    handleMovement() {
        if (this.game.left) {
            this.x -= this.speed;
            this.attackDirection = "left";
            this.currentAnimator = this.animators.walking;
            this.facingLeft = true; 
            //TODO: flip the animation? or do it in draw, idk
            
        } 
        if (this.game.right) {
            this.x += this.speed;
            this.attackDirection = "right";
            this.currentAnimator = this.animators.walking;
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
            this.currentAnimator = this.animators.idle;
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
        }
    }

    // Attack
    handleAttack() {
        // TODO: create attack splash entity
        if (this.game.attack && this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackCooldown = 30;
        }

        if (this.isAttacking && this.attackDuration > 0) {
            this.attackDuration--;
            this.currentAnimator = this.animators.attacking;
            

        } else {
            this.isAttacking = false;
            this.attackDuration = 10;
        }
    }

    // Dash 
    handleDash() {
        if (this.game.dash && this.dashCooldown <= 0 && !this.isDashing) {
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
    
        // TODO: Draw attack and dash effects 
        if (this.isAttacking) {
            if (this.attackDirection === "right") {
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x + this.width, this.y, 20, 20);
            } else if (this.attackDirection === "left") {
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x - 20, this.y, 20, 20);
            } else if (this.attackDirection === "up") {
                ctx.strokeStyle = "black";
                ctx.strokeRect(this.x, this.y - 20, 20, 20);
            }
        }
    
        if (this.isDashing) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y - 10, this.width, 5);
        }
    }
    
}