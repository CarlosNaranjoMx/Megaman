/**
 * (1)Actualiza la velocidad en y si no esta en la escalera
 */
var GameEngine = (function(GameEngine) {
  let gravity = 100;
  let count =0;

  let KEY = GameEngine.KEY;

  let Edos = {
    Piso: false,
    canJump: true,
    tryGrabLadder: false
  };

  class Player extends GameEngine.Sprite {
    constructor(x, y, w, h) {
      super(x, y, w, h, "images/player.svg", 14, 32, 32);

      /**************Disparos***************/
      this.canons = [
        new GameEngine.Canon(),
        new GameEngine.Canon(),
        new GameEngine.Canon()
      ];
      this.shotcount = 2; //animacion de disparo
      this.disparoarr=[];

      this.bullet3 = 0;
      /*******************************/

      //**ANIMACIONES */
      // mientras este en un estado
      // incrementar el ciclo de animacion definido
      this.frameCounter = 0;
      this.framesPerChange = 1;

      this.ladderCounter = 0;
      this.ladderFramesPerChange = 3;
      //************* */

      //**variables de dimensiones centro de megaman**
      this.w_2 = w / 2;
      this.h_2 = h / 2;
      //*********************************************

      //***variables caja de colision de Megaman***
      this.wcol = 20;
      this.hcol = this.h;
      this.w_2col = 10;
      this.h_2col = h / 2;
      //********************************************

      //***fisicas */
      this.jump_heigth = 600;
      this.speed = 260;
      this.vx = 0;
      this.vy = 0;
      //********** */

      //**ESTADOS */
      this.inFloor = false;
      this.canJump = true;
      this.tryGrabLadder = false;
      this.disparando = false;
      this.lastimado = false;
      //************ */
    }

    processInput() {
      //** ATRIBUTOS QUE REINICIA ***** */
      this.vx = 0;
      if (this.vy > 300) this.vy -= 100;
      this.ladderVy = 0;
      this.tryGrabLadder = false;
      this.disparando=false;
      //******************************* */

      //********IZQUIERDA-DERECHA ** */
      if (KEY.isPress(KEY.LEFT)) {
        this.direction = -1;
        if (this.state === "jumping") {
          this.vx = -190;
        } else {
          this.vx = -this.speed;
        }
      }
      if (KEY.isPress(KEY.RIGHT)) {
        this.direction = 1;
        if (this.state === "jumping") {
          this.vx = 190;
        } else {
          this.vx = this.speed;
        }
      }
      //*************************** */

      //*********SALTO **************** */
      if (KEY.isReleased(KEY.X_KEY)) {
        this.canJump = true;
      }
      //velocidad salto subiendo
      if (KEY.isPress(KEY.X_KEY) && this.canJump && this.inFloor) {
        this.vy = -this.jump_heigth;
        this.canJump = false;
      }
      if (KEY.isPress(KEY.X_KEY) && this.inLadder) {
        this.inLadder = false;
        //cambio variables de colision
        this.wcol = 20;
        this.w_2col = 10;
      }
      //******************************* */

      /**************DISPARANDO***************/
      // if (this.shotcount < 1) {
        this.disparando = false;
      //   this.shotcount = 2;
      // }
      // let indice= false;

      if (KEY.isPress(KEY.Z)) {
        this.bullet3 = (this.bullet3 + 1) % 3;
        
        // if (this.bullet3 < 3) { 
          this.canons[this.bullet3].dispara(this.x, this.y,this.direction);
        // }
        // if (this.shotcount > 0) {
          this.disparando = true;
        // }
        // this.shotcount -= 1;
      }
      /*******************************/

      //******* SUBIENDO ESCALERA *******/
      //en ambos casos cambia ladderVy
      if (KEY.isPress(KEY.UP)) {
        this.tryGrabLadder = true;
        this.ladderVy = -this.speed; //velocidad en la escalera
        if (this.inLadder) {
          if (this.ladderCounter++ % this.ladderFramesPerChange === 0) {
            this.direction *= -1;
          }
        }
      }
      if (KEY.isPress(KEY.DOWN)) {
        this.tryGrabLadder = true;
        this.ladderVy = this.speed; //velocidad en la escalera
        if (this.inLadder) {
          if (this.ladderCounter++ % this.ladderFramesPerChange === 0) {
            this.direction *= -1;
          }
        }
      }
      //******************************** */
    }

    /**
     * Funcion de cambio de estados de megaman
     * utiliza solo los atributos en piso o en escalera
     */
    setState() {
      if(!this.lastimado){
        if (!this.inLadder) {
          if (this.vx !== 0) {
            this.state = "walking";
          } else if (this.inFloor) {
            this.state = "still";
          }
          if (!this.inFloor) {
            this.state = "jumping";
          }else if (this.disparando) {
            this.state = "disparando";
          }
        } else {
          this.state = "ladder";
          this.wcol=16;
          this.w_2col=8;
          // if(this.direction===1){
          //   this.x+=4;
          // }else{
          //   this.x-=4;
          // }
        }
      }else{
        this.state= "lastimado";
        count = (count+1)%4;
        if(count===3){
          this.lastimado =false;
        }
      }
    }
    //*********************************************** */

    update(elapsed) {
      this.inFloor = false;

      //velocidad salto bajando
      if (!this.inLadder) {
        this.vy += gravity; //incrementa aprox grav.

        super.update(elapsed);
      } else {
        this.vx = 0;
        //velocidad con la que sube la escalera
        this.vy = this.ladderVy;
        super.update(elapsed);
      }


      // if(this.bullet3<3){
        this.canons[0].update(elapsed);
        this.canons[1].update(elapsed);
        this.canons[2].update(elapsed);
      // }
    }

    render(ctx) {
      // ctx.font = "10px Comic Sans MS";
      // ctx.fillStyle = "black";
      // ctx.fillText("x:" + this.x/16, this.x, this.y - 40);
      // ctx.fillText("y:" + this.y/16, this.x, this.y - 32);
      // ctx.fillText("vy:" + this.vy, this.x, this.y - 24);

      //********CAMBIO DE ANIMACION *************************************** */
      if (this.state === "walking") {
        //*** Animacion Caminata ********************************** */
        this.frameCounter =
          (this.frameCounter + 1) % (this.framesPerChange * 4);
        let theFrame = parseInt(this.frameCounter / this.framesPerChange);
        if (theFrame === 3) {
          theFrame = 1;
        }
        if(this.disparando){
          this.currentFrame = theFrame +9;
          this.disparando=false;
        }else{
          this.currentFrame = 1 + theFrame;
        }
        //********************************************************** */
      } else if (this.state === "still") {
        this.currentFrame = 0;
      } else if (this.state === "jumping") {
        if(this.disparando){
          this.currentFrame=11;
        }else{
          this.currentFrame = 4;
        }
      } else if (this.state === "ladder") {
        if(this.disparando){
          this.currentFrame=12;
        }else{
          this.currentFrame = 5;
        }
      } else if (this.state === "disparando") {
        this.currentFrame = 7;
      } else if(this.state === "lastimado"){
        this.currentFrame = 13;
      }
      //******************************************************************* */

      // ctx.fillStyle = "rgba(100, 50, 25, 0.5)";
      // ctx.beginPath();
      // ctx.moveTo(this.x - this.w_2col, this.y - this.h_2col);
      // ctx.lineTo(this.x - this.w_2col, this.y + this.h_2col);
      // ctx.lineTo(this.x + this.w_2col, this.y + this.h_2col);
      // ctx.lineTo(this.x + this.w_2col, this.y - this.h_2col);
      // ctx.lineTo(this.x - this.w_2col, this.y - this.h_2col);
      // ctx.fill();

      //RENDER DE SPRITE
      if(this.bullet3<3){
        this.canons[this.bullet3].render(ctx);
      }
      super.render(ctx);
      //************* */
    }
  }

  GameEngine.Player = Player;
  return GameEngine;
})(GameEngine || {});
