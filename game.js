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

let isShowGameplay = false;

var coinS, BackS, drawS;
function preload() {
  coinS = loadSound("sound-coin.wav");
  BackS = loadSound("Background.mp3");
  drawS = loadSound("event.wav");
  drawS.rate(3);
  BackS.loop();
}

function setup() {
  createCanvas(700, 700);
  console.log('loaded')
  fill(0);
  width = width - 100;
  height = height - 100;

  playerOption = temporaryPlayerOption;
  selectedGridOption = temporaryGridOption;
  getSize = dos[selectedGridOption];
  gameObject = new GamePlot(getSize);
  gameObject.createGamePlot();
  if (playerOption == 3) {
    frameRate(3);
  } else {
    frameRate(60);
  }

  scorePlay = [0, 0];

  turn = 0;
  tTurn = turn;

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
  if (isShowGameplay) {
    background(255);
    fill(255, 10);
    strokeWeight(10);
    rect(dots / 2, dots / 2, width - dots, height - dots);
    rect(5, 5, width + 80, height + 30);

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
    text("Player 1", width - dots / 3, 70);
    text(" " + gameObject.scorePlays[0], width + 5, 100);
    text("Player 2", width - dots / 3, 150);
    text(" " + gameObject.scorePlays[1], width + 5, 180);

    textSize(13);
    text("Turn", width - dots / 3, 290);
    text("Player #" + (turn + 1), width - dots / 3, 310);
    fill(255 * (1 - turn), 255 * turn, 0, 200);
    ellipse(width + 60, 290, 30, 30);

    // fill(0, 0, 255)
    // textSize(23);
    // text('Scores', width - 10, 260)

    //vBar(gameObject.scorePlays[0], gameObject.scorePlays[1], gameObject.Nrect)
    fill(255, 0, 0, 150);
    rect(width - 15, 85, 15, 15);
    fill(0, 255, 0, 150);
    rect(width - 15, 165, 15, 15);

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
        if (playerOption != 0) {
          if (playerOption == 1) {
            if (turn == 1) {
              IJH = AIAgentP(gameObject, 0.3);
              var tim = millis();
              for (var t = tim; t < tim + 500000; t += millis() - tim) {}

              if (IJH.length > 0) {
                mousePRE = true;
                gameObject.setPLine(IJH[0], IJH[1], IJH[2], turn);
              }
            }
          }

          if (playerOption == 2) {
            if (turn == 1) {
              IJH = AIAgentP(gameObject, 0.9);
              var tim = millis();
              for (var t = tim; t < tim + 500000; t += millis() - tim) {}

              if (IJH.length > 0) {
                mousePRE = true;
                gameObject.setPLine(IJH[0], IJH[1], IJH[2], turn);
              }
            }
          }

          if (playerOption == 3) {
            IJH = AIAgentP(gameObject, 0.9);
            if (IJH.length > 0) {
              //if(random(0,1)<0.3){mousePRE =true;}
              mousePRE = true;
              gameObject.setPLine(IJH[0], IJH[1], IJH[2], turn);
            }
            //drawS.play();
          }
          fill(0, 255, 0);
          if (IJH != null) {
            IJHi[0] = IJH[0];
            IJHi[1] = IJH[1];
            IJHi[2] = IJH[2];
          }

          strokeWeight(5);
          if (tTurn == 1) {
            stroke(0, 255, 0);
          }
          if (tTurn == 0) {
            stroke(255, 0, 0);
          }
          if (playerOption == 1 || playerOption == 2) {
            tTurn = 1;
          } else {
            tTurn = turn;
          }

          if (IJHi[2] == 0) {
            line(
              getSize + getSize * IJHi[0],
              getSize + getSize * IJHi[1],
              2 * getSize + getSize * IJHi[0],
              getSize + getSize * IJHi[1]
            );
          } else {
            line(
              getSize + getSize * IJHi[0],
              getSize + getSize * IJHi[1],
              getSize + getSize * IJHi[0],
              2 * getSize + getSize * IJHi[1]
            );
          }
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
        text("Player 1 Winner", width / 2, height / 10);
      } else if (scorePlay[0] < scorePlay[1]) {
        text("Player 2 Winner", width / 2, height / 10);
      }
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
    line(width - 25, 575, width + 85, 575);
    line(width - 25, 270, width + 85, 270);
    line(width - 25, 320, width + 85, 320);
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
    for (var xi = this.ds; xi < width; xi += this.ds) {
      j = 0;
      this.grid[i] = [];
      this.lines[i] = [];
      this.rects[i] = [];
      for (var yi = this.ds; yi < height; yi += this.ds) {
        this.grid[i][j] = [xi, yi];

        this.lines[i][j] = [];
        this.lines[i][j][0] = [0, xi, yi, xi + this.ds, yi];
        this.lines[i][j][1] = [0, xi, yi, xi, yi + this.ds];
        this.rects[i][j] = [0, xi, yi, 0];
        j++;
      }
      i++;
    }
    // console.log(`i: ${i} - j: ${j}`)
    this.r = i;
    this.c = j;
    this.Nrect = (this.r - 1) * (this.c - 1);
  };

  this.displayRect = function () {
    //noStroke();
    for (var i = 0; i < this.rects.length; i++) {
      for (var j = 0; j < this.rects[i].length; j++) {
        if (this.rects[i][j][0] != 0) {
          fill(
            255 * (1 - this.rects[i][j][3]),
            255 * this.rects[i][j][3],
            0,
            150
          );
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
    stroke(0, 0, 255);
    strokeWeight(5);
    for (var i = 0; i < this.lines.length; i++) {
      for (var j = 0; j < this.lines[i].length; j++) {
        //if(j!=this.lines[i].length-1){
        if (this.lines[i][j][0][0] != 0 && i < this.lines.length - 1) {
          var x1 = this.lines[i][j][0][1];
          var y1 = this.lines[i][j][0][2];
          var x2 = this.lines[i][j][0][3];
          var y2 = this.lines[i][j][0][4];
          line(x1, y1, x2, y2);
        }

        //}
        if (this.lines[i][j][1][0] != 0 && j < this.lines[i].length - 1) {
          var x1 = this.lines[i][j][1][1];
          var y1 = this.lines[i][j][1][2];
          var x2 = this.lines[i][j][1][3];
          var y2 = this.lines[i][j][1][4];
          line(x1, y1, x2, y2);
        }
      }
    }
    //console.log(`i: ${i} - j: ${j}`)
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
    var i = floor(mouseX / this.ds) - 1;
    var j = floor(mouseY / this.ds) - 1;
    if (i >= 0 && j >= 0 && i < this.grid.length && j < this.grid[0].length) {
      strokeWeight(5);

      if (turn == 0) {
        stroke(255, 0, 0, 100);
      }
      if (turn == 1) {
        stroke(0, 255, 0, 100);
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
        if (mousePRE) {
          if (this.lines[i][j][0][0] == 0) {
            this.lines[i][j][0][0] = 1;
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
        if (mousePRE) {
          if (this.lines[i][j][1][0] == 0) {
            this.lines[i][j][1][0] = 1;
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
    if (i >= 0 && j >= 0 && i < this.grid.length && j < this.grid[0].length) {
      strokeWeight(5);
      if (turn == 0) {
        stroke(255, 0, 0, 100);
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

function dumbAIAgent(gameObject) {
  var aLines = [];
  var ij = 0;
  for (var i = 0; i < gameObject.lines.length; i++) {
    for (var j = 0; j < gameObject.lines[i].length; j++) {
      if (i < gameObject.lines.length - 1) {
        if (gameObject.lines[i][j][0][0] == 0) {
          aLines[ij] = [i, j, 0];
          ij++;
        }
      }
      if (j < gameObject.lines[i].length - 1) {
        if (gameObject.lines[i][j][1][0] == 0) {
          aLines[ij] = [i, j, 1];
          ij++;
        }
      }
    }
  }
  if (ij > 0) {
    var r = round(random(0, ij - 1));
    return aLines[r];
  } else {
    return aLines;
  }
}

function LessDumbAIAgent(gameObject) {
  var aLines = [];
  var ij = 0;
  var indx = [];
  for (var i = 0; i < gameObject.lines.length; i++) {
    for (var j = 0; j < gameObject.lines[i].length; j++) {
      if (i < gameObject.lines.length - 1) {
        if (gameObject.lines[i][j][0][0] == 0) {
          aLines[ij] = [i, j, 0];
          indx[ij] = ij;
          ij++;
        }
      }
      if (j < gameObject.lines[i].length - 1) {
        if (gameObject.lines[i][j][1][0] == 0) {
          aLines[ij] = [i, j, 1];
          indx[ij] = ij;
          ij++;
        }
      }
    }
  }

  if (ij > 0) {
    for (var ii = 0; ii < ij - 1; ii++) {
      var rr = round(random(0, indx.length - 1));
      var r = indx[rr];

      var ni = aLines[r][0];
      var nj = aLines[r][1];
      var nHv = aLines[r][2];
      var N = CheckNumberOfEgesOfRect(gameObject, ni, nj, nHv);
      if (max(N) < 2) {
        return [ni, nj, nHv];
        indx = removeIfromArray(indx, rr);
      }
    }

    var r = round(random(0, ij - 1));
    return aLines[r];
  } else {
    return aLines;
  }
}

function AIAgent(gameObject) {
  for (var i = 0; i < gameObject.rects.length - 1; i++) {
    for (var j = 0; j < gameObject.rects[i].length - 1; j++) {
      if (gameObject.rects[i][j][0] == 0) {
        if (
          gameObject.lines[i][j][0][0] +
            gameObject.lines[i][j][1][0] +
            gameObject.lines[i + 1][j][1][0] +
            gameObject.lines[i][j + 1][0][0] ==
          3
        ) {
          if (gameObject.lines[i][j][0][0] == 0) {
            return [i, j, 0];
          } else if (gameObject.lines[i][j][1][0] == 0) {
            return [i, j, 1];
          } else if (gameObject.lines[i + 1][j][1][0] == 0) {
            return [i + 1, j, 1];
          } else {
            return [i, j + 1, 0];
          }
        }
      }
    }
  }
  return LessDumbAIAgent(gameObject);
}

function AIAgentP(gameObject, p) {
  for (var i = 0; i < gameObject.rects.length - 1; i++) {
    for (var j = 0; j < gameObject.rects[i].length - 1; j++) {
      if (gameObject.rects[i][j][0] == 0) {
        if (
          gameObject.lines[i][j][0][0] +
            gameObject.lines[i][j][1][0] +
            gameObject.lines[i + 1][j][1][0] +
            gameObject.lines[i][j + 1][0][0] ==
          3
        ) {
          if (gameObject.lines[i][j][0][0] == 0) {
            return [i, j, 0];
          } else if (gameObject.lines[i][j][1][0] == 0) {
            return [i, j, 1];
          } else if (gameObject.lines[i + 1][j][1][0] == 0) {
            return [i + 1, j, 1];
          } else {
            return [i, j + 1, 0];
          }
        }
      }
    }
  }

  if (random(0, 1) < p) {
    return LessDumbAIAgent(gameObject);
  } else {
    return dumbAIAgent(gameObject);
  }
}

// function ButtonC(xi, yi, di, label) {
// 	this.x = xi;
// 	this.y = yi;
// 	this.d = di;
// 	this.label = label

// 	this.drawButton = function () {
// 		fill(255)
// 		strokeWeight(3)
// 		stroke(0)
// 		ellipse(this.x, this.y - 10, this.d, this.d)
// 		ellipse(this.x, this.y - 5, this.d, this.d)
// 		ellipse(this.x, this.y, this.d, this.d)
// 		fill(0)
// 		strokeWeight(0)
// 		textSize(this.d / 4)
// 		textAlign(CENTER, CENTER)
// 		text(this.label, this.x, this.y)//,this.d,this.d)
// 	}

// 	this.isClicked = function () {
// 		if (dist(mouseX, mouseY, this.x, this.y) < this.d) {
// 			if (MPressed) {
// 				MPressed = false;
// 				fill(0, 0, 0)
// 				ellipse(this.x, this.y - 10, this.d, this.d)
// 				ellipse(this.x, this.y - 5, this.d, this.d)
// 				return true;
// 			}
// 			else { return false; }
// 		}
// 		else { return false; }
// 	}
// }

function removeIfromArray(B, i) {
  if (i <= B.length && i >= 0) {
    var Bi = [];
    count = 0;
    for (var j = 0; j < B.length; j++) {
      if (j != i) {
        Bi[count] = B[j];
        count++;
      }
    }
    B = [];
    B = Bi;
  }

  return B;
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
