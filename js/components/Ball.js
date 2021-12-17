export default class Ball {
	constructor(x, y, diameter, canvas) {
		this.x = x - (diameter / 2);
		this.y = y - diameter;
		this.size = diameter;

		this.xSpeed = 0;
		this.ySpeed = 0;

		this.len = 0;
		this.setSpeed = 350;
		this.maxSpeed = 1000;

		this.autoServeTime = 2250;

		this.color = "rgb(255, 255, 255)";

		this.boardWidth = canvas.width;
		this.boardHeight = canvas.height;

		this.wallBlip = new Audio("./sounds/pongblip2.wav");
	}

	draw(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, 
					     this.size, this.size);
	}

	reset(isPlayerOne) {
		if (isPlayerOne) {
			this.x = (this.boardWidth / 2) - 120;
		} else {
			this.x = (this.boardWidth / 2) + 120;
		}

		this.y = (this.boardHeight / 2) - this.size;

		this.xSpeed = 0;
		this.ySpeed = 0;
		this.setSpeed = 350;
		this.color = "white";

		let that = this;

		if (!isPlayerOne) {
			setTimeout(function() {
				that.xSpeed = 20;
			}, that.autoServeTime)
		}
	}

	velocity(deltaTime) {
		
		if (this.xSpeed !== 0 || this.ySpeed !== 0) {
			this.len = Math.sqrt(this.xSpeed * this.xSpeed + this.ySpeed * this.ySpeed);
			
			//retationship between setSpeed and len (hypotenuse) of x and y
			const factor = this.setSpeed / this.len;
			//factor (ratio) is multiplied to speed, which decreases the x and y proportionatly
			//speed is set so that len is equal to setSpeed
			//therefore, xSpeed and ySpeed will always be scaled down to have a len(hypotenuse)
			//of 7, which translates to the ball always having the same speed
			this.xSpeed *= factor;
			this.ySpeed *= factor;
		}
		
		
		this.x += this.xSpeed * deltaTime;
		this.y += this.ySpeed * deltaTime;
			
	}

	edges() {
		if (this.y > this.boardHeight - this.size) {
			this.y = this.boardHeight - this.size;
			this.ySpeed *= -1;
			this.wallBlip.play();			
		}

		if (this.y < 0) {
			this.y = 0;
			this.ySpeed *= -1;
			this.wallBlip.play();
		}
	}

	update(context, deltaTime) {
		this.draw(context);

		this.velocity(deltaTime);
		this.edges();
	}
}