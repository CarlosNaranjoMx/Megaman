var GameEngine = (function(GameEngine) {
    class Pacman extends GameEngine.Sprite{
        constructor(x,y){
            super((x+0.5)*16,(y+0.5)*16,16,20,"images/download 4.png",2,16,20);
            this.activate =true;
            this.framecounter=0;
            this.actmov=false;
            this.count =0;
            this.movx =[-15,-110,-120,-130,-13,-13,-30,-30,-300,-300,-30,-30,-30, -30, -30,-30,-30,-30,
                -30,-30,-30,-30,-30,-30,-30];
            this.movy =[-15,-130,-150,-150,-15,-15,-15,-15,  15,  10, 13, 14, 15, 500, 500, 50, 50, 50,
                 50, 50, 50, 50, 50, 50, 50];
        }
        update(elapsed){
            if(this.actmov){
                this.x += this.movx[this.count] * elapsed;
                this.y += this.movy[this.count] * elapsed;
                this.count = (this.count+1)%this.movx.length;
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
    GameEngine.Pacman = Pacman;
    return GameEngine;
})(GameEngine || {})