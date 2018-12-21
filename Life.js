var GameEngine = (function(GameEngine) {
    class Life {
        constructor(){
            this.contador=28;
            if ("images/life.png") {
                this.image = new Image();
                this.image.src = "images/life.png";
            }
        }
        processInput(){}
        update(elapsed){}
        render(ctx,x,y){
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "yellow";
            let j=48;
            for (let i= 0; i < this.contador; i++) {
                ctx.drawImage(this.image,x - 103,y - j, 6,1); 
                // ctx.rect(x - 102,y - j, 4, 0.009);
                j += 2;
            }
            ctx.stroke();
            ctx.closePath();
        }
    }
    GameEngine.Life = Life;
    return GameEngine;
})(GameEngine || {})