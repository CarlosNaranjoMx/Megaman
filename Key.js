var GameEngine = (function(GameEngine) {
  let Key = {
    _pressed : {},
    _released : {},
    
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    Z: 90,
    X_KEY: 88,
    ENTER_KEY: 13,

    isPress: function(keyCode) {
      return this._pressed[keyCode];
    },
    isReleased: function(keyCode) {
      return this._released[keyCode];
    },
    onKeyDown: function(keyCode) {
      this._pressed[keyCode] = true;
      delete this._released[keyCode];
    },
    onKeyUp: function(keyCode) {
      this._released[keyCode] = true;
      delete this._pressed[keyCode];
    }
  }

  GameEngine.KEY = Key;
  return GameEngine;
})(GameEngine || {})