class TitleScreen {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.startGame = false;
        this.showCredits = false;
        this.showHow = false;
        this.gameEngine.camera = this;
        this.characters = [
            { name: "Marksman", sprite: ASSET_MANAGER.getAsset("./sprites/player entities/marksmentemp.png") },
            { name: "Warrior", sprite: ASSET_MANAGER.getAsset("./sprites/player entities/warriortemp.png") },
            { name: "Mage", sprite: ASSET_MANAGER.getAsset("./sprites/player entities/Magetemp.png") }
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
        this.gameEngine.backgroundMusic.pause();
        this.gameEngine.backgroundMusic.currentTime = 0;
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
        let backButtonImage = ASSET_MANAGER.getAsset("./sprites/background/back.png");
        ctx.drawImage(backButtonImage, 20,20, this.howButton.width, this.howButton.height);
        let enemy = ASSET_MANAGER.getAsset("./sprites/enemy entities/ghostpiratestand.png");
        let enemy2 = ASSET_MANAGER.getAsset("./sprites/enemy entities/piratestand.png");
        let title = ASSET_MANAGER.getAsset("./sprites/background/title.png");
        let controls = ASSET_MANAGER.getAsset("./sprites/background/gamecontrol.png");
        let sword =  ASSET_MANAGER.getAsset("./sprites/background/swordback.png");
        ctx.save();
        ctx.drawImage(enemy, 305,0, 40*1.5, 40*1.5);
        ctx.drawImage(title, 355, 500, 80*4, 50*4);
        ctx.drawImage(controls, 575, 413, 39, 17);
        ctx.drawImage(sword, 600, 150, 40, 40);
        ctx.translate(650 + 60, 0); 
        ctx.scale(-1, 1);
        ctx.drawImage(enemy2, 0,0, 40*1.5, 40*1.5);
        ctx.restore();
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.font = "36px 'Press Start 2P', sans-serif";
        ctx.fillText("HOW TO PLAY", ctx.canvas.width / 2, 100);
        
        ctx.font = "15px 'Press Start 2P', sans-serif";
        ctx.fillText("Objectives", ctx.canvas.width / 2, 180);
        ctx.font = "11px Arial";
        ctx.fillText("There are multiple scenes per level. With a total of 4 levels to complete. Level 2/4 will have a boss at the end. In different scenes, there is an artifact you must collect.", ctx.canvas.width / 2, 220);
        ctx.fillText("The final artifact will always be with the boss. You must kill all entities, collect all chests, and get the artifact (in any) in order to advance to the next scene.", ctx.canvas.width / 2, 250);
        ctx.fillText("Chests can spawn a powerup, allowing you to KILL 5 ENEMIES. Regular damage resumes after. There are extra potions around the map such as extra hearts.", ctx.canvas.width / 2, 280);
        ctx.fillText("It takes 3 hits to kill special enemies, and 2 for regular enemies. Every 5 enemies you kill will activate your special attack.", ctx.canvas.width / 2, 310);
        ctx.font = "15px 'Press Start 2P', sans-serif";
        ctx.fillText("Extras", ctx.canvas.width / 2, 350);
        ctx.font = "11px Arial";
        ctx.fillText("There is a shop where users can buy multiple items (hearts, damage, and x2 coins). The shop will spawn every other level and boss levels.", ctx.canvas.width / 2, 380);
        
        ctx.font = "15px 'Press Start 2P', sans-serif";
        ctx.fillText("Controls", ctx.canvas.width / 2, 430);
        ctx.font = "11px Arial";
        ctx.fillText("Movement is with arrow keys (L-R-U-D). S = dash, D = attack, SpaceBar = Jump, and Shift = sprint, F = special attack", ctx.canvas.width / 2, 460);
    }
    drawCreditsScreen(ctx) {

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, 100, 40);
        ctx.fillStyle = "#FFFFFF";

        let backButtonImage = ASSET_MANAGER.getAsset("./sprites/background/back.png");
        ctx.drawImage(backButtonImage, 20,20, this.howButton.width, this.howButton.height);
        
        ctx.font = "36px 'Press Start 2P', sans-serif";
        ctx.fillText("Credits", ctx.canvas.width / 2, 100);
        
        ctx.font = "24px 'Press Start 2P', sans-serif";
        ctx.fillText("Game Development Team", ctx.canvas.width / 2, 180);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, and Minh", ctx.canvas.width / 2, 220);
        
        ctx.font = "24px 'Press Start 2P', sans-serif";
        ctx.fillText("Artwork", ctx.canvas.width / 2, 280);
        ctx.font = "20px Arial";
        ctx.fillText("Matthew, Liam, Anthony, and Minh.", ctx.canvas.width / 2, 320);
        ctx.fillText("Also courtesy of Jemastock for the Death Image and PixilArt (Robonkey, CodeMaster111) for the Menu Buttons", ctx.canvas.width / 2, 350);
        ctx.font = "24px 'Press Start 2P', sans-serif";
        ctx.fillText("Music", ctx.canvas.width / 2, 390);
        ctx.font = "20px Arial";
        ctx.fillText("BOSSFIGHT", ctx.canvas.width / 2, 420);
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
                ctx.font = "35px 'Press Start 2P', sans-serif";
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
    
                    ctx.font = "12px 'Press Start 2P', sans-serif";
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