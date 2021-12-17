export default class MotionFx {
	constructor(pong) {
		this.ball = pong.ball;
		this.ballSize = this.ball.size;

		this.step_1 = 6;
		this.capture_1 = true;

		this.ball_x_1 = this.ball.x;
		this.ball_y_1 = this.ball.y;

		this.step_2 = 15;
		this.capture_2 = true;

		this.ball_x_2 = this.ball.x;
		this.ball_y_2 = this.ball.y;
		
	}

	oneLayerBallFX(context) {
		this.step_1--;

		context.strokeStyle = this.ball.color;
		context.strokeRect(this.ball_x_1, this.ball_y_1, this.ballSize, this.ballSize);

		
		if (this.step_1 < 2) {
			if (this.capture_1) {

				this.ball_x_1 = this.ball.x;
				this.ball_y_1 = this.ball.y;

				this.capture_1 = false;
			}
			
			
			if (this.step_1 === 0) {
				this.step_1 = 6;
				this.capture_1 = true;
			}	
		}
	}

	twoLayerBallFX(context) {		

		this.step_2--;

		context.strokeStyle = "rgba" + this.ball.color.substring(3, this.ball.color.length - 1) + ", 0.3)";
		context.strokeRect(this.ball_x_2, this.ball_y_2, this.ballSize, this.ballSize);

		
		if (this.step_2 < 7) {
			if (this.capture_2) {

				this.ball_x_2 = this.ball.x;
				this.ball_y_2 = this.ball.y;

				this.capture_2 = false;
			}
			
			
			if (this.step_2 === 0) {
				this.step_2 = 15;
				this.capture_2 = true;
			}	
		}

		this.oneLayerBallFX(context);
	}

	update(pong, context) {
		if (pong.maxPhase) {	
			this.twoLayerBallFX(context);
		} else if (pong.medPhase) {
			this.oneLayerBallFX(context);
		}
	}
}