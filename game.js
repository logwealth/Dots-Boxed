let gameObject;
let lines = [],
  rects = [];
//luu tru diem so giua 2 nguoi choi
let scorePlay = [0, 0];
//luot choi cua tung player1/player2 value= 0-1
let turn = 0;
//kich thuoc tung o vuong
let dots = 50;
let dos = [100, 50];
//muc do kho cua game
let diff = 1;
//xac dinh kich thuoc
let getSize = dos[diff];
//Tuy chon che do choi
let playerOption;
//tuy chon che do luoi
let selectedGridOption;
//tuy chon nguoi choi tam thoi
let temporaryPlayerOption = 0;
//tuy chon kich thuoc luoi tam thoi
let temporaryGridOption = 0;
//theo doi input , output vao game
let mousePRE = false;
//click chuot de ve
let MPressed = false;
let IJHi = [0, 0, 0];
let IJH;
//Quan ly trang thai tro choi
let GameRun = false,
  GameStarted = false;
let b1, b2;
let Modes;
let GriSOp;
//tuong duong diem tam thoi nguoi choi 1 va nguoi choi 2
let tempScoreOld = 0,
  tempScoreOne = 0;
let tTurn;

let isShowGamePlay = false;

const playerColors = ["red", "green", "yellow"];

var coinS, BackS, drawS;
function preload() {
  coinS = loadSound("sound-coin.wav");
  BackS = loadSound("voice-bg.mp3");
  drawS = loadSound("event.wav");
  drawS.rate(3);
  BackS.loop();
}

function setup() {
  createCanvas(700, 700);
  fill(0);
  // width = width - 100;
  // height = height - 100;

  playerOption = temporaryPlayerOption;
  selectedGridOption = temporaryGridOption;
  getSize = dos[selectedGridOption];
  gameObject = new GamePlot(getSize);
  console.log(gameObject);
  gameObject.createGamePlot();
  if (playerOption == 3) {
    frameRate(3);
  } else {
    frameRate(60);
  }

  scorePlay = [0, 0];

  turn = Math.floor(random(0,2));
  tTurn = turn;
  console.log(turn);

  b1 = new Button(width - 20, height - 50, 25, "Play&Pause");
  b2 = new Button(width - 20, height - 80, 23, "Apply&Start");

  var labels1 = [];
  Modes = new gridOption(width - 10, 375, 1, labels1);
  Modes.Op = playerOption;

  var labels1 = [];
  GriSOp = new gridOption(width - 10, 410, 1, labels1);
  GriSOp.Op = selectedGridOption;

  coinS.stop();
  BackS.stop();
  BackS.loop();

  //   GameRun = false;
}

