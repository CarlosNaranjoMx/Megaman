var GameEngine = (function(GameEngine) {
    class ElCutman extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,30,32,"images/download 2.png",16,30,32);
        }
        update(elapsed){
            super.update(elapsed);
        }
        render(ctx){
            super.render(ctx);
        }
    }
    GameEngine.ElCutman = ElCutman;
    return GameEngine;
})(GameEngine || {})