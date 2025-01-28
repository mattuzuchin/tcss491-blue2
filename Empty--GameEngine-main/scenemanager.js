class scenemanager{
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.hearts = 3;
        this.coins = 0;
        this.level = null;
        this.marksmen = new Marksmen(this.game, 2.5 * PARAMS.BLOCKWIDTH, 0 * PARAMS.BLOCKWIDTH);
        this.loadlevel(levelOne, 2.5 * PARAMS.BLOCKWIDTH, 13 * PARAMS.BLOCKWIDTH);
        
    };
    loadlevel(level, x,y){
        this.x = 0;
        if(level.GhostPirate) {
            for (var i = 0; i < level.GhostPirate.length; i++) {
                let ghostPirate = level.GhostPirate[i];
                this.game.addEntity(new GhostPirate(this.game, ghostPirate.x  * PARAMS.BLOCKWIDTH, ghostPirate.y * PARAMS.BLOCKWIDTH));
            }
        }
        if(level.Pirate) {
            for (var i = 0; i < level.Pirate.length; i++) {
                let pirate = level.Pirate[i];
                this.game.addEntity(new Pirate(this.game, pirate.x  * PARAMS.BLOCKWIDTH, pirate.y * PARAMS.BLOCKWIDTH));
            }
        }
        
        this.game.addEntity(this.marksmen);
    };
    
    update() {
        //PARAMS.Debug = document.getElementById("debug").checked;
        let midpoint = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        this.x = this.marksmen.x - midpoint;
        //this.x = this.marksmen.x - midpoint;


    };
    draw(ctx){

    }
}