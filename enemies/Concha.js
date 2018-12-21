var GameEngine = (function(GameEngine) {
    class Concha extends GameEngine.Sprite{ 
        constructor(x,y,direction){
            super((x+0.5)*16,(y+0.5)*16,16,16,"images/download 3.png",5,16,16);
            this.direction =direction;
            this.framecounter=0;
            this.animacion=[0,0,1,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            this.activate =true;
            this.balaenemiga = new GameEngine.BalaEnemiga(x,y,direction);
        }
        update(elapsed){
            if(!this.activate){
                this.x=0;
                this.y=0;
                this.balaenemiga.x=0;
                this.balaenemiga.y=0;
                this.balaenemiga.activate=false;
            }
            super.update(elapsed);
            this.balaenemiga.update(elapsed);
        }
        render(ctx){
            if(this.activate){
                this.framecounter = (this.framecounter+1)%50;
                this.currentFrame= this.animacion[this.framecounter];
                this.balaenemiga.render(ctx);
                super.render(ctx);
            }
        }
    }
    GameEngine.Concha = Concha;
    return GameEngine;
})(GameEngine || {})