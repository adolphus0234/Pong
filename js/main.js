import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js';
import Text from './components/Text.js';
import MultiText from './components/MultiText.js';
import GUI from './GUI.js';
import Keyboard from './Keyboard.js';
import MotionFx from './MotionFx.js';

const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;

class Pong {
	constructor() {

		//INITIALIZING OBJECTS WITHIN PONG

		this.canvas = canvas;
		this.body = document.getElementById("body");

		this.ball = new Ball((width / 2) - 120, height / 2, 20, canvas);

		this.leftPaddle = new Paddle(this.ball.size * 3, height / 3,
									 20, 200, this, canvas);

		this.rightPaddle = new Paddle(width - (this.ball.size * 4), height / 3,
									  20, 200, this, canvas);
		this.rightPaddle.isCpu = true;

		this.motionFx = new MotionFx(this);

		this.gUI = new GUI(canvas, width, height, this);
		this.keyboard = new Keyboard(this, canvas);

		//OTHER VARIABLES

		this.left_score = document.getElementById("p1_score");
		this.right_score = document.getElementById("p2_score");		

		this.isPlayerOneMove = true;
		this.firstMoveOfFirstGame = true;

		this.showGameOver = false;

		this.step = 40;

		this.ballSpeedIncrease = 0.25 * 50;

		this.paused = false;
		this.timeout = false;

		//STATES

		this.startScreen = true;
		this.optionsScreen = false;
		this.gameScreen = false;
		this.endGame = false;
		this.restartScreen = false;

		this.flashBackground = false;
		this.medPhase = false;
		this.maxPhase = false;
		this.matchPoint_p1 = false;
		this.matchPoint_p2 = false;
		this.displayMP = false;

		// GAMEPLAY TEXT

		this.playerOneText = new MultiText(context, "PLAYER 1", "25px", 20, 60, "grey");
		this.playerOneText.addLine(`(YOU)`, 30, "20px");
		this.playerOneServingText = new Text(context, `YOUR SERVE!`, "20px", 20, 140, "rgb(180, 180, 180)");
		this.playerOneMatchPointText = new Text(context, `MATCH POINT`, "16px", 20, 25, "rgb(130, 200, 255)");

		this.playerTwoText = new Text(context, "PLAYER 2", "25px", 760, 60, "grey");
		this.playerTwoServingText = new Text(context, `SERVING...`, "20px", 760, 100, "rgb(180, 180, 180)");
		this.playerTwoMatchPointText = new Text(context, `MATCH POINT`, "16px", 760, 25, "rgb(130, 200, 255)");

		this.gameTipText = new MultiText(context, `PRESS SPACEBAR TO SERVE.`, "20px",  20, 540, "rgb(220, 220, 220)");
		this.gameTipText.addLine(`USE ARROW UP AND DOWN`, 40);
		this.gameTipText.addLine(`TO MOVE YOUR PADDLE!`, 40);

		this.winnerText = new Text(context, `WINNER!!`, "35px",  20, 60);
		this.gameOverText = new Text(context, "GAMEOVER", "90px", width / 3 - 133, 350);	

		//SOUNDS

		this.userScoresSFX = new Audio("./sounds/user_scores.wav");
		this.cpuScoresSFX = new Audio("./sounds/player_scores.wav");
		this.matchPointChime = new Audio("./sounds/match-point.wav");

		//GAME LOOP

		const deltaTime = 1/60;
		let accumulatedTime = 0;
		let lastTime = 0;

		const loop = (time = 0) => {
			accumulatedTime += (time - lastTime) / 1000;

			while(accumulatedTime > deltaTime) {

				if (!this.paused) {
					if (!this.startScreen && !this.optionsScreen && !this.restartScreen) {
					this.update(deltaTime, time);
					}

					if (!this.gameScreen && !this.optionsScreen && !this.restartScreen) {
						this.gUI.titleScreen(deltaTime);
					}

					if (!this.startScreen && !this.gameScreen && !this.restartScreen) {
						this.gUI.gameOptions(deltaTime);
					}

					if (!this.startScreen && !this.gameScreen && !this.optionsScreen) {
						this.gUI.restartOptions();
					}

					this.gUI.pauseNotice();
				}

				accumulatedTime -= deltaTime;

			}
			
			requestAnimationFrame(loop);

			lastTime = time;
		}

		loop();

		let that = this;
		this._timeout;

		this._pongTimeout = () => {
			this._timeout = setTimeout(function() {
				that.timeout = true;
			}, 60000);
		}

		this._clearTimeout = () => {
			clearTimeout(this._timeout);
		}

		this._pongTimeout();
	}

