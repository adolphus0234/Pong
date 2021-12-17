import Ball from './components/Ball.js';
import Paddle from './components/Paddle.js';

export default class PongDemo {

	constructor(canvas, pong) {
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
		this.width = canvas.width;
		this.height = canvas.height;

		this.pong = pong;

		this.demoBall = new Ball(this.width / 2, this.height - (this.height / 4), 20, canvas);

		this.leftDemoPaddle = new Paddle(this.demoBall.size * 3, 
									    (this.height - this.height / 3) 
									   - (this.pong.rightPaddle.length / 4),
									 	 20, 200, this.pong, this.canvas);
		this.leftDemoPaddle.isCpu = true;
		this.leftDemoPaddle.isDemo = true;

		this.rightDemoPaddle = new Paddle(this.width - (this.demoBall.size * 4), 
										 (this.height - this.height / 3) 
										 - (this.pong.rightPaddle.length / 4),
									  	  20, 200, this.pong, this.canvas);
		this.rightDemoPaddle.isCpu = true;
		this.rightDemoPaddle.isDemo = true;

		this.leftDemoPaddle.color = "rgb(180, 180, 180)";
		this.rightDemoPaddle.color = "rgb(180, 180, 180)";

		let height = this.height;

		this.demoBall.edges = function() {
			if (this.y > height - this.size) {
				this.y = height - this.size;
				this.ySpeed *= -1;
			}

			if (this.y < height / 2) {
				this.y = height / 2;
				this.ySpeed *= -1;
			}
		}

		this.demoBall.ySpeed = -50;
		this.demoBall.xSpeed = -50;
		this.demoBall.color = "rgb(180, 180, 180)";
	}

	reset() {
		this.leftDemoPaddle.y = (this.height - this.height / 3) 
							    - (this.leftDemoPaddle.length / 4);

		this.rightDemoPaddle.y = (this.height - this.height / 3) 
							     - (this.rightDemoPaddle.length / 4);

		this.demoBall.x = this.width / 2;
		this.demoBall.y = this.height - (this.height / 4);
		this.demoBall.ySpeed = -50;
		this.demoBall.xSpeed = -50;
	}

	run(deltaTime) {	
		this.demoBall.update(this.context, deltaTime);
		this.leftDemoPaddle.update(this.context, this.demoBall, deltaTime);
		this.rightDemoPaddle.update(this.context, this.demoBall, deltaTime);

		if (this.demoBall.x < 0) {
			this.reset();
		}

		if (this.demoBall.x > this.width - this.demoBall.size) {
			this.reset();
		}
	}
}