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
        
        
        //quit
        ctx.fillText(this.quitButton.text, this.quitButton.x + this.quitButton.width / 2, this.quitButton.y + this.quitButton.height/2 + 4);
        ctx.strokeRect(this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height); 

        if (this.showReset) {
            this.player.reset();
            
        } else if(this.showQuit) {
            this.player.quit();
        }
        
    }

    
    draw(ctx) {
        if (!this.showMenu) {
            let mainButtonImage = ASSET_MANAGER.getAsset("./sprites/background/mainmenubutton.png");
            ctx.drawImage(mainButtonImage, this.mainMenuButton.x,this.mainMenuButton.y, 100, 40);
        } else {
            this.drawMainMenu(ctx);
        }
        
        ctx.imageSmoothingEnabled = false;
    }
}