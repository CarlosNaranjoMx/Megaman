var GameEngine = (function(GameEngine) {  
    class Helicopter extends GameEngine.Sprite{
        constructor(x,y){
            super(F.posEscC(x),F.posEscC(y),16,20,"images/enemy01.png",2,16,20);
            this.x = F.posEscC(x);
            this.y = F.posEscC(y);
            this.activate = true;
            this.actmov = false;
            this.framecounter=0;
            this.vx=0;
        }
        update(elapsed){
            if(this.actmov){
                this.vx+=-5;
                this.x += -5 * elapsed;
            }
            if(!this.activate){
                this.x=0;
                this.y=0;
            }
            super.update(elapsed);
        }
        render(ctx){
            if(this.activate){
                this.framecounter = (this.framecounter+1)%2;
                this.currentFrame= this.framecounter;
                super.render(ctx);
            }
        }
    }
    GameEngine.Helicopter = Helicopter;
    return GameEngine;
})(GameEngine || {})