function draw() {
  if (isShowGamePlay) {
    background(255);
    fill(255, 10);
    strokeWeight(10);
    rect(dots / 2, dots / 2, width - dots - 100, height - dots - 100);
    rect(5, 5, width - 20, height - 30);

    fill(0, 0, 255);
    strokeWeight(0);
    stroke(0, 0, 255);
    textSize(30);
    //text('Game of Dots and Lines', width / 4, height + 10)
    textSize(15);
    //text('nikeshbajaj.in', width - dots / 2, 22)
    //text("Nik'B", width + dots / 1.5, height + 30)

    fill(0);
    stroke(0);
    text("Player 1", width - dots / 3 - 100, 70);
    text(" " + gameObject.scorePlays[0], width - 60, 98);
    text("Player 2", width - dots / 3 - 100, 150);
    text(" " + gameObject.scorePlays[1], width - 60, 178);

    textSize(13);
    text("Turn", width - dots / 3 - 100, 290);
    text("Player #" + (turn + 1), width - dots / 3 - 100, 310);
    fill(255 * (1 - turn), 255 * turn, 0, 200);
    ellipse(width - 40, 290, 30, 30);

    // fill(0, 0, 255)
    // textSize(23);
    // text('Scores', width - 10, 260)

    //vBar(gameObject.scorePlays[0], gameObject.scorePlays[1], gameObject.Nrect)
    fill(255, 0, 0, 150);
    rect(width - 80, 85, 15, 15, 5);
    fill(0, 255, 0, 150);
    rect(width - 80, 165, 15, 15, 5);

    if (
      gameObject.scorePlays[0] != tempScoreOld ||
      gameObject.scorePlays[1] != tempScoreOne
    ) {
      tempScoreOld = gameObject.scorePlays[0];
      tempScoreOne = gameObject.scorePlays[1];
      coinS.play();
    }
    /*
	if(GameRun){
		text("Playing",width-10,height+10);
	}else{
		text("Paused",width-10,height+10);
	}
	*/

    if (gameObject.GameStarted) {
      gameObject.displayRect();
      gameObject.displayLines();
      gameObject.displayGrid();

      if (GameRun) {
        gameObject.CheckMouse(turn);
        if (!BackS.isPlaying()) {
          BackS.play();
        }
      } else {
        if (BackS.isPlaying()) {
          BackS.stop();
        }
        fill(0, 50);
        textSize(100);
        //text("Paused", width / 4.2, height / 2);
      }
    } else {
      if (BackS.isPlaying()) {
        BackS.stop();
      }
      gameObject.displayLines();
      gameObject.displayRect();
      fill(0);
      strokeWeight(1);
      stroke(0);
      textSize(30);

      // text('Press R to start a new Game', width / 7, height / 3.2)
      // text('Scores', width / 2.5, height / 2.5)
      // text('Player 1: ' + scorePlay[0], width / 7, height / 2.1)
      // text('Player 2: ' + scorePlay[1], width / 7, height / 1.8)
      if (scorePlay[0] > scorePlay[1]) {
        stopGamePlay("Player 1 Wins!", playerColors[0]);
      } else if (scorePlay[0] < scorePlay[1]) {
        stopGamePlay("Player 2 Wins!", playerColors[1]);
      } else if (scorePlay[0] === scorePlay[1]) {
        stopGamePlay("It's a Draw!", playerColors[2]);
      }
    }

    function stopGamePlay(message, color) {
      fill(color);
      textSize(20);
      textAlign(CENTER);
      text(message, width / 2, height / 10);
    }

    fill(0);
    strokeWeight(1);

    Modes.draw();
    temporaryPlayerOption = Modes.Op;

    GriSOp.draw();
    temporaryGridOption = GriSOp.Op;

    // ============ BUTTON ==============
    // b1.draw();
    // if (b1.isClicked()) { GameRun = !GameRun; }
    // b2.draw();
    // if (b2.isClicked()) { setup(); }
    fill(0);
    strokeWeight(5);
    line(width - 120, 575, width - 20, 575);
    line(width - 120, 270, width - 20, 270);
    line(width - 120, 320, width - 20, 320);
    fill(0, 0, 255);
    textSize(20);
    strokeWeight(0);
    //text("Options", width - 10, 340)
    //textSize(15)
    //text("Player 2", width - 20, 360)
    //text("Grid Size", width - 20, 400)
    mousePRE = false;
    MPressed = false;
  }
}

function vBar(v1, v2, mv) {
  noFill();
  strokeWeight(1);
  fill(255, 0, 0, 200);
  rect(width + 50, 30, 10, 200);
  fill(0, 255, 0, 200);
  rect(width + 65, 30, 10, 200);

  fill(255);
  rect(width + 50, 30, 10, (200 * (mv - v1)) / mv);
  rect(width + 65, 30, 10, (200 * (mv - v2)) / mv);
  fill(0);
}

// function keyTyped() {
//   if (key == "t" || key == "T") {
//     //switchTurn();
//   }
//   if (key == "r" || key == "R") {
//     setup();
//   }
//   if (key == "p" || key == "P") {
//     GameRun = !GameRun;
//   }
// }

function switchTurn() {
  turn = 1 - turn;
}

function mousePressed() {
  mousePRE = true;
  MPressed = true;
}

