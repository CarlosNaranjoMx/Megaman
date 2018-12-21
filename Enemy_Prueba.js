var GameEngine = (function(GameEngine) {
    let gravity = 16;
  
    class Enemy1 {
      constructor(x, y, w, h) {
        this.sprite = new GameEngine.Sprite(x, y, w, h, "images/enemy1.svg", 3, 16, 16);
  
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
  
        this.frameCounter = 0;
        this.framesPerChange = 16;
        this.numFrameAnimation = 2;
        this.w_2 = w/2;
        this.h_2 = h/2;
  
        this.speed = 120;
        this.jump_heigth = 366;
        this.inFloor = false;
  
        this.vx = -25;
        this.vy = 0;
        this.canJump = true;
  
        this.active = false;
      }
  
      update(elapsed, level, cw, ch, camera) {
        if (this.active) {
          this.inFloor = false;
          this.vy += gravity;
  
          this.x += this.vx * elapsed;
          this.y += this.vy * elapsed;
          this.sprite.x = this.x;
          this.sprite.y = this.y;
  
          this.frameCounter = (this.frameCounter +1)%(this.framesPerChange*this.numFrameAnimation);
          this.sprite.currentFrame = parseInt(this.frameCounter/this.framesPerChange);
  
          this.checkCollisionPlatforms(level);
          this.checkCollisionWalls(cw, ch, camera);
        }
      }
  
      checkCollisionPlatforms(level) {
        let tile_pos = level.getTilePos(this.x, this.y);
  
        //center
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y));
        // left
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y));
        // right
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y));
  
        // top
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y-1));
        // bottom
        this.reactCollision(level.getPlatform(tile_pos.x,   tile_pos.y+1));
  
        // left top
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y-1));
        // right top
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y-1));
  
        // left bottom
        this.reactCollision(level.getPlatform(tile_pos.x-1, tile_pos.y+1));
        // right bottom
        this.reactCollision(level.getPlatform(tile_pos.x+1, tile_pos.y+1));
      }
  
      reactCollision(platform) {
        if ( platform &&
             Math.abs(this.x - platform.x) < this.w_2 + platform.w_2 && 
             Math.abs(this.y - platform.y) < this.h_2 + platform.h_2 ) {
  
          let overlapX = (this.w_2 + platform.w_2) - Math.abs(this.x - platform.x);
          let overlapY = (this.h_2 + platform.h_2) - Math.abs(this.y - platform.y);
  
          if (overlapX < overlapY) {
            if (this.x - platform.x > 0) {
              this.x += overlapX;
            }
            else {
              this.x -= overlapX;
            }
            this.vx *= -1;
          }
          else if (overlapX > overlapY) {
            if (this.y - platform.y > 0) {
              this.y += overlapY;
              if (this.vy < 0) {
                this.vy = 0;
              }
            }
            else {
              this.y -= overlapY;
              if (this.vy > 0) {
                this.inFloor = true;
                this.vy = 0;
              }
            }
          }
        }
      }
      
      checkCollisionWalls(cw, ch, camera) {
        if (this.x < camera.x -cw) {
          this.active = false;
        }
        if (this.x > camera.x +cw) {
          this.active = false;
        }
      }
  
      render(ctx) {
        if (this.active) {
          this.sprite.render(ctx);
        }
      }
    }
  
    GameEngine.Enemy1 = Enemy1;
    return GameEngine;
  })(GameEngine || {})