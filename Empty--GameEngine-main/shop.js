class Shop {
    constructor(gameEngine, player, x, y) {
        Object.assign(this, { gameEngine, player, x, y });

        this.width = 50;
        this.height = 50;
        this.playerInRange = false;
        this.powerBoostImage = ASSET_MANAGER.getAsset("./sprites/interactive entities/strong.png");
        this.extraLifeImage = ASSET_MANAGER.getAsset("./sprites/player entities/heart.png");
        this.invincibilityImage = ASSET_MANAGER.getAsset("./sprites/player entities/shield.png");
        this.doubleCoinsImage = ASSET_MANAGER.getAsset("./sprites/interactive entities/coin.png");
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/interactive entities/shop.png");
        this.animator = new Animator(this.spritesheet, 0, 0, this.width, this.height, 4, 0.5);
        this.items = [
            { name: "Power Boost", cost: 50, image: this.powerBoostImage },
            { name: "Extra Life", cost: 25, image: this.extraLifeImage },
            { name: "Double Coins", cost: 30, image: this.doubleCoinsImage },
            { name: "Invincibility", cost: 100, image: this.invincibilityImage}
        ];
    }

    purchaseItem(item) {
        let bought = false;
        if (this.player.coinCount >= item.cost) {
            this.player.coinCount -= item.cost;
            this.player.playSound("purchasegood");
            this.player.activateMessage("Purchased!", this.player.x, this.player.y);
            bought = true;
        } else {
            this.player.activateMessage("You are too poor!", this.player.x, this.player.y);
        }
        return bought;
    }
    update() {
        const playerCenterX = this.player.x + (this.player.width / 2);
        const playerCenterY = this.player.y + (this.player.height / 2);

        const inRangeX = playerCenterX >= this.x && playerCenterX <= this.x + this.width;
        const inRangeY = playerCenterY >= this.y && playerCenterY <= this.y + this.height;
        
        this.playerInRange = inRangeX && inRangeY;
        if (this.gameEngine.click && this.playerInRange) {
            this.handleClick(this.gameEngine.click);
        }
    }

    draw(ctx) {

        ctx.imageSmoothingEnabled = false;
        this.animator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y);
        if (this.playerInRange) {
            this.items.forEach((item, index) => {
                const itemX = this.x - 70 + (index * 50);
                const itemY = this.y - 50;
                const itemWidth = 40;
                const itemHeight = 40;
                
                ctx.strokeStyle = "gold";
                ctx.strokeRect(itemX, itemY, itemWidth, itemHeight);
      
                if (item.image) {
                    const imageSize = 30;
                    const imageX = itemX + (itemWidth - imageSize) / 2;
                    const imageY = itemY + (itemHeight - imageSize) / 2 - 5;
                    ctx.drawImage(item.image, imageX, imageY, imageSize, imageSize);
                }
                
    
                ctx.fillStyle = "white";
                ctx.font = "8px Arial";
                ctx.textAlign = "center";
                ctx.fillText(`${item.cost} Coins`, itemX + itemWidth/2, itemY + itemHeight - 5);
            }); 
        }
    }
    

    handleClick(click) {
        if (!this.playerInRange) return;
        
        this.items.forEach((item, index) => {
            const itemX = this.x - 70 + (index * 50);
            const itemY = this.y - 50;
            const itemWidth = 40;
            const itemHeight = 40;
            
            if (
                click.x >= itemX && click.x <= itemX + itemWidth &&
                click.y >= itemY && click.y <= itemY + itemHeight
            ) {
                console.log("Clicked on shop item:", item.name);
                
                let result = null;
                if (this.player.hearts >= 4.5 && item.name === "Extra Life") {
                    this.player.activateMessage("Enough coins, but too many hearts!", this.player.x, this.player.y);
                } else {
                    result = this.purchaseItem(item);
                }
            
                if (result) {
                    if (item.name === "Power Boost") {
                        this.player.power = true;
                    } else if (item.name === "Extra Life") {
                        this.player.hearts += 1;
                    } else if (item.name === "Double Coins") {
                        this.player.isDouble = true;
                    } else if (item.name === "Invincibility") {
                        this.player.setInvincible();
                    }
                }
            }
        });
    }
}