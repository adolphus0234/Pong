import BgAnimation from './BgAnimation.js';
import PongDemo from './PongDemo.js';
import Text from './components/Text.js';
import MultiText from './components/MultiText.js';

class Rect {
	constructor(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;

		this.yOffset = 0;
	}

	draw(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

export default class GUI {
	constructor(canvas, width, height, pong) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.width = width;
		this.height = height;

		this.bgColor = "black";
		this.bgAnimation = new BgAnimation(this.context);

		this.pong = pong;

		//TITLE SCREEN

		this.playColor = "white";
		this.optionsColor = "grey";

		this.onPlay = true;
		this.onOptions = false;
		this.arrowPos = 450;

		this.titleText = new Text(this.context, "PONG", "100px", this.width / 2 - 160, 120);
		this.playText = new Text(this.context, "PLAY", "50px", this.width / 2 - 80, 450);
		this.optionsText = new Text(this.context, "OPTIONS", "50px", this.width / 2 - 140, 550);
		this.titleArrowText = new Text(this.context, ">", "50px", 250, this.arrowPos);

		this.pausedBox = new Rect(this.width / 2 - 160, 210, 320, 150, "rgba(20, 20, 20, 0.5)");
		this.pausedText = new MultiText(this.context, "PAUSED", "50px", this.width / 2 - 120, 270);
		this.pausedText.addLine("PRESS ENTER", 55, "27px");

		//OPTIONS SCREEN

		this.pongDemo = new PongDemo(this.canvas, this.pong);

		this.difficultyColor = "white";
		this.gameLimitColor = "grey";
		this.paddleLengthColor = "grey";
		this.mainMenuColor = "grey";
		this.arrowPosOptions = 100;

		this.onDifficulty = true;
		this.onGameLimit = false;
		this.onPaddleLength = false;
		this.onMainMenu = false;

		this.difficulties = ["  NORMAL >", "<  HARD  >", "< UNFAIR  "];
		this.gameDiff = 0;
		this.gameScoreLimit = 5;
		this.paddleLengths = ["  NORMAL >", "< SHORT  "];
		this.pL = 0;

		this.selectedOption = [true, false, false, false];
		this.index = 0;

		this.difficultyOptionText = new Text(this.context, `DIFFICULTY : ${this.difficulties[this.gameDiff]}`,
			"40px", this.width / 8, 100, this.difficultyColor);

		this.gameScoreLimitText = new Text(this.context, `SCORE LIMIT: < ${this.gameScoreLimit} >`,
			"40px", this.width / 8, 150, this.gameLimitColor);

		this.paddleLengthOptionText = new Text(this.context, `PADDLE SIZE: ${this.paddleLengths[this.pL]}`,
			"40px", this.width / 8, 200, this.paddleLengthColor);

		this.mainMenuSelectionText = new Text(this.context, "MAIN MENU", "40px", 
			this.width / 2 - 150, 300, this.mainMenuColor);

		this.optionsArrowText = new Text(this.context, ">", "50px", 50, this.arrowPosOptions);

		//GAMEOVER / REPLAY SCREEN

		this.yesColor = "white";
		this.noColor = "grey";
		this.arrowPosRestart = 450;

		this.onYes = true;
		this.onNo = false;

		this.rematchText = new Text(this.context, "REMATCH?", "80px", this.width / 4, 200);
		this.yesText = new Text(this.context, "YES", "50px", this.width / 2 - 60, 450, this.yesColor);
		this.noText = new Text(this.context, "NO", "50px", this.width / 2 - 60, 550, this.noColor);
		this.restartArrowText = new Text(this.context, ">", "50px", 250, this.arrowPosRestart);
	}

	background() {
		this.context.fillStyle = this.bgColor;
		this.context.fillRect(0, 0, this.width, this.height);
	}

	footer() {
		this.context.fillStyle = "rgb(200, 200, 200)";
		this.context.font = "20px Ponde";
		this.context.fillText("Menu - Up/Down", 10, this.height - 10);
		this.context.fillText("ShiftLeft = Select", 645, this.height - 10);
	}

	gameOptions(deltaTime) {
		this.background();

		//DIFFICULTY OPTION
		this.difficultyOptionText.update(this.difficultyColor, 
			`DIFFICULTY : ${this.difficulties[this.gameDiff]}`);

		this.pong.setDifficulty();

		//SCORE LIMIT OPTION
		if (this.gameScoreLimit === 2) {
			this.gameScoreLimitText.update(this.gameLimitColor, 
				`SCORE LIMIT:   ${this.gameScoreLimit} >`);

		} else if (this.gameScoreLimit === 50) {
			this.gameScoreLimitText.update(this.gameLimitColor, 
				`SCORE LIMIT: < ${this.gameScoreLimit}  `);

		} else {
			this.gameScoreLimitText.update(this.gameLimitColor, 
				`SCORE LIMIT: < ${this.gameScoreLimit} >`);
		}
		
		//PADDLE LENGTH OPTION
		this.paddleLengthOptionText.update(this.paddleLengthColor, 
			`PADDLE SIZE: ${this.paddleLengths[this.pL]}`);

		this.pong.setPaddleLength();

		//MAIN MENU SELECTION
		this.mainMenuSelectionText.update(this.mainMenuColor);

		//CURSOR/SELECTION ARROW
		this.optionsArrowText.y = this.arrowPosOptions;
		this.optionsArrowText.show();

		//OPTION IDENTIFIERS
		this.onDifficulty = this.selectedOption[0];
		this.onGameLimit = this.selectedOption[1];
		this.onPaddleLength = this.selectedOption[2];
		this.onMainMenu = this.selectedOption[3];

		this.menuColors();

		//DEMO
		this.pongDemo.run(deltaTime);
	}

	menuController() {
		for (let i = 0; i < this.selectedOption.length; i++) {
			this.selectedOption[i] = false;
		}

		this.selectedOption[this.index] = true;
	}

	menuColors() {
		if (this.onDifficulty) {
			this.difficultyColor = "white";
		} else {
			this.difficultyColor = "grey";
		}

		if (this.onGameLimit) {
			this.gameLimitColor = "white";
		} else {
			this.gameLimitColor = "grey";
		}

		if (this.onPaddleLength) {
			this.paddleLengthColor = "white";
		} else {
			this.paddleLengthColor = "grey";
		}

		if (this.onMainMenu) {
			this.mainMenuColor = "white";
		} else {
			this.mainMenuColor = "grey";
		}
	}

	pauseNotice() {
		if (this.pong.optionsScreen === true) {
			this.pausedBox.y = 360
			this.pausedText.y = 420;
		} else {
		
			this.pausedBox.y = 210;
			this.pausedText.y = 270;
		}

		if (this.pong.timeout) {

			this.pausedBox.draw(this.context);
			this.pausedText.show();

			this.pong.paused = true;
		}
	}

	restartOptions() {
		this.background();

		this.rematchText.show();

		this.yesText.update(this.yesColor);
		this.noText.update(this.noColor);

		this.restartArrowText.y = this.arrowPosRestart;
		this.restartArrowText.show();

		this.footer();
	}

	titleScreen(deltaTime) {
		this.background();
		this.bgAnimation.update(deltaTime);

		this.titleText.show();

		this.playText.update(this.playColor);

		this.optionsText.update(this.optionsColor);

		this.titleArrowText.y = this.arrowPos;
		this.titleArrowText.show();

		this.footer();
	}
}