var GameEngine = (function(GameEngine) {
    class Friend extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,13,16,"images/download 13.png",2,13,16);
        }
        update(elapsed){
            super.update(elapsed);
        }
        render(ctx){
            super.render(ctx);
        }
    }
    GameEngine.Friend = Friend;
    return GameEngine;
})(GameEngine || {})