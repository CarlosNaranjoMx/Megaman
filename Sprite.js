/**
 * (1) Actualiza las velocidades y posiciones del sprite
 * (2) Pinta el sprite
 */
var GameEngine = (function(GameEngine) {
  class Sprite {
    constructor(x, y, w, h, img_path, frames, frame_w, frame_h) {
 
      //*****FISICAS */
      this.x = x;
      this.y = y;
      this.vx = 0;
      this.vy = 0;
      this.vr = 0;
      this.ax = 0;
      this.ay = 0;

      this.direction = 1;
      //************* */

      //*****ANIMACIONES */
      this.frames = frames;
      this.frame_w = frame_w;
      this.frame_h = frame_h;

      this.currentFrame = 0;
      //**************** */

      /***dimensiones*** */
      this.w = w;
      this.h = h;
      this.rotation = 0;
      //**************** */


      //****IMAGEN ***** */
      this.image = null;
      if (img_path) {
        this.image = new Image();
        this.image.src = img_path;
      }
      //**************** */
    }

    processInput() {}

    /**
     * cambio de la velocidad con la aceleracion
     * cambio de la posicion con la velocidad  y el tiempo 
     * @param {*} elapsed 
     */
    update(elapsed) {
      // this.vx += this.ax;
      // this.vy += this.ay;
      this.x += this.vx * elapsed;
      this.y += this.vy * elapsed;
    }

    /**
     * 
     * @param {*} ctx 
     */
    render(ctx) {
      if (this.image) {
        ctx.save();
        ctx.translate(parseInt(this.x), parseInt(this.y));
        ctx.rotate(this.rotation);
        ctx.scale(this.direction, 1);
        ctx.drawImage(
          this.image,
          (this.currentFrame * this.frame_w) % this.image.width,
          parseInt((this.currentFrame * this.frame_w) / this.image.width) *
            this.frame_h,
          this.frame_w,
          this.frame_h,
          -this.w / 2,
          -this.h / 2,
          this.w,
          this.h
        );
        ctx.restore();
      }
    }
  }

  GameEngine.Sprite = Sprite;
  return GameEngine;
})(GameEngine || {});