	show(deltaTime) {

		//GAMEBOARD
		this.background("black");

		//MIDDLE LINES
		context.strokeStyle = "rgb(80, 80, 80)";
		context.beginPath();
		context.moveTo(width / 2, 20);
		context.lineTo(width / 2, 60);
		context.moveTo(width / 2, 100);
		context.lineTo(width / 2, 140);
		context.moveTo(width / 2, 180);
		context.lineTo(width / 2, 220);
		context.moveTo(width / 2, 260);
		context.lineTo(width / 2, 300);

		context.moveTo(width / 2, 340);
		context.lineTo(width / 2, 380);
		context.moveTo(width / 2, 420);
		context.lineTo(width / 2, 460);
		context.moveTo(width / 2, 500);
		context.lineTo(width / 2, 540);
		context.moveTo(width / 2, 580);
		context.lineTo(width / 2, 620);
		context.stroke();

		if (!this.endGame) {
			this.displayHeader();
			
			//GAME OBJECTS
			this.ball.update(context, deltaTime);
			this.leftPaddle.update(context, this.ball, deltaTime);
			this.rightPaddle.update(context, this.ball, deltaTime);
		}	

		if (this.endGame) {
			this.displayWinner();
			this.gameOver();
		}	
	}

	background(color) {
		context.fillStyle = color;
		context.fillRect(0, 0, width, height);
	}

	displayHeader() {
		this.playerOneText.show();
		this.playerTwoText.show();

		if (this.isPlayerOneMove) {
			this.showServeIcon('p1');

			if (this.ball.xSpeed === 0 && this.ball.ySpeed === 0) {
				
				this.showBlinkingText(this.playerOneServingText);

				if (this.firstMoveOfFirstGame) {
					this.gameTipText.show(); // Will only show during the very first game
				} 
			}
		} else {
			this.showServeIcon('p2');

			if (this.ball.xSpeed === 0 && this.ball.ySpeed === 0) {

				this.showBlinkingText(this.playerTwoServingText);
			}
		}		
	}

	displayWinner() {
		this.showBlinkingText(this.winnerText);

		if (this.leftPaddle.score === this.gUI.gameScoreLimit) {
			this.winnerText.x = 20;
		}
		
		if (this.rightPaddle.score === this.gUI.gameScoreLimit) {
			this.winnerText.x = 700;
		}
	}

	gameOver() {	
		if (this.showGameOver === true) {
			this.gameOverText.show();			
		}								
	}

	score(time) {
		if (this.ball.x > width - this.ball.size) {
			this.userScoresSFX.play();

			this.isPlayerOneMove = false;
			this.leftPaddle.score += 1;
			this.ball.reset(this.isPlayerOneMove);
			this.resetPaddleAttributes();
			this.resetFieldAttributes();
			this.checkForWin();
		}

		if (this.ball.x < 0) {
			this.cpuScoresSFX.play();

			this.isPlayerOneMove = true;
			this.rightPaddle.score += 1;
			this.ball.reset(this.isPlayerOneMove);
			this.resetPaddleAttributes();
			this.resetFieldAttributes();
			this.checkForWin();
		}

		if (this.leftPaddle.score <= this.gUI.gameScoreLimit 
		&&  this.rightPaddle.score <= this.gUI.gameScoreLimit) {
			this.left_score.innerText = `${this.leftPaddle.score}`.toString();
			this.right_score.innerText = `${this.rightPaddle.score}`.toString();
		}

		// MATCH POINT DISPLAY EFFECTS (will refactor later)

		if (this.matchPoint_p1 && !this.displayMP) {	
			this.playerOneMatchPointText.update('rgb(130, 200, 255)');		
		} else if (this.matchPoint_p1 && this.displayMP) {
			this.playerOneMatchPointText.update(animRgb(130, 200, 255, time, 2));
		}

		if (this.matchPoint_p2 && !this.displayMP) {	
			this.playerTwoMatchPointText.update('rgb(130, 200, 255)');		
		} else if (this.matchPoint_p2 && this.displayMP) {
			this.playerTwoMatchPointText.update(animRgb(130, 200, 255, time, 2));
		}

		if (this.ball.xSpeed !== 0) {
			this.displayMP = false;
		}
	}

