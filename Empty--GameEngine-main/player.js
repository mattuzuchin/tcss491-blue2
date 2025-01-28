class Player {
    constructor(game, x, y, characterType = "marksmen") {
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

        // Attack
        this.isAttacking = false;
        this.attackCooldown = 0;
        this.attackDuration = 10;
        this.attackDirection = "right";

        // Dash
        this.isDashing = false;
        this.dashCooldown = 0;
        this.dashDuration = 10;
        this.dashSpeed = 15;

        this.assets = {
            marksmen: ASSET_MANAGER.getAsset("./sprites/piratewalk.png"),
            marksmenWalk: ASSET_MANAGER.getAsset("./sprites/piratestand.png"),
            marksmenAttack: ASSET_MANAGER.getAsset("./sprites/pirateswordattack.png"),
            warrior: ASSET_MANAGER.getAsset("./sprites/warriortemp.png"),
        };
        this.sprite = this.assets[this.characterType];

        this.animator = new Animator(this.sprite, 0, 0, this.width, this.height, 3, 0.1);
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);

        this.facingLeft = false; // Tracks which way the character is facing
    }

    update() {
        this.handleMovement();
        this.handleGravity();
        this.handleCollisions();
        this.handleAttack();
        this.handleDash();
        this.updateBoundingBox();

        // Attack cooldown
        if (this.attackCooldown > 0) this.attackCooldown--;
        // Dash cooldown
        if (this.dashCooldown > 0) this.dashCooldown--;
    }

    handleMovement() {
        let isMoving = false;
        if (this.game.left) {
            this.x -= this.speed;
            isMoving = true;
            this.attackDirection = "left";
            this.facingLeft = true; 
        }
        if (this.game.right) {
            this.x += this.speed;
            isMoving = true;
            this.attackDirection = "right";
            this.facingLeft = false; 
        }

        if (this.game.isJump && this.isOnGround) {
            this.velocity = this.jump;
            this.isOnGround = false;
        }
        if (this.game.up) {
            this.attackDirection = "up";
        }

        if (this.game.speedup) {
            this.speed = 6;
        } else {
            this.speed = 3;
        }

        if (isMoving) {
            if (this.animator.spritesheet !== this.assets.marksmen) {
                this.animator = new Animator(this.assets.marksmen, 0, 0, this.width, this.height, 3, 0.1);
            }
        } else {
            if (this.animator.spritesheet !== this.assets.marksmenWalk) {
                this.animator = new Animator(this.assets.marksmenWalk, 0, 0, this.width, this.height, 1, 0.1);
            }
        }
    }

    handleGravity() {
        this.velocity += this.gravity;
        this.y += this.velocity;
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
        }
    }

    handleAttack() {
        if (this.game.attack && this.attackCooldown <= 0) {
            this.isAttacking = true;
            this.attackCooldown = 30;
            this.animator = new Animator(this.assets.marksmenAttack, 0, 0, this.width, this.height, 3, 0.1);
        }

        if (this.isAttacking && this.attackDuration > 0) {
            this.attackDuration--;
        } else {
            this.isAttacking = false;
            this.attackDuration = 10;
        }
    }

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
            } else if (this.attackDirection === "up") {
                this.y -= this.dashSpeed;
            }
        } else if (this.isDashing) {
            this.isDashing = false;
            this.dashDuration = 10;
        }
    }

    updateBoundingBox() {
        // Recalculate bounding box based on position
        this.BB = new BoundingBox(this.x, this.y, this.width, this.height);
    }

    draw(ctx) {
        ctx.imageSmoothingEnabled = false;

        if (this.facingLeft) {
            ctx.save();
            ctx.scale(-1, 1); 
            ctx.translate(-this.x * 2 - this.width, 0); 
        }

        // Draw character
        this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);

        if (this.facingLeft) {
            ctx.restore();
        }

        // Debug bounding box
        ctx.strokeStyle = "red";
        ctx.strokeRect(this.BB.x, this.BB.y, this.BB.width, this.BB.height);


        if (this.isAttacking) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(
                this.attackDirection === "right" ? this.x + this.width : this.x - 20,
                this.y,
                20,
                20
            );
        }

        // Debug dash
        if (this.isDashing) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y - 10, this.width, 5);
        }
    }
}
