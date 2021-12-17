export default class Keyboard {
	constructor(pong, canvas) {
		this.pong = pong;
		this.canvas = canvas;

		this.menuSelect = new Audio("./sounds/game-sound-correct.wav");
		this.changeOption = new Audio("./sounds/tone-beep.wav");
		this.menuClick = new Audio("./sounds/menu-button-click.wav");
	}

	gameplayControls(event) {
		if (event.code === "ArrowUp") {
			this.pong.leftPaddle.speed = -this.pong.leftPaddle.maxSpeed;
		} else if (event.code === "ArrowDown") {
			this.pong.leftPaddle.speed = this.pong.leftPaddle.maxSpeed;
		} else if (event.code === "Space") {
			this.pong.start();
			this.pong.firstMoveOfFirstGame = false;
		}
	}

	gameoverScreenControls(event) {
		if (event.code === "ArrowUp") {

			this.pong.gUI.arrowPosRestart = 450;
			this.pong.gUI.yesColor = "white";
			this.pong.gUI.noColor = "grey";

			this.pong.gUI.onYes = true;
			this.pong.gUI.onNo = false;
		} else if (event.code === "ArrowDown") {

			this.pong.gUI.arrowPosRestart = 550;
			this.pong.gUI.yesColor = "grey";
			this.pong.gUI.noColor = "white";

			this.pong.gUI.onYes = false;
			this.pong.gUI.onNo = true;
		} else if (event.code === "ShiftLeft") {
			if (this.pong.gUI.onYes === true) {

				this.resetGame();
				this.pong.gameScreen = true;
			}
			if (this.pong.gUI.onNo === true) {

				this.resetGame();
				this.pong.startScreen = true;				
			}			
		}
	}

	optionsScreenControls(event) {
		if (event.code === "ArrowUp") {
			if (this.pong.gUI.arrowPosOptions > 100) {
				this.pong.gUI.arrowPosOptions -= 50;

				if (this.pong.gUI.arrowPosOptions === 250) {
					this.pong.gUI.arrowPosOptions -= 50;
				}
			}

			if (this.pong.gUI.index > 0) {
				this.soundChangeOption();
				this.pong.gUI.index--;
			}

			this.pong.gUI.menuController();		
		} else if (event.code === "ArrowDown") {
			if (this.pong.gUI.arrowPosOptions < 300) {
				this.pong.gUI.arrowPosOptions += 50;

				if (this.pong.gUI.arrowPosOptions === 250) {
					this.pong.gUI.arrowPosOptions += 50;
				}
			}
			if (this.pong.gUI.index < 3) {
				this.soundChangeOption();
				this.pong.gUI.index++;
			}
			this.pong.gUI.menuController();

		} else if (event.code === "ShiftLeft") {
			if (this.pong.gUI.onMainMenu === true) {

				this.pong.optionsScreen = false;

				this.pong.gUI.selectedOption = [true, false, false, false];
				this.pong.gUI.mainMenuColor = "grey";
				this.pong.gUI.arrowPosOptions = 100;
				this.pong.gUI.index = 0;

				this.pong.gUI.pongDemo.reset();

				//this.soundMenuSelect();

				this.pong.startScreen = true;	
			}
		} else if (event.code === "ArrowLeft") {
			if (this.pong.gUI.onDifficulty === true) {
				if (this.pong.gUI.gameDiff > 0) {
					this.soundMenuClick();
					this.pong.gUI.gameDiff--;
					this.pong.gUI.pongDemo.reset();
				}
			}
			if (this.pong.gUI.onGameLimit === true) {
				if (this.pong.gUI.gameScoreLimit > 2) {
					this.soundMenuClick();
					this.pong.gUI.gameScoreLimit--;
				}
			}
			if (this.pong.gUI.onPaddleLength) {
				if (this.pong.gUI.pL > 0) {
					this.soundMenuClick();
					this.pong.gUI.pL--;
					this.pong.gUI.pongDemo.reset();
				}
			}
		} else if (event.code === "ArrowRight") {
			if (this.pong.gUI.onDifficulty === true) {
				if (this.pong.gUI.gameDiff < 2) {
					this.soundMenuClick();
					this.pong.gUI.gameDiff++;
					this.pong.gUI.pongDemo.reset();
				}
			}
			if (this.pong.gUI.onGameLimit === true) {
				if (this.pong.gUI.gameScoreLimit < 50) {
					this.soundMenuClick();
					this.pong.gUI.gameScoreLimit++;
				}
			}
			if (this.pong.gUI.onPaddleLength) {
				if (this.pong.gUI.pL < 1) {
					this.soundMenuClick();
					this.pong.gUI.pL++;
					this.pong.gUI.pongDemo.reset();
				}
			}
		}
	}

	resetGame() {
		this.pong.leftPaddle.score = 0;
		this.pong.rightPaddle.score = 0;
		this.pong.isPlayerOneMove = true;
		this.pong.restartScreen = false;
		this.pong.leftPaddle.y = this.canvas.height / 3;
		this.pong.rightPaddle.y = this.canvas.height / 3;
		this.pong.ball.reset(true);
	}

	soundMenuClick() {
		this.menuClick.play();

		let that = this;

		setTimeout(function() {
			that.menuClick.pause();
			that.menuClick.currentTime = 0;
		}, 100);
	}

	soundMenuSelect() {
		this.menuSelect.play();

		let that = this;

		setTimeout(function() {
			that.menuSelect.pause();
			that.menuSelect.currentTime = 0;
		}, 300);
	}

	soundChangeOption() {
		this.changeOption.play();

		let that = this;

		setTimeout(function() {
			that.changeOption.pause();
			that.changeOption.currentTime = 0;
		}, 100);
	}

	titleScreenControls(event) {
		if (event.code === "ArrowUp") {

			this.pong.gUI.arrowPos = 450;
			this.pong.gUI.playColor = "white";
			this.pong.gUI.optionsColor = "grey";

			if (!this.pong.gUI.onPlay) {
				this.soundChangeOption();
			}
			
			this.pong.gUI.onPlay = true;
			this.pong.gUI.onOptions = false;
		} else if (event.code === "ArrowDown") {

			this.pong.gUI.arrowPos = 550;
			this.pong.gUI.playColor = "grey";
			this.pong.gUI.optionsColor = "white";
			
			if (!this.pong.gUI.onOptions) {
				this.soundChangeOption();
			}

			this.pong.gUI.onPlay = false;
			this.pong.gUI.onOptions = true;
		} else if (event.code === "ShiftLeft") {

			if (this.pong.gUI.onPlay === true) {
				this.pong.startScreen = false;

				this.pong.gUI.arrowPosRestart = 450;
				this.pong.gUI.yesColor = "white";
				this.pong.gUI.noColor = "grey";

				this.pong.gUI.onYes = true;
				this.pong.gUI.onNo = false;

				//this.soundMenuSelect();

				this.pong.gameScreen = true;
			}

			if (this.pong.gUI.onOptions === true) {

				this.pong.startScreen = false;
				this.pong.optionsScreen = true;				
			}			
		}
	}
}