function GamePlot(dos) {
  this.grid = [];
  this.row = [];
  this.ds = dos;
  this.r;
  this.c;
  this.lines = [];
  this.rects = [];
  this.GameStarted = true;
  this.Nrect = 0;
  this.scorePlays = [0, 0];

  this.createGamePlot = function () {
    var i = 0;
    var j = 0;
    for (var xi = this.ds; xi < width - this.ds; xi += this.ds) {
      j = 0;
      this.grid[i] = [];
      this.lines[i] = [];
      this.rects[i] = [];
      for (var yi = this.ds; yi < height - this.ds; yi += this.ds) {
        //debugger;

        this.grid[i][j] = [xi, yi];
        this.lines[i][j] = [];
        this.lines[i][j][0] = [0, xi, yi, xi + this.ds, yi];
        this.lines[i][j][1] = [0, xi, yi, xi, yi + this.ds];
        this.rects[i][j] = [0, xi, yi, 0];
        j++;
      }
      i++;
    }

    this.r = i;
    this.c = j;
    this.Nrect = (this.r - 1) * (this.c - 1);
  };

  this.displayRect = function () {
    // noStroke();
    for (var i = 0; i < this.rects.length; i++) {
      for (var j = 0; j < this.rects[i].length; j++) {
        if (this.rects[i][j][0] != 0) {
          if (this.rects[i][j][3] == 0) fill(36, 206, 251, 200);
          if (this.rects[i][j][3] == 1) fill(255, 169, 106, 200);
          rect(this.rects[i][j][1], this.rects[i][j][2], this.ds, this.ds);
        }
      }
    }
    if (this.scorePlays[0] + this.scorePlays[1] == this.Nrect) {
      this.GameStarted = false;
    }
  };

  this.displayLines = function () {
    //fill(0);
    strokeWeight(8);
    for (var i = 0; i < this.lines.length; i++) {
      for (var j = 0; j < this.lines[i].length; j++) {
        //if(j!=this.lines[i].length-1){
        if (this.lines[i][j][0][0] != 0 && i < this.lines.length - 1) {
          var x1 = this.lines[i][j][0][1];
          var y1 = this.lines[i][j][0][2];
          var x2 = this.lines[i][j][0][3];
          var y2 = this.lines[i][j][0][4];

          if (this.lines[i][j][0][5] == 0) {
            stroke(239, 147, 101);
          } else if (this.lines[i][j][0][5] == 1) {
            stroke(62, 167, 208);
          }

          line(x1, y1, x2, y2);
        }

        //}
        if (this.lines[i][j][1][0] != 0 && j < this.lines[i].length - 1) {
          var x1 = this.lines[i][j][1][1];
          var y1 = this.lines[i][j][1][2];
          var x2 = this.lines[i][j][1][3];
          var y2 = this.lines[i][j][1][4];

          if (this.lines[i][j][1][5] == 0) {
            stroke(239, 147, 101);
          } else if (this.lines[i][j][1][5] == 1) {
            stroke(62, 167, 208);
          }
          line(x1, y1, x2, y2);
        }
      }
      //console.log(`i: ${i} - j: ${j}`)
    }
  };

  this.displayGrid = function () {
    fill(0);
    noStroke();
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid[i].length; j++) {
        ellipse(this.grid[i][j][0], this.grid[i][j][1], 10, 10);
      }
    }
  };

  this.CheckMouse = function (turn) {
    //debugger;
    var i = floor(mouseX / this.ds) - 1;
    var j = floor(mouseY / this.ds) - 1;

    if (i >= 0 && j >= 0 && i < this.grid.length && j < this.grid[0].length) {
      strokeWeight(5);

      if (turn == 0) {
        stroke(239, 147, 101, 150);
      }
      if (turn == 1) {
        stroke(62, 167, 208, 150);
      }
      if (
        mouseY > this.lines[i][j][0][2] - 10 &&
        mouseY < this.lines[i][j][0][2] + 10 &&
        i < this.grid.length - 1
      ) {
        line(
          this.lines[i][j][0][1],
          this.lines[i][j][0][2],
          this.lines[i][j][0][3],
          this.lines[i][j][0][4]
        );
        console.log(`__diem: ${i} vs diem: ${j}`);
        if (mousePRE) {
          if (this.lines[i][j][0][0] == 0) {
            this.lines[i][j][0][0] = 1;
            this.lines[i][j][0][5] = turn;
            var S = this.updateRect(i, j, turn);
            drawS.play();
            if (S == 0) {
              switchTurn();
            } else {
              scorePlay[turn] += S;
              this.scorePlays[turn] = scorePlay[turn];
            }
          }
          mousePRE = !mousePRE;
        }
      } else if (
        mouseX > this.lines[i][j][1][1] - 10 &&
        mouseX < this.lines[i][j][1][1] + 10 &&
        j < this.grid[0].length - 1
      ) {
        line(
          this.lines[i][j][1][1],
          this.lines[i][j][1][2],
          this.lines[i][j][1][3],
          this.lines[i][j][1][4]
        );
        console.log(`__diem: ${i} vs diem: ${j}`);
        if (mousePRE) {
          if (this.lines[i][j][1][0] == 0) {
            this.lines[i][j][1][0] = 1;
            this.lines[i][j][1][5] = turn;
            var S = this.updateRect(i, j, turn);
            drawS.play();
            if (S == 0) {
              switchTurn();
            } else {
              scorePlay[turn] += S;
              this.scorePlays[turn] = scorePlay[turn];
            }
          }
          mousePRE = !mousePRE;
        }
      }
    }
  };

  this.setPLine = function (i, j, hv, turn) {
    //debugger;
    if (i >= 0 && j >= 0 && i < this.grid.length && j < this.grid[0].length) {
      strokeWeight(5);
      if (turn == 0) {
        stroke(239, 147, 101, 100);
      }
      if (turn == 1) {
        stroke(0, 255, 0, 100);
      }

      if (hv == 0 && i < this.grid.length - 1) {
        line(
          this.lines[i][j][0][1],
          this.lines[i][j][0][2],
          this.lines[i][j][0][3],
          this.lines[i][j][0][4]
        );
        if (mousePRE) {
          if (this.lines[i][j][0][0] == 0) {
            this.lines[i][j][0][0] = 1;
            drawS.play();
            var S = this.updateRect(i, j, turn);
            if (S == 0) {
              switchTurn();
            } else {
              scorePlay[turn] += S;
              this.scorePlays[turn] = scorePlay[turn];
            }
          }
          mousePRE = !mousePRE;
        }
      } else if (hv == 1 && j < this.grid[0].length - 1) {
        line(
          this.lines[i][j][1][1],
          this.lines[i][j][1][2],
          this.lines[i][j][1][3],
          this.lines[i][j][1][4]
        );
        if (mousePRE) {
          if (this.lines[i][j][1][0] == 0) {
            this.lines[i][j][1][0] = 1;
            drawS.play();
            var S = this.updateRect(i, j, turn);
            if (S == 0) {
              switchTurn();
            } else {
              scorePlay[turn] += S;
              this.scorePlays[turn] = scorePlay[turn];
            }
          }
          mousePRE = !mousePRE;
        }
      }
    }
  };

  this.updateRect = function (i, j, turn) {
    var boxed = 0;
    for (var ii = i - 1; ii < i + 1; ii++) {
      for (var jj = j - 1; jj < j + 1; jj++) {
        if (this.checkRectIJ(ii, jj)) {
          if (this.rects[ii][jj][0] == 0) {
            this.rects[ii][jj][0] = 1;
            this.rects[ii][jj][3] = turn;
            boxed++;
          }
        }
      }
    }
    return boxed;
  };

  this.checkRectIJ = function (i, j) {
    if (
      i + 1 <= this.lines.length - 1 &&
      j + 1 <= this.lines[0].length - 1 &&
      i >= 0 &&
      j >= 0
    ) {
      if (this.lines[i][j][0][0] != 0 && this.lines[i][j][1][0] != 0) {
        if (
          this.lines[i + 1][j][1][0] != 0 &&
          this.lines[i][j + 1][0][0] != 0
        ) {
          return true;
        }
      }
    }
    return false;
  };
}

