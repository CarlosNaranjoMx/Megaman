class Colision {
  /**
   *  Empuja a megaman hacia afuera de las plataformas
   * @param {*} player
   * @param {*} platform
   * @param {*} type
   */
  static reactCollision(player, platform, type) {
    if (
      platform &&
      platform.type === "Platform" &&
      //checa colisiones con la diferencia entre posiciones
      Math.abs(player.x - platform.x) < player.w_2col + platform.w_2 &&
      Math.abs(player.y - platform.y) < player.h_2col + platform.h_2
    ) {
      let overlapX =
        player.w_2col + platform.w_2 - Math.abs(player.x - platform.x);
      let overlapY =
        player.h_2col + platform.h_2 - Math.abs(player.y - platform.y);
      //manda hacia arriba al personaje dependiendo de que tanto se metio en la plataforma
      if (overlapX < overlapY) {
        if (player.x - platform.x > 0) {
          player.x += overlapX;
        } else {
          player.x -= overlapX;
        }
      } else if (overlapX > overlapY) {
        if (player.y - platform.y > 0) {
          player.y += overlapY;
          if (player.vy < 0) {
            player.vy = 0;
          }
        } else {
          player.y -= overlapY;
          if (player.vy > 0) {
            player.inFloor = true;
            player.vy = 0;
          }
        }
      }
    }
  }
  /*************************************************************************/

  /**
   * Limita al jugador a mantenerse en los margenes de la camara
   */
  static checkCollisionWalls(player, camera, cw) {
    if (player.x < camera.x - cw / 2 + player.w_2col) {
      player.x = camera.x - cw / 2 + player.w_2col;
    }
    if (player.x > camera.x + cw / 2 - player.w_2col) {
      player.x = camera.x + cw / 2 - player.w_2col;
    }

    //if (player.y > ch - player.h_2) {
    //   player.y = 0;
    //   player.vy = 0;
    // }
  }
  /*************************************************************************/

  /**
   * COLISIONES ESCALERAS, tomar la escalera
   * @param {*} player
   * @param {*} level
   */
  static checkCollisionLadders(player, level) {
    let player_tile_pos = level.getTilePos(player.x, player.y);
    let ladder;

    // top
    ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y - 1);
    if (ladder && ladder.type === "Ladder" && player.ladderVy < 0) {
      player.x = ladder.x;
      player.inLadder = true;
      return;
    }

    //center
    ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y);
    if (ladder && ladder.type === "Ladder") {
      player.x = ladder.x;
      player.inLadder = true;
      return;
    }

    // bottom
    ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y + 1);
    if (ladder && ladder.type === "Ladder" && player.ladderVy > 0) {
      player.x = ladder.x;
      player.inLadder = true;
      return;
    }
  }
  /*************************************************************************/

  /**
   * checha colisiones bla enemigos
   * @param {*} canons 
   * @param {*} enemies 
   */
  static checkCollisionEnemy(canons,enemies){
    enemies.forEach(enemy => {
      let xizq = enemy.x-enemy.w/2;
      let xder = enemy.x+enemy.w/2;
      let ytop = enemy.y-enemy.h/2;
      let ybottom = enemy.y+2+enemy.w/2;
      canons.forEach(canon => {
        if(canon.x>xizq){
          // console.log("canonx:"+canon.x+"\nxizq:"+xizq);
          if(canon.x<xder){
            if(canon.y>ytop){
              if(canon.y<ybottom){
                enemy.activate= false;
              }
            }
          }
        }
      });
      
    });

  }

  /**
   * 
   */
  static checkCollisionMegamanEnemies(megaman,enemies,life){
    let megizq = megaman.x-megaman.w_2col;
    let megder = megaman.x+megaman.w_2col;
    let megtop = megaman.y-megaman.h_2col;
    let megbottom = megaman.y+megaman.h_2col;
    enemies.forEach(enemy => {
      let xizq = enemy.x-enemy.w/2;
      let xder = enemy.x+enemy.w/2;
      let ytop = enemy.y-enemy.h/2;
      let ybottom = enemy.y+2+enemy.w/2;
      if(megizq<xizq){
        if(xizq<megder){
          if(megtop<ytop){
            if(ytop<megbottom){
              life.contador -=1;
              megaman.lastimado = true;
            }
          }
          if(megtop<ybottom){
            if(ybottom<megbottom){
              life.contador -=1;
              megaman.lastimado=true;
            }
          }
        }
      }
      if(megizq<xder){
        if(xder<megder){
          if(megtop<ytop){
            if(ytop<megbottom){
              life.contador -=1;
              megaman.lastimado=true;
            }
          }
          if(megtop<ybottom){
            if(ybottom<megbottom){
              life.contador -=1;
              megaman.lastimado=true;
            }
          }
        }
      }
      
    });
    
    
  }
  /**
   * 
   * @param {*} megaman 
   * @param {*} enemies 
   * @param {*} life 
   */
  static checkCollisionMegamanBalas(megaman,conchas,life){
    let megizq = megaman.x-megaman.w_2col;
    let megder = megaman.x+megaman.w_2col;
    let megtop = megaman.y-megaman.h_2col;
    let megbottom = megaman.y+megaman.h_2col;
    conchas.forEach(concha => {
      let blx=concha.balaenemiga.x;
      let bly=concha.balaenemiga.y;
      if(blx>megizq){
        if(blx<megder){
          if(bly>megtop){
            if(bly<megbottom){
              life.contador -=1;
              megaman.lastimado=true;
            }
          }
        }
      }
    });
  }
}
