var GameEngine = (function(GameEngine) {
  let dx, dy;

  class Camera {
    constructor(x, y, cw, ch) {
      this.x = x;
      this.y = y;
      this.stage_w = cw;
      this.stage_h = ch;

      this.left = 64;
      this.right = 64;
      this.top = 80;
      this.bottom = 80;

      this.step = 0;
      this.pantalla = 1;
    }

    /**
     *
     * @param {*} ctx
     */
    applyTransform(ctx) {
      ctx.save(); //salva el estado actual del canvas
      ctx.translate(
        //hace una traslacion del canvas
        parseInt(this.stage_w / 2 - this.x),
        parseInt(this.stage_h / 2 - this.y)
      );
    }

    /**
     * restaura el canvas
     * @param {*} ctx
     */
    releaseTransform(ctx) {
      ctx.restore();
    }
    /*******************************/

    update(player, level) {
      if (this.pantalla === 1) {
        // window left
        if (player.x > F.posEsc(60)-4){
          this.x = F.posEsc(57);
        }else if (player.x - player.w_2 < this.x - this.left) {
          this.x = Math.max(
            this.stage_w / 2,
            parseInt(player.x - player.w_2 + this.left)
          );
        }
        // window right
        else if (this.x + this.right < player.x + player.w_2) {
          this.x = Math.min(
            level.w - this.stage_w / 2,
            parseInt(player.x + player.w_2 - this.right)
          );
        }
        //inicio escenario
        if (this.x < F.posEsc(9)+1) this.x = F.posEsc(9);
        // posicion y de la pantalla 01
        this.y = 2120;
      }
      if (this.pantalla === 5) {
        // window left
        if (player.x>F.posEscC(91)){
          this.x = F.posEsc(89);
        }
        if(player.x < F.posEscC(91)){
          if (player.x > F.posEscC(53)) {
            if (player.x - player.w_2 < this.x - this.left) {
              this.x = Math.max(
                this.stage_w / 2,
                parseInt(player.x - player.w_2 + this.left)
              );
            }
            // window right
            else if (this.x + this.right < player.x + player.w_2) {
              this.x = Math.min(
                level.w - this.stage_w / 2,
                parseInt(player.x + player.w_2 - this.right)
              );
              // if (player.x > 1463) this.x = 1414;
            }
        }
        }

        // this.y = 1160;
      }
      if (this.pantalla === 9) {
        if(player.x<F.posEscC(124)){
          // window left
          if (player.x - player.w_2 < this.x - this.left) {
            this.x = Math.max(
              this.stage_w / 2,
              parseInt(player.x - player.w_2 + this.left)
            );
          }
          // window right
          else if (this.x + this.right < player.x + player.w_2) {
            this.x = Math.min(
              level.w - this.stage_w / 2,
              parseInt(player.x + player.w_2 - this.right)
            );
            // if (player.x > 1463) this.x = 1414;
          }
        }
        // this.y = 200;
      }
      if (this.pantalla === 12) {
        if(player.x>F.posEscC(119)){
          // window left
          if (player.x - player.w_2 < this.x - this.left) {
            this.x = Math.max(
              this.stage_w / 2,
              parseInt(player.x - player.w_2 + this.left)
            );
          }
          // window right
          else if (this.x + this.right < player.x + player.w_2) {
            this.x = Math.min(
              level.w - this.stage_w / 2,
              parseInt(player.x + player.w_2 - this.right)
            );
            // if (player.x > 1463) this.x = 1414;
          }
        }
        this.y = 936;
      }
    }

    render(ctx) {
      // ctx.font = "10px Comic Sans MS";
      // ctx.fillStyle = "black";
      // ctx.fillText("camera.x:" + this.x / 16, this.x - 48, this.y - 96);
      // ctx.fillText("camera.y:" + this.y / 16, this.x - 48, this.y - 90);

      // this.ctx.font = "bold 23px Monospace";
      // this.ctx.fillStyle = "white";
      // this.ctx.strokeStyle = "black";
      // this.ctx.lineWidth = 50;
      // this.ctx.lineJoin = "round";
      // this.ctx.beginPath();
      // this.ctx.strokeText("Presiona espacio para comenzar", 10, 25);
      // this.ctx.fillText("00000000",this.x-48, this.y-80);
      // this.ctx.fillText("3\u2764",10,25);
      // this.ctx.fillText("Presiona espacio", 200, 265);
      // this.ctx.fillText("para comenzar", 220, 285);
      // this.ctx.closePath();

      // ctx.beginPath();
      // ctx.lineWidth = 2;
      // ctx.strokeStyle = "white";
      // ctx.moveTo(parseInt(this.x - 20), parseInt(this.y));
      // ctx.lineTo(parseInt(this.x + 20), parseInt(this.y));
      // ctx.moveTo(parseInt(this.x), parseInt(this.y - 20));
      // ctx.lineTo(parseInt(this.x), parseInt(this.y + 20));
      // ctx.moveTo(this.x - this.left, this.y - this.top);
      // ctx.lineTo(this.x - this.left, this.y + this.bottom);
      // ctx.lineTo(this.x + this.right, this.y + this.bottom);
      // ctx.lineTo(this.x + this.right, this.y - this.top);
      // ctx.closePath();
      // ctx.stroke();
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "black";
      ctx.rect(this.x - 102, this.y - 100, 3, 51);
      ctx.stroke();
      ctx.closePath();
    }
  }

  GameEngine.Camera = Camera;
  return GameEngine;
})(GameEngine || {});
