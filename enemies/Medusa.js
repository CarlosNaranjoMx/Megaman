var GameEngine = (function(GameEngine) {
    class Medusa extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,14,19,"images/download 7.png",2,14,19);
            this.activate =true;
            this.framecounter=0;
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
                this.framecounter = (this.framecounter+1)%12;
                this.currentFrame= parseInt(this.framecounter/6);
                super.render(ctx);
            }
        }
    }
    GameEngine.Medusa = Medusa;
    return GameEngine;
})(GameEngine || {})