	resetFieldAttributes() {
		this.canvas.style.borderColor = "rgb(200, 0, 0)";
		this.body.style.background = "rgb(35, 0, 0)";

		this.flashBackground = false;
		this.medPhase = false;
		this.maxPhase = false;
	}

	resetPaddleAttributes() {
		this.rightPaddle.cpuSlowSpeed = this.rightPaddle.defaultCpuSlowSpeed;

		this.rightPaddle.deflectionFactor = 700;
		this.leftPaddle.deflectionFactor = 700;
	}

	checkForWin() {
		if (this.leftPaddle.score === this.gUI.gameScoreLimit
		|| this.rightPaddle.score === this.gUI.gameScoreLimit) {
			
			this.endGame = true;

			this.matchPoint_p1 = false;
			this.matchPoint_p2 = false;
			clearTimeout(this.MP_TIMEOUT);

			let that = this;
			setTimeout(function() {
				that.showGameOver = true;
			}, 2000);

			setTimeout(function() {
				that.endGame = false;
				that.showGameOver = false;
				that.gameScreen = false;
				that.restartScreen = true;
				that.left_score.innerText = '';
				that.right_score.innerText = '';
			}, 5000);
		}

		this.checkForMatchPoint();
	}

	checkForMatchPoint() {
		let that = this;

		if (this.leftPaddle.score === this.gUI.gameScoreLimit - 1) {
			this.matchPoint_p1 = true;
		}

		if (this.rightPaddle.score === this.gUI.gameScoreLimit - 1) {
			this.matchPoint_p2 = true;
		}

		if (this.matchPoint_p1 || this.matchPoint_p2) {
			this.MP_TIMEOUT = setTimeout(function() {
				that.matchPointChime.play();
				that.displayMP = true;
			}, 1000)
		}
	}

	setDifficulty() {
		if (this.gUI.gameDiff === 0) {
			this.updateBallSpeed(1000, 0.25 * 50, 350);
			this.updatePaddleSpeeds(450, 450, 200, 450, 200);

		} else if (this.gUI.gameDiff === 1) {
			this.updateBallSpeed(1500, 0.50 * 50, 550);
			this.updatePaddleSpeeds(600, 700, 400, 600, 250);

		} else if (this.gUI.gameDiff === 2) {
			this.updateBallSpeed(1750, 0.50 * 50, 750);
			this.updatePaddleSpeeds(750, 900, 550, 900, 400);
		}
	}

	updateBallSpeed(ballMaxSpeed, ballSpeedIncrease, demoBallSetSpeed) {
		this.ball.maxSpeed = ballMaxSpeed;
		this.ballSpeedIncrease = ballSpeedIncrease;

		this.gUI.pongDemo.demoBall.setSpeed = demoBallSetSpeed;
	}

	updatePaddleSpeeds(maxSpeed, cpuMaxSpeed, cpuSlowSpeed, demoMaxSpeed, demoSlowSpeed) {
		let demo = this.gUI.pongDemo;

		this.leftPaddle.maxSpeed = maxSpeed;
		this.rightPaddle.cpuMaxSpeed = cpuMaxSpeed;
		this.rightPaddle.cpuSlowSpeed = cpuSlowSpeed;
		this.rightPaddle.defaultCpuSlowSpeed = cpuSlowSpeed;			

		demo.rightDemoPaddle.cpuMaxSpeed = demoMaxSpeed;
		demo.rightDemoPaddle.cpuSlowSpeed = demoSlowSpeed;

		demo.leftDemoPaddle.cpuMaxSpeed = demoMaxSpeed;
		demo.leftDemoPaddle.cpuSlowSpeed = demoSlowSpeed;
	}

