class MainMenu {
    constructor(gameEngine, player) {
        Object.assign(this, {gameEngine, player});
        this.mainMenuButton = {
            x: this.gameEngine.ctx.canvas.width - 170,
            y: 10,
            width: 90,
            height: 40,
            text: "Menu"
        };
        this.mainMenuOutline= {
            x: 850,
            y: 50,
            width: 100,
            height: 85,
            text: "Main Menu"
        };
        this.resetButton = {
            x: 850,
            y: 70,
            width: 100,
            height: 18,
            text: "Reset"
        }
        this.quitButton = {
            x: 850,
            y: 110,
            width: 100,
            height: 18,
            text: "Quit"
        };
        this.shopObject = new Shop(this.gameEngine, this.player);
        this.showMenu = false;
        this.showShop = false;
        this.showReset = false;
        this.showQuit = false;
    }

    handleClick(click) {
        if (click.x >= this.mainMenuButton.x && 
            click.x <= this.mainMenuButton.x + this.mainMenuButton.width &&
            click.y >= this.mainMenuButton.y && 
            click.y <= this.mainMenuButton.y + this.mainMenuButton.height) {
            this.showMenu = !this.showMenu;
            return;
        }

        this.shopObject.items.forEach((item, index) => {
            let itemX = 250; 
            let itemY = 100 + index * 60;
            let itemWidth = 300;
            let itemHeight = 50;

            if (
                click.x >= itemX && click.x <= itemX + itemWidth &&
                click.y >= itemY && click.y <= itemY + itemHeight
            ) {
                console.log("Clicked on item");
                let result = null;
                if(this.player.hearts >= 4.5 && item.name === "Extra Life") {
                    console.log("Cannot purchase item with 4.5 hearts or more!");
                } else {
                    result = this.shopObject.purchaseItem(item);
                }
                if(result) {
                    if(item.name === "Power Boost") {
                        this.player.power = true;
                    } else if (item.name === "Extra Life") {

                        this.player.hearts +=1;
                        
                    } else if (item.name === "Double Coins") {
                        this.player.coinCount = this.player.coinCount * 2;
                    }
                }
            }
        });
        if (this.showMenu &&
            click.x >= this.shopObject.shopButton.x && 
            click.x <= this.shopObject.shopButton.x + this.shopObject.shopButton.width &&
            click.y >= this.shopObject.shopButton.y && 
            click.y <= this.shopObject.shopButton.y + this.shopObject.shopButton.height) {
            this.showShop = !this.showShop;
            return;
        }

        if (this.showMenu &&
            click.x >= this.resetButton.x && 
            click.x <= this.resetButton.x + this.resetButton.width &&
            click.y >= this.resetButton.y && 
            click.y <= this.resetButton.y + this.resetButton.height) {
            this.showReset = true;
            return;
        }
        //user hits quit
        if (this.showMenu &&
            click.x >= this.quitButton.x && 
            click.x <= this.quitButton.x + this.quitButton.width &&
            click.y >= this.quitButton.y && 
            click.y <= this.quitButton.y + this.quitButton.height) {
            this.showQuit = true;
            return;
        }
    }

    update() {
        if (this.gameEngine.click) {
            this.handleClick(this.gameEngine.click);
            this.gameEngine.click = null;  
        }
    }


    drawMainMenu(ctx) {
        //this.gameEngine.togglePause();
        //actual man menu
        ctx.strokeStyle = "#f54242";
        ctx.lineWidth = 0;
        //back button for user     
        let backButtonImage = ASSET_MANAGER.getAsset("./sprites/background/back.png");
        ctx.drawImage(backButtonImage, 850,10, 100, 40);
        
        //menu outline
        let menuButtonImage = ASSET_MANAGER.getAsset("./sprites/background/outline.png");
        ctx.drawImage(menuButtonImage, 850,50, 100, 85);

        ctx.font = "10px Arial";
        ctx.textAlign = "top";
        ctx.fillStyle = "white";
        ctx.fillText("Main Menu", 850+100/2, 60);

        //menu items
        ctx.fillStyle = "black";
        ctx.strokeStyle = "rgba(1, 1, 1, 0)";
        ctx.font = "12px Arial";
        // reset
        ctx.fillText(this.resetButton.text, this.resetButton.x + this.resetButton.width / 2, this.resetButton.y + this.resetButton.height/2 + 4);
        ctx.strokeRect(this.resetButton.x, this.resetButton.y, this.resetButton.width, this.resetButton.height); 
        
        // shop
        ctx.fillText(this.shopObject.shopButton.text, this.shopObject.shopButton.x + this.shopObject.shopButton.width / 2, this.shopObject.shopButton.y + this.shopObject.shopButton.height/2 + 4);
        ctx.strokeRect(this.shopObject.shopButton.x, this.shopObject.shopButton.y, this.shopObject.shopButton.width, this.shopObject.shopButton.height); 
        
        //quit
        ctx.fillText(this.quitButton.text, this.quitButton.x + this.quitButton.width / 2, this.quitButton.y + this.quitButton.height/2 + 4);
        ctx.strokeRect(this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height); 

        if(this.showShop) {
            this.shopObject.draw(ctx);
        } else if (this.showReset) {
            this.player.reset();
            
        } else if(this.showQuit) {
            this.player.quit();
        }
        
    }

    
    draw(ctx) {
        if (!this.showMenu) {

            ctx.strokeStyle = "#f54242";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.mainMenuButton.x, this.mainMenuButton.y, 
                this.mainMenuButton.width, this.mainMenuButton.height);
            ctx.fillStyle = "black";
            ctx.fillRect(this.mainMenuButton.x, this.mainMenuButton.y, 
                this.mainMenuButton.width, this.mainMenuButton.height);             
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#f54242";
            ctx.fillText(this.mainMenuButton.text, 
                       this.mainMenuButton.x + this.mainMenuButton.width/2, 
                       this.mainMenuButton.y + this.mainMenuButton.height/2+4);
        } else if (this.showMenu) {
            this.drawMainMenu(ctx);
        }
        
        ctx.imageSmoothingEnabled = false;
    }
}