class scenemanager{
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.hearts = 3;
        this.coins = 0;
        this.level = null;
        this.marksmen = new Marksmen(this.game, 0, 0);
        this.loadlevel(levelOne);
        
    };
    loadlevel(level, x,y){
        this.x = 0;
        if(level.cloud) {
            for (var i = 0; i < level.cloud.length; i++) {
                let cloud = level.cloud[i];
                this.game.addEntity(new cloud(this.game, cloud.x, cloud.y));
            }
        }
        if(level.GhostPirate) {
            for (var i = 0; i < level.GhostPirate.length; i++) {
                let ghostPirate = level.GhostPirate[i];
                this.game.addEntity(new GhostPirate(this.game, ghostPirate.x , ghostPirate.y ));
            }
        }
        if(level.Pirate) {
            for (var i = 0; i < level.Pirate.length; i++) {
                let pirate = level.Pirate[i];
                this.game.addEntity(new Pirate(this.game, pirate.x , pirate.y ));
            }
        }
        if (level.platforms) {
            for (let i = 0; i < level.platforms.length; i++) {
                let platform = level.platforms[i];
                this.game.addEntity(new Platform(platform.x, platform.y, platform.width, platform.height));
            }
        }
        
        this.game.addEntity(this.marksmen);
    };
    
    update() {
        //PARAMS.Debug = document.getElementById("debug").checked;
        let midpoint = 1024 / 2 - 16 / 2;
        this.x = this.marksmen.x - midpoint;
        //this.x = this.marksmen.x - midpoint;


    };
    draw(ctx){

    }
}