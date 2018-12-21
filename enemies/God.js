var GameEngine = (function(GameEngine) {
    class God extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,17,21,"images/download 8.png",3,17,21);
            this.activate =true;
        }
        update(elapsed){
            if(!this.activate){
                this.x=0;
                this.y=0;
            }
            super.update(elapsed);
        }
        render(ctx){
            if(this.activate){
                super.render(ctx);
            }
        }
    }
    GameEngine.God = God;
    return GameEngine;
})(GameEngine || {})