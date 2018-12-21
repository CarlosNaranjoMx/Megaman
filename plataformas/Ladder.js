var GameEngine = (function(GameEngine) {
  class Ladder {
    constructor(x, y, w, h) {
      this.type = "Ladder";
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.w_2 = w/2;
      this.h_2 = h/2;
    }
  }

  GameEngine.Ladder = Ladder;
  return GameEngine;
})(GameEngine || {})