function CheckNumberOfEgesOfRect(gameObject, i, j, hv) {
  if (hv == 1) {
    if (i > 0 && i < gameObject.r - 1) {
      var r = [i, j, i - 1, j];
    } else if (i == 0) {
      var r = [i, j];
    } else {
      var r = [i - 1, j];
    }
  } else {
    if (j > 0 && j < gameObject.c - 1) {
      var r = [i, j, i, j - 1];
    } else if (j == 0) {
      var r = [i, j];
    } else {
      var r = [i, j - 1];
    }
  }

  var Nl = [0, 0];

  Nl[0] =
    gameObject.lines[r[0]][r[1]][0][0] +
    gameObject.lines[r[0]][r[1]][1][0] +
    gameObject.lines[r[0] + 1][r[1]][1][0] +
    gameObject.lines[r[0]][r[1] + 1][0][0];
  if (r.length > 2) {
    Nl[1] =
      gameObject.lines[r[2]][r[3]][0][0] +
      gameObject.lines[r[2]][r[3]][1][0] +
      gameObject.lines[r[2] + 1][r[3]][1][0] +
      gameObject.lines[r[2]][r[3] + 1][0][0];
  }
  return Nl;
}

function Button(x, y, sz, label) {
  this.x = x;
  this.y = y;
  this.d = sz;
  this.label1 = label;
  this.l = (this.label1.length * 4) / 10;

  this.drawAndUpdate = function () {
    this.draw();
    //this.updateState();
  };

  this.draw = function () {
    fill(0, 0, 255, 50);
    stroke(0);
    strokeWeight(1);
    rect(this.x, this.y, this.d * this.l, this.d, 20, 55, 55, 20);
    fill(0);
    strokeWeight(0);
    textSize(this.d / 1.5);

    text(
      this.label1,
      this.x + this.d / 8,
      this.y + this.d / 5,
      this.x + this.d,
      this.y + this.d
    );
  };
  this.isClicked = function () {
    if (
      mouseX < this.x + this.d * this.l &&
      mouseX > this.x &&
      mouseY < this.y + this.d &&
      mouseY > this.y
    ) {
      if (MPressed) {
        MPressed = false;
        return true;
      }
      return false;
    }
    return false;
  };
}

