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
        this.shopButton = {
            x: 850,
            y: 90,
            width: 100,
            height: 18,
            text: "Shop"
        };
        this.quitButton = {
            x: 850,
            y: 110,
            width: 100,
            height: 18,
            text: "Quit"
        };
        this.shopObject = new Shop(this.gameEngine);
        this.showMenu = false;
        this.showShop = false;
        this.showReset = false;
        this.showQuit = false;
    }

    handleClick(click) {
        //handle when user hits menu
        if (!this.showMenu &&
            click.x >= this.mainMenuButton.x && 
            click.x <= this.mainMenuButton.x + this.mainMenuButton.width &&
            click.y >= this.mainMenuButton.y && 
            click.y <= this.mainMenuButton.y + this.mainMenuButton.height) {
            this.showMenu = true;
            return;
        }
        if (this.showMenu &&
            click.x >= this.mainMenuButton.x && 
            click.x <= this.mainMenuButton.x + 90 &&
            click.y >= this.mainMenuButton.y && 
            click.y <= this.mainMenuButton.y + 40) {
            this.gameEngine.togglePause();
            this.showMenu = false;
            return;
        }

        //handle when user hits shop
        if (!this.showShop && this.showMenu &&
            click.x >= this.shopButton.x && 
            click.x <= this.shopButton.x + this.shopButton.width &&
            click.y >= this.shopButton.y && 
            click.y <= this.shopButton.y + this.shopButton.height) {
            this.showShop = true;
            return;
        }
        if (this.showShop &&
            click.x >= 20 && 
            click.x <= 120 &&
            click.y >= 20 && 
            click.y <= 60) {
            this.showShop = false;
            return;
        }

        //handle when user hits reset
        if (!this.showReset && this.showMenu &&
            click.x >= this.resetButton.x && 
            click.x <= this.resetButton.x + this.resetButton.width &&
            click.y >= this.resetButton.y && 
            click.y <= this.resetButton.y + this.resetButton.height) {
            this.showReset = true;
            return;
        }
    
    }
    update() {
        if (this.gameEngine.click) {
            this.handleClick(this.gameEngine.click);
            this.gameEngine.click = null;  
        }
    }

    drawShop(ctx) {
        //TODO

    }

    drawMainMenu(ctx) {
        //this.gameEngine.togglePause();
        //actual man menu
        ctx.strokeStyle = "#f54242";
        ctx.lineWidth = 3;
        ctx.strokeRect(this.mainMenuButton.x, this.mainMenuButton.y, 
                     90, 40);
        ctx.fillStyle = "black";
        ctx.fillRect(this.mainMenuButton.x, this.mainMenuButton.y, this.mainMenuButton.width, this.mainMenuButton.height);
        //back button for user          
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#f54242";
        ctx.fillText("Back", this.mainMenuButton.x + 90/2, this.mainMenuButton.y + 40/2+4);
        //menu outline
        ctx.lineWidth = 1;
        ctx.strokeRect(this.mainMenuOutline.x,this.mainMenuOutline.y, this.mainMenuOutline.width, this.mainMenuOutline.height);
        ctx.fillStyle = "gray";
        ctx.fillRect(this.mainMenuOutline.x,this.mainMenuOutline.y, this.mainMenuOutline.width, this.mainMenuOutline.height);

        ctx.font = "10px Arial";
        ctx.textAlign = "top";
        ctx.fillStyle = "white";
        ctx.fillText("Main Menu", 850+100/2, 60);

        //menu items
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";

        // reset
        ctx.fillText(this.resetButton.text, this.resetButton.x + this.resetButton.width / 2, this.resetButton.y + this.resetButton.height/2 + 4);
        ctx.strokeRect(this.resetButton.x, this.resetButton.y, this.resetButton.width, this.resetButton.height); 
        
        // shop
        ctx.fillText(this.shopButton.text, this.shopButton.x + this.shopButton.width / 2, this.shopButton.y + this.shopButton.height/2 + 4);
        ctx.strokeRect(this.shopButton.x, this.shopButton.y, this.shopButton.width, this.shopButton.height); 
        
        //quit
        ctx.fillText(this.quitButton.text, this.quitButton.x + this.quitButton.width / 2, this.quitButton.y + this.quitButton.height/2 + 4);
        ctx.strokeRect(this.quitButton.x, this.quitButton.y, this.quitButton.width, this.quitButton.height); 

        if(this.showShop) {
            this.drawShop(ctx);
        } else if (this.showReset) {
                 
            const currentCoins = this.gameEngine.camera.player.coinCount;
            const character = this.gameEngine.camera.character;
            const currentScene = this.player.getNextLevel();
            this.gameEngine.click = null;
            this.gameEngine.mouse = null;
            this.gameEngine.wheel = null;
            this.gameEngine.keys = {};
                
            this.gameEngine.left = false;
            this.gameEngine.right = false;
            this.gameEngine.up = false;
            this.gameEngine.fall = false;
            this.gameEngine.down = false;
            this.gameEngine.isJump = false;
            this.gameEngine.speedup = false;
            this.gameEngine.speed = true;
            this.gameEngine.dash = false;
            this.gameEngine.paused = false;
        
            this.gameEngine.camera = new entitiesmanager(this.gameEngine, character, currentScene);
        
            this.gameEngine.camera.player.coinCount = currentCoins;
             
            this.gameEngine.camera.player.hearts = 5;
            this.gameEngine.camera.isDead = false;
            
        } else {
            //for qui when imoplemnted
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