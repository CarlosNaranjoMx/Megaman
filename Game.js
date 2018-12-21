var GameEngine = (function(GameEngine) {
    let cw;
    let ch;
  
    let KEY = GameEngine.KEY;
  
    class Game {
      constructor(ctx) {
        cw = ctx.canvas.width;
        ch = ctx.canvas.height;
        this.ctx = ctx;
  
        this.state = new GameEngine.Start(this, cw, ch);

        /**************Carga Eventos de Teclado en sta clase***************/
        window.addEventListener("keydown", function(evt) {
          KEY.onKeyDown(evt.keyCode);
        });
        window.addEventListener("keyup", function(evt) {
          KEY.onKeyUp(evt.keyCode);
        });
        /******************************************************************/
      }
  
      changeState(state_name) {
        if (state_name === "star_state") {
          this.state = new GameEngine.Cutman(this.ctx,this);
        }
        if (state_name === "reinicia"){
          this.state = new GameEngine.Start(this, cw, ch);
        }
      }
  
      processInput() {
        this.state.processInput();
      }
  
      update(elapsed) {
        this.state.update(elapsed);
      }
  
      render() {
        this.state.render(this.ctx);
      }
    }
  
    GameEngine.Game = Game;
    return GameEngine;
  })(GameEngine || {})