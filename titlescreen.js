class TitleScreen {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.startGame = false;
        this.showCredits = false;
        this.showHow = false;
        this.gameEngine.camera = this;
        this.characters = [
            { name: "Marksman", sprite: ASSET_MANAGER.getAsset("./sprites/player entities/marksmentemp.png") },
            { name: "Warrior", sprite: ASSET_MANAGER.getAsset("./sprites/player entities/warriortemp.png") }
        ];
        
        this.selectedCharacter = null;
        this.titleY = 100;
        this.charactersStartY = 500;
        this.characterSpacing = 200;
        this.characterBoxSize = 150;
        this.creditsButton = {
            x: this.gameEngine.ctx.canvas.width - 120,
            y: this.gameEngine.ctx.canvas.height - 60,
            width: 100,
            height: 40
        };

        this.howButton = {
            x: this.gameEngine.ctx.canvas.width - 120,
            y: this.gameEngine.ctx.canvas.height - 120,
            width: 100,
            height: 40
        };
    }

    handleClick(click) {

        if (!this.showCredits &&
            click.x >= this.creditsButton.x && 
            click.x <= this.creditsButton.x + this.creditsButton.width &&
            click.y >= this.creditsButton.y && 
            click.y <= this.creditsButton.y + this.creditsButton.height) {
            this.showCredits = true;
            return;
        }
        if (this.showCredits &&
            click.x >= 20 && 
            click.x <= 120 &&
            click.y >= 20 && 
            click.y <= 60) {
            this.showCredits = false;
            return;
        }

        if (!this.showHow &&
            click.x >= this.howButton.x && 
            click.x <= this.howButton.x + this.howButton.width &&
            click.y >= this.howButton.y && 
            click.y <= this.howButton.y + this.howButton.height) {
            this.showHow = true;
            return;
        }
        if (this.showHow &&
            click.x >= 20 && 
            click.x <= 120 &&
            click.y >= 20 && 
            click.y <= 60) {
            this.showHow = false;
            return;
        }
        if (!this.showCredits) {
            this.characters.forEach((char, index) => {
                const boxX = (this.gameEngine.ctx.canvas.width / 2) - (this.characterSpacing * (this.characters.length - 1) / 2) + (index * this.characterSpacing);
                const boxY = this.charactersStartY;

                if (click.x >= boxX - this.characterBoxSize/2 && 
                    click.x <= boxX + this.characterBoxSize/2 &&
                    click.y >= boxY && 
                    click.y <= boxY + this.characterBoxSize) {
                    
                    this.selectedCharacter = char.name.toLowerCase();
                    this.startGame = true;
                    this.startNewGame();
                }
            });
        }
    }

    startNewGame() {
        this.gameEngine.entities = [];
        new entitiesmanager(this.gameEngine, this.selectedCharacter, level1Scene1);
    }

    update() {
        if (this.gameEngine.click && !this.startGame) {
            this.handleClick(this.gameEngine.click);
            this.gameEngine.click = null;  
        }
    }

    drawHowScreen(ctx) {

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 100, 40);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Back", 70, 47); 

        let backButtonImage = ASSET_MANAGER.getAsset("./sprites/background/back.png");
        ctx.drawImage(backButtonImage, 20,20, this.howButton.width, this.howButton.height);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.font = "36px Arial";
        ctx.fillText("HOW TO PLAY", ctx.canvas.width / 2, 100);
        
        ctx.font = "24px Arial";
        ctx.fillText("Objectives", ctx.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText("There are multiple scenes per level. With a total of 4 levels to complete. Each level will have a boss at the end.", ctx.canvas.width / 2, 220);
        ctx.fillText("In each scene, there is an artifact you must collect. The final artifact for that level will be when you beat the boss", ctx.canvas.width / 2, 250);
        ctx.fillText("You must kill all entities, collect all chests, and get the artifact in order to advance to the next scene.", ctx.canvas.width / 2, 280);

        ctx.font = "24px Arial";
        ctx.fillText("Extras", ctx.canvas.width / 2, 340);
        ctx.font = "20px Arial";
        ctx.fillText("There is a shop where users can buy multiple items (hearts, damage, etc.).", ctx.canvas.width / 2, 370);
        
        ctx.font = "24px Arial";
        ctx.fillText("Controls", ctx.canvas.width / 2, 430);
        ctx.font = "20px Arial";
        ctx.fillText("Movement is with arrow keys (L-R-U-D). S = dash, D = attack, SpaceBar = Jump, and Shift = sprint", ctx.canvas.width / 2, 460);
    }
    drawCreditsScreen(ctx) {

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 100, 40);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "24px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Back", 70, 47); 

        let backButtonImage = ASSET_MANAGER.getAsset("./sprites/background/back.png");
        ctx.drawImage(backButtonImage, 20,20, this.howButton.width, this.howButton.height);
        
        ctx.font = "36px Arial";
        ctx.fillText("Credits", ctx.canvas.width / 2, 100);
        
        ctx.font = "24px Arial";
        ctx.fillText("Game Development Team", ctx.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, and Minh", ctx.canvas.width / 2, 220);
        
        ctx.font = "24px Arial";
        ctx.fillText("Artwork", ctx.canvas.width / 2, 280);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, and Minh.", ctx.canvas.width / 2, 320);
        ctx.fillText("Also courtesy of Jemastock for the Death Image and PixilArt (Robonkey, CodeMaster111) for the Menu Buttons", ctx.canvas.width / 2, 350);
        ctx.fillText("Music", ctx.canvas.width / 2, 380);
        ctx.font = "20px Arial";
        ctx.fillText("tbd", ctx.canvas.width / 2, 420);
    }

    draw(ctx) {
        if (!this.startGame) {
            if (this.showCredits) {
                this.drawCreditsScreen(ctx);
            } else if (this.showHow) {
                this.drawHowScreen(ctx);
            } else {
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "48px Arial";
                ctx.textAlign = "center";
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/background/title.png"), ctx.canvas.width / 5, this.titleY - 100, 600, 400);
                ctx.fillText("Select Your Character", ctx.canvas.width / 2, this.titleY + 350);
    
                this.characters.forEach((char, index) => {
                    const boxX = ctx.canvas.width / 2 - (this.characterSpacing * (this.characters.length - 1) / 2) + (index * this.characterSpacing);
                    const boxY = this.charactersStartY;
    
                    ctx.strokeStyle = "#FFFFFF";
                    ctx.lineWidth = 2;
                    ctx.strokeRect(boxX - this.characterBoxSize / 2, boxY, this.characterBoxSize, this.characterBoxSize);
    
                    ctx.drawImage(char.sprite,
                        boxX - this.characterBoxSize / 4,
                        boxY + this.characterBoxSize / 4,
                        this.characterBoxSize / 2,
                        this.characterBoxSize / 2);
    
                    ctx.font = "24px Arial";
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fillText(char.name, boxX, boxY + this.characterBoxSize + 30);
                });
    
                let creditsButtonImage = ASSET_MANAGER.getAsset("./sprites/background/creditsbutton.png");
                ctx.drawImage(creditsButtonImage, this.creditsButton.x, this.creditsButton.y, this.creditsButton.width, this.creditsButton.height);

                let howToPlayButtonImage = ASSET_MANAGER.getAsset("./sprites/background/howtoplay.png");
                ctx.drawImage(howToPlayButtonImage, this.howButton.x,this.howButton.y, this.howButton.width, this.howButton.height);
            }
    
            ctx.imageSmoothingEnabled = false;
        }
    }
  
}