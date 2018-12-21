var GameEngine = (function(GameEngine) {
  class Platform {
    constructor(x, y, w, h) {
      this.type = "Platform";
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.w_2 = w/2;
      this.h_2 = h/2;
    }
  }

  GameEngine.Platform = Platform;
  return GameEngine;
})(GameEngine || {})