	setPaddleLength() {
		if (this.gUI.pL === 0) {
			this.updatePaddleAttributes(200, 14 * 50);
		} else if (this.gUI.pL === 1) {
			this.updatePaddleAttributes(140, 16 * 50);
		}
	}

	updatePaddleAttributes(length, deflectionFactor) {
		let demo = this.gUI.pongDemo;

		this.leftPaddle.length = length;
		this.rightPaddle.length = length;

		demo.leftDemoPaddle.length = length;
		demo.rightDemoPaddle.length = length;

		this.leftPaddle.deflectionFactor = deflectionFactor;
		this.rightPaddle.deflectionFactor = deflectionFactor;

		demo.leftDemoPaddle.deflectionFactor = deflectionFactor;
		demo.rightDemoPaddle.deflectionFactor = deflectionFactor;
	}

	showServeIcon(player) {
		context.fillStyle = "grey";

		if (player === 'p1') {			
			context.fillRect(200, 45, 12, 12);
		} else {
			context.fillRect(725, 45, 12, 12);
		}
		
	}

	showBlinkingText(text) {
		this.step--;

		if (this.step < 30) {

			text.show();
			
			if (this.step === 0) {
				this.step = 40;
			}	
		}
	}

	showBackgroundFlash(time) {
		this.canvas.style.borderColor = animRgb(200, 0, 0, time, 2)
		this.body.style.background = animRgb(35, 0, 0, time, 2);
	}

	setBackgroundPhase(phase) {
		if (phase === "max") {
			this.background("rgb(80, 0, 0)");
			this.medPhase = false;
			this.maxPhase = true;

			this.flashBackground = false;
			this.canvas.style.borderColor = "rgb(70, 0, 0)";
			this.body.style.background = "rgb(15, 0, 0)";
		} else {
			this.flashBackground = true;
			this.medPhase = true;
		}
	}

	start() {
		if (this.ball.xSpeed === 0 && this.ball.ySpeed === 0) {
			if (this.isPlayerOneMove) {
				this.ball.xSpeed = -20;
			}
		}		
	}

	update(deltaTime, time) {
		this.show(deltaTime);

		this.leftPaddle.capturePaddle(this.rightPaddle);

		this.score(time/200);

		if (this.flashBackground) {
			this.showBackgroundFlash(time/200);
		}

		this.motionFx.update(this, context);
	}
}

export const animRgb = (r, g, b, time, f) => {
	let c1 = Math.floor(Math.sin(time) * r / f) + r / 1;
	let c2 = Math.floor(Math.sin(time) * g / f) + g / 1;
	let c3 = Math.floor(Math.sin(time) * b / f) + b / 1;

	return `rgb(${c1}, ${c2}, ${c3})`;
}

const pong = new Pong();


// Control Event Listeners --------------------------------------------------

document.addEventListener("keyup", event => {
	if (event.code === "ArrowUp" || event.code === "ArrowDown") {
		pong.leftPaddle.speed = 0;
	} 
});

document.addEventListener("keydown", event => {
	if (!pong.paused) {
		if (!pong.startScreen && !pong.optionsScreen 
		&&  !pong.endGame && !pong.restartScreen) {

			pong.keyboard.gameplayControls(event);

		} else if (!pong.gameScreen && !pong.optionsScreen 
				&& !pong.endGame && !pong.restartScreen) {

			pong.keyboard.titleScreenControls(event);
			
		} else if (!pong.gameScreen && !pong.startScreen 
				&& !pong.endGame && !pong.restartScreen) {

			pong.keyboard.optionsScreenControls(event);

		} else if (!pong.gameScreen && !pong.optionsScreen 
				&& !pong.endGame && !pong.startScreen) {

			pong.keyboard.gameoverScreenControls(event);
		}

		pong._clearTimeout();
		pong._pongTimeout();
	}
});

document.addEventListener("keypress", event => {
	if (event.code === "Enter") {
		if (pong.timeout) {
			pong.timeout = false;
			pong.paused = false;

			pong._pongTimeout();
		}		
	} else {
		pong._clearTimeout();
		pong._pongTimeout();
	}
})