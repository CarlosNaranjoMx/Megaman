var GameEngine = (function(GameEngine) {
  class TileAtlas {
    constructor(w, h, img_path, frames, frame_w, frame_h) {
      this.frames = frames;
      this.frame_w = frame_w;
      this.frame_h = frame_h;

      this.w = w;
      this.h = h;

      this.image = null;
      if (img_path) {
        this.image = new Image();
        this.image.src = img_path;
      }
    }

    processInput() { }

    update(elapsed) { }
    
    render(ctx, currentFrame, tx, ty) {
      if (this.image) {
        ctx.drawImage(
          this.image, 
          parseInt((currentFrame*this.frame_w)%this.image.width), 
          parseInt((currentFrame*this.frame_w)/this.image.width)*this.frame_h, 
          this.frame_w, 
          this.frame_h, 
          tx + parseInt(-this.w/2), 
          ty +parseInt(-this.h/2), 
          this.w, 
          this.h
        );
      }
    }
  }

  GameEngine.TileAtlas = TileAtlas;
  return GameEngine;
})(GameEngine || {})