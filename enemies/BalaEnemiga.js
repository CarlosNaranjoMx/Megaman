var GameEngine = (function(GameEngine) {
    class BalaEnemiga extends GameEngine.Sprite{ 
        constructor(x,y,direction){
            super((x+0.5)*16-5,(y+0.5)*16,16,16,"images/download 3.png",5,16,16);
            this.direction =direction;
            this.framecounter=0;
            // this.animacion=[0,0,1,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3];
            this.activate =true;
            this.actmov =true;
            this.x_ini = (x+0.5)*16-5;
            this.y_ini =(y+0.5)*16;
        }
        update(elapsed){
            if(this.actmov){
                if(this.vx*this.direction*-1 < -350){
                    this.x = this.x_ini;
                    this.y = this.y_ini;
                    this.vx=0;
                }else{
                    this.vx+=-7*this.direction*-1;
                    this.x += -7 * elapsed;
                }
            }
            if(!this.activate){
                this.x=0;
                this.y=0;
            }
            super.update(elapsed);
        }
        render(ctx){
            if(this.activate){
                this.currentFrame= 4;
                super.render(ctx);
            }
        }
    }
    GameEngine.BalaEnemiga = BalaEnemiga;
    return GameEngine;
})(GameEngine || {})