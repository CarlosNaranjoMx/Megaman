var GameEngine = (function(GameEngine) {
    class Eye extends GameEngine.Sprite{
        constructor(x,y){
            super((x+.5)*16,(y+0.5)*16,16,16,"images/download 6.png",3,16,16);
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
    GameEngine.Eye = Eye;
    return GameEngine;
})(GameEngine || {})