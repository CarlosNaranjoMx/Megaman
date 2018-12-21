window.addEventListener("load", function() {
  let theCanvas = document.getElementById("theCanvas");
  let ctx = theCanvas.getContext("2d");

  let lastTime = Date.now();
  let current = 0;
  let elapsed = 0;
  let max_elapsed_wait = 30 / 1000;

  let game = new GameEngine.Game(ctx);

  (function gameLoop() {
    current = Date.now();
    elapsed = (current - lastTime) / 1000;

    if (elapsed > max_elapsed_wait) {
      elapsed = max_elapsed_wait;
    }
    game.processInput();
    game.update(elapsed);
    game.render();

    lastTime = current;

    window.requestAnimationFrame(gameLoop);
  })();

  // reescalado del canvas
  let canvas_w = theCanvas.width;
  let canvas_h = theCanvas.height;
  let scale;

  window.addEventListener("resize", resize);
  function resize() {
    scale = Math.min(
      window.innerWidth / canvas_w,
      window.innerHeight / canvas_h
    );
    if (scale > 1) {
      scale = parseInt(scale);
    }
    theCanvas.style.transform =
      "translate(" +
      (window.innerWidth - scale * canvas_w) / 2 +
      "px," +
      (window.innerHeight - scale * canvas_h) / 2 +
      "px) scale(" +
      scale +
      ")";
  }

  resize();
});
