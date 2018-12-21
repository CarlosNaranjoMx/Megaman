var GameEngine = (function(GameEngine) {
    let KEY = GameEngine.KEY;
  
    class Start {
      constructor(game, cw, ch) {
        this.game = game;
        this.cw = cw;
        this.ch = ch;
  
        this.image = new Image();
        this.image.src = "images/p04_001.png";
      }
  
      processInput() {
        if (KEY.isPress(KEY.ENTER_KEY)) {
          this.game.changeState("star_state");
        }
      }
  
      update(elapsed) { }
  
      render(ctx) {
        if (this.image) {
          ctx.drawImage(this.image, 0, 0);
        }
        else {
          ctx.fillStyle = "#664411";
          ctx.fillRect(0, 0, this.cw, this.ch);
        }
      }
    }
  
    GameEngine.Start = Start;
    return GameEngine;
  })(GameEngine || {})