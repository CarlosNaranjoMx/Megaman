/**
 * (1) Interpolaciones de camara
 * (2) Funcion esta en la escalera
 * (3) Empuje Megaman fuera de las plataformas
 */
var GameEngine = (function(GameEngine) {
  let cw;
  let ch;

  let KEY = GameEngine.KEY;

  class Cutman {
    constructor(ctx,game) {
      //****MEDIDAS DEL CANVAS Y CANVAS */
      cw = ctx.canvas.width;
      ch = ctx.canvas.height;
      this.ctx = ctx;
      this.game =game;
      //******************************* */

      //******Constructores *********** */
      this.camera = new GameEngine.Camera(cw / 2, ch / 2, cw, ch);
      this.player = new GameEngine.Player(128, (ch / 2) * 17 + 80, 32, 32);
      // this.player = new GameEngine.Player(800, (ch / 2) * 17 + 80, 32, 32);
      // this.player = new GameEngine.Player(1463, 1216, 32, 32);
      // this.camera.pantalla =5;      
      // this.player = new GameEngine.Player(1361, 288, 32, 32);
      // this.camera.pantalla =9;      
      // this.player = new GameEngine.Player(1972, 992, 32, 32);
      // this.camera.pantalla =12;      

      this.level = new GameEngine.Level();
      this.helicopteros = [
        //pantalla 01
        new GameEngine.Helicopter(18, 130),
        new GameEngine.Helicopter(22, 134),
        new GameEngine.Helicopter(23, 131),
        new GameEngine.Helicopter(36, 130),
        new GameEngine.Helicopter(41, 133),
        new GameEngine.Helicopter(43, 131),
        //pantalla 09
        new GameEngine.Helicopter(120, 11),
        new GameEngine.Helicopter(124, 14),
        new GameEngine.Helicopter(125, 10)
      ];
      this.conchas = [
        //pantalla 01
        new GameEngine.Concha(52,129,-1),
        new GameEngine.Concha(60,132,-1),
        //pantalla 02
        new GameEngine.Concha(62,119,-1),
        new GameEngine.Concha(56,115,-1),
        new GameEngine.Concha(58,113,-1),
        //pantalla 03
        new GameEngine.Concha(53,106,1),
        new GameEngine.Concha(56,102,-1),
        new GameEngine.Concha(60,98,-1),
        //pantalla 04
        new GameEngine.Concha(56,93,1),
        new GameEngine.Concha(60,85,-1),
        new GameEngine.Concha(58,82,-1)
      ];
      this.pacmans = [
        //pantalla 05
        new GameEngine.Pacman(57,75),
        new GameEngine.Pacman(58,75),
        new GameEngine.Pacman(57,75),
        new GameEngine.Pacman(57,75),
        //pantalla 09
        new GameEngine.Pacman(89,16),
        new GameEngine.Pacman(90,16),
        new GameEngine.Pacman(89,16),
        new GameEngine.Pacman(90,16)
      ];
      this.medusas = [
        //pantalla 05
        new GameEngine.Medusa(68,76),
        new GameEngine.Medusa(70,74),
        new GameEngine.Medusa(72,72)
      ];
      this.eyes = [
        //pantalla 05
        new GameEngine.Eye(85,75),
        new GameEngine.Eye(87,71),
        new GameEngine.Eye(92,73),
        //pantalla 06
        new GameEngine.Eye(94,58),
        new GameEngine.Eye(86,58),
        new GameEngine.Eye(88,56),
        new GameEngine.Eye(85,54),
        //pantalla 07
        new GameEngine.Eye(89,46),
        new GameEngine.Eye(87,45),
        new GameEngine.Eye(92,41),
        new GameEngine.Eye(94,39),
        //pantalla 08
        new GameEngine.Eye(84,30),
        new GameEngine.Eye(84,27),
        new GameEngine.Eye(89,28),
        new GameEngine.Eye(93,22),
        new GameEngine.Eye(83,24)
      ];
      this.gods = [
        //pantalla 10
        new GameEngine.God(129,29),
        new GameEngine.God(129,29),
        //pantalla 11
        new GameEngine.God(129,44),
        new GameEngine.God(129,44)
      ];
      this.cararana = [new GameEngine.TrituraHuesos(127,61)];
      // this.lifetank = new GameEngine.Friend();
      // this.el_cutman = new GameEngine.ElCutman();
      this.life = new GameEngine.Life();
      //******************************* */

      //**************Codigo modificado*********
      this.cameraTransition = false;
      // atributo de una clase en otra clase :O
      this.oldCameraPos = { x: 0, y: 0 };
      //****************************************

      window.addEventListener("keydown", function(evt) {
        KEY.onKeyDown(evt.keyCode);
      });
      window.addEventListener("keyup", function(evt) {
        KEY.onKeyUp(evt.keyCode);
      });
    }

    processInput() {
      this.player.processInput();
    }

    update(elapsed) {
      if(this.life.contador<1){
        this.game.changeState("reinicia");
      }
      //*********************ESTADO DE NO INTERPOLACION DE CAMARA*********************
      if (this.cameraTransition === false) {
        //aun hacemos updates de la camara
        //(1)update player
        this.player.update(elapsed);
        this.helicopteros.forEach(helicoptero => {
          helicoptero.update(elapsed);
        });
        this.conchas.forEach(concha => {
          concha.update(elapsed);
        });
        this.pacmans.forEach(pacman => {
          pacman.update(elapsed);
        });
        this.medusas.forEach(medusa => {
          medusa.update(elapsed);
        });
        this.eyes.forEach(eye => {
          eye.update(elapsed);
        });
        this.gods.forEach(god => {
          god.update(elapsed);
        });
        this.cararana[0].update(elapsed);

        this.checkCollisionPlatforms(this.player, this.level);
        Colision.checkCollisionEnemy(this.player.canons,this.helicopteros);
        Colision.checkCollisionEnemy(this.player.canons,this.conchas);
        Colision.checkCollisionEnemy(this.player.canons,this.pacmans);
        Colision.checkCollisionEnemy(this.player.canons,this.medusas);
        Colision.checkCollisionEnemy(this.player.canons,this.eyes);
        Colision.checkCollisionEnemy(this.player.canons,this.gods);

        Colision.checkCollisionMegamanEnemies(this.player,this.helicopteros,this.life);
        Colision.checkCollisionMegamanEnemies(this.player,this.conchas,this.life);
        Colision.checkCollisionMegamanEnemies(this.player,this.pacmans,this.life);
        Colision.checkCollisionMegamanEnemies(this.player,this.medusas,this.life);
        Colision.checkCollisionMegamanEnemies(this.player,this.eyes,this.life);
        Colision.checkCollisionMegamanEnemies(this.player,this.gods,this.life);

        Colision.checkCollisionMegamanBalas(this.player,this.conchas,this.life);

        if (this.player.inFloor) {
          this.player.inLadder = false;
        }

        this.player.setState();
        //*** (2) Jugador en la escalera ********/
        if (this.player.tryGrabLadder && !this.player.inLadder) {
          Colision.checkCollisionLadders(this.player, this.level);
        }
        if (this.player.inLadder) {
          this.checkInLadders(this.player, this.level);
        }
        //************************************* */
        //this.player.update(elapsed);

        this.checkCollisionPlatforms(this.player, this.level);

        this.player.setState();
        if(this.player.x>F.posEscC(10)) this.helicopteros[0].actmov=true;
        if(this.player.x>F.posEscC(11)) this.helicopteros[1].actmov=true;
        if(this.player.x>F.posEscC(12)) this.helicopteros[2].actmov=true;
        if(this.player.x>F.posEscC(24)) this.helicopteros[3].actmov=true;
        if(this.player.x>F.posEscC(29)) this.helicopteros[4].actmov=true;
        if(this.player.x>F.posEscC(30)) this.helicopteros[5].actmov=true;

        if(this.player.x>F.posEscC(52) & this.player.y<F.posEscC(78)) this.pacmans[0].actmov=true;
        
        //(1)posicion del jugador mayor que tope de la ventana
        if ((this.player.y < 1993) & (this.camera.pantalla === 1)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 2;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 1993) & (this.camera.pantalla === 2)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 1;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 1753) & (this.camera.pantalla === 2)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 3;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 1753) & (this.camera.pantalla === 3)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 2;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 1513) & (this.camera.pantalla === 3)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 4;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 1513) & (this.camera.pantalla === 4)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 3;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 1293) & (this.camera.pantalla === 4)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 5;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 1293) & (this.camera.pantalla === 5)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 4;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 1053) & (this.camera.pantalla === 5)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 6;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 1053) & (this.camera.pantalla === 6)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 5;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 813) & (this.camera.pantalla === 6)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 7;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 813) & (this.camera.pantalla === 7)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 6;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 573) & (this.camera.pantalla === 7)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 8;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y > 573) & (this.camera.pantalla === 8)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 7;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        if ((this.player.y < 333) & (this.camera.pantalla === 8)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 9;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
            // if ((this.player.y > 333) & (this.camera.pantalla === 9)) {
            //   this.cameraTransition = true;
            //   this.camera.step = 0;
            //   this.camera.pantalla = 8;
            //   this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            // }
            //aqui tener cuidado agragar otro condicional
            if ((this.player.y > 333) & (this.camera.pantalla === 9)) {
              this.cameraTransition = true;
              this.camera.step = 0;
              this.camera.pantalla = 10;
              this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            }
            if ((this.player.y < 333) & (this.camera.pantalla === 10)) {
              this.cameraTransition = true;
              this.camera.step = 0;
              this.camera.pantalla = 9;
              this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            }
            if ((this.player.y > 573) & (this.camera.pantalla === 10)) {
              this.cameraTransition = true;
              this.camera.step = 0;
              this.camera.pantalla = 11;
              this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            }
            if ((this.player.y < 573) & (this.camera.pantalla === 11)) {
              this.cameraTransition = true;
              this.camera.step = 0;
              this.camera.pantalla = 10;
              this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            }
            if ((this.player.y > 813) & (this.camera.pantalla === 11)) {
              this.cameraTransition = true;
              this.camera.step = 0;
              this.camera.pantalla = 12;
              this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
            }
        if ((this.player.y < 813) & (this.camera.pantalla === 12)) {
          this.cameraTransition = true;
          this.camera.step = 0;
          this.camera.pantalla = 11;
          this.oldCameraPos = { x: this.camera.x, y: this.camera.y };
        }
        Colision.checkCollisionWalls(this.player, this.camera, this.cw);

        this.camera.update(this.player, this.level);
      } else {
        this.camera.step += 0.05;
        if (this.camera.step > 1) {
          this.cameraTransition = false;
        }
        if (this.camera.pantalla === 1) {
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 2120, this.camera.step)
          );
        }
        if (this.camera.pantalla === 2) {
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 1880, this.camera.step)
          );
        }
        if(this.camera.pantalla===3){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 1640, this.camera.step)
          );
        }
        if(this.camera.pantalla===4){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 1400, this.camera.step)
          );
        }
        if(this.camera.pantalla===5){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 1160, this.camera.step)
          );
        }
        if(this.camera.pantalla===6){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 920, this.camera.step)
          );
        }
        if(this.camera.pantalla===7){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 680, this.camera.step)
          );
        }
        if(this.camera.pantalla===8){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 440, this.camera.step)
          );
        }
        if(this.camera.pantalla===9){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 200, this.camera.step)
          );
        }
        if(this.camera.pantalla===10){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 440, this.camera.step)
          );
        }
        if(this.camera.pantalla===11){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 680, this.camera.step)
          );
        }
        if(this.camera.pantalla===12){
          this.camera.y = Math.min(
            this.level.h - ch / 2,
            this.lerp(this.oldCameraPos.y, 920, this.camera.step)
          );
        }
      }

      //********************************************************
    }

    /**
     * CAMBIA EL ESTADO DEL Jugador si esta en escalera o no
     * @param {*} player
     * @param {*} level
     */
    checkInLadders(player, level) {
      let player_tile_pos = level.getTilePos(player.x, player.y + player.h_2);
      let ladder;
      //(1)obtenemos el tilte
      ladder = level.getPlatform(player_tile_pos.x, player_tile_pos.y);
      //(2) checamos si existe y si es de tipo escalera
      if (ladder && ladder.type === "Ladder") {
        player.inLadder = true;
        //aqui habia un cambio de colisiones
      } else {
        player.inLadder = false;
        //y aqui tambien
      }
    }
    /*************************************************************************/

    /**
     * te empuja dependiendo de la vecindad de plataformas
     * @param {*} player
     * @param {*} level
     */
    checkCollisionPlatforms(player, level) {
      let player_tile_pos = level.getTilePos(player.x, player.y);
      //center
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x, player_tile_pos.y)
      );
      // left
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x - 1, player_tile_pos.y)
      );
      // right
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x + 1, player_tile_pos.y)
      );
      // top
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x, player_tile_pos.y - 1)
      );
      // bottom
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x, player_tile_pos.y + 1)
      );
      // left top
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x - 1, player_tile_pos.y - 1)
      );
      // right top
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x + 1, player_tile_pos.y - 1)
      );
      // left bottom
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x - 1, player_tile_pos.y + 1)
      );
      // right bottom
      Colision.reactCollision(
        player,
        level.getPlatform(player_tile_pos.x + 1, player_tile_pos.y + 1)
      );
    }

    /**
     *
     * @param {*} v0
     * @param {*} v1
     * @param {*} t
     */
    lerp(v0, v1, t) {
      return v0 + (v1 - v0) * t;
    }

    render() {
      this.ctx.fillStyle = "#5ad0e1";
      this.ctx.fillRect(0, 0, cw, ch);

      this.camera.applyTransform(this.ctx);

      this.level.render(this.ctx);
      this.player.render(this.ctx);
      this.helicopteros.forEach(helicoptero => {
        helicoptero.render(this.ctx);
      });
      this.conchas.forEach(concha => {
        concha.render(this.ctx);
      });
      this.pacmans.forEach(pacman => {
        pacman.render(this.ctx);
      });
      this.medusas.forEach(medusa => {
        medusa.render(this.ctx);
      });
      this.eyes.forEach(eye => {
        eye.render(this.ctx);
      });
      this.gods.forEach(god => {
        god.render(this.ctx);
      });
      this.cararana[0].render(this.ctx);
      this.camera.render(this.ctx);
      this.life.render(this.ctx, this.camera.x, this.camera.y);
      this.camera.releaseTransform(this.ctx);
    }
  }

  GameEngine.Cutman = Cutman;
  return GameEngine;
})(GameEngine || {});
