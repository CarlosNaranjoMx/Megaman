var GameEngine = (function(GameEngine) {
    let KEY = GameEngine.KEY;
    class Canon {
        constructor(){
            if("images/download.png"){
                this.image = new Image();
                this.image.src = "images/download.png";
            }
            this.x=0;
            this.y=0;
            this.activa = false;
        }
        processInput(){
        }

        dispara(x,y,direction){
            this.x=x;
            this.y=y;
            this.direction=direction;
            if(!this.activa){
                this.activa=true;
            }
        }

        update(elapsed){
            if(this.activa){
                this.x+=this.direction*300*elapsed;
            }
        }
        render(ctx){
            if(this.activa){
                ctx.drawImage(this.image,this.x,this.y);
            }
        }
    }
    GameEngine.Canon = Canon;
    return GameEngine;
})(GameEngine || {})