function gridOption(x, y, actv, labels) {
  this.x = x;
  this.y = y;
  this.actv = actv;
  this.labels = labels;
  this.nO = labels.length;
  this.Op = 0;
  //this.l = this.labels[0].length*4/10;

  this.drawAndUpdate = function () {
    this.draw();
    //this.updateState();
  };

  this.draw = function () {
    textSize(13);
    stroke(0);
    strokeWeight(0);
    var trns = 255;
    if (!this.actv) {
      trns = 20;
    }
    for (var i = 0; i < this.nO; i++) {
      fill(0, trns);
      strokeWeight(0);
      text(this.labels[i], this.x, this.y + i * 20 + 5);
      fill(255, trns);
      if (i == this.Op) {
        fill(0, 255, 0, trns);
      }
      strokeWeight(1);
      ellipse(this.x + 60, this.y + i * 20, 10, 10);
    }
    if (this.actv) {
      this.updateState();
    }
  };

  this.updateState = function () {
    if (mouseX < this.x + 70 && mouseX > this.x) {
      for (var i = 0; i < this.nO; i++) {
        if (mouseY < this.y + i * 20 + 10 && mouseY > this.y + i * 20 - 10) {
          if (MPressed) {
            MPressed = false;
            this.Op = i;
          }
        }
      }
    }
  };
}
