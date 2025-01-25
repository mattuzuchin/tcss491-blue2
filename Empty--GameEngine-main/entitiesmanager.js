class entitiesmanager {
    constructor(game) {
        this.game = game;
        this.level = null;
        this.player = new Marksmen(this.game, 0,0);
        this.loadLevel(levelOne);

    };

    loadLevel(level) {
        this.level = level;
        this.x = 0;

        if(level.ghostpirate) {
            for (var i = 0; i < level.ghostpirate.length; i++) {
                let ghostpirate = level.ghostpirate[i];
                this.game.addEntity(new GhostPirate(this.game, ghostpirate.x , ghostpirate.y));
            }
        }
        this.game.addEntity(this.player);


    };
    update() {

    };
    draw(ctx ){

    };
}   