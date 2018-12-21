var GameEngine = (function(GameEngine) {
    class TrituraHuesos extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,32,48,"images/download 10.png",2,32,48);
        }
        update(elapsed){
            super.update(elapsed);
        }
        render(ctx){
            super.render(ctx);
        }
    }
    GameEngine.TrituraHuesos = TrituraHuesos;
    return GameEngine;
})(GameEngine || {})