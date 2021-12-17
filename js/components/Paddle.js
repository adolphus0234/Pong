export default class Paddle {
	constructor(x, y, w, h, pong, canvas) {
		this.canvas = canvas;

		this.x = x;
		this.y = y;
		this.width = w;
		this.length = h;	

		this.otherPaddle = null;

		this.speed = 0;
		this.maxSpeed = 400;

		this.deflectionFactor = 14 * 50;

		this.isDemo = false;
		this.isCpu = false;
		this.cpuSpeed;
		this.cpuMaxSpeed = 400;
		this.cpuSlowSpeed = 225;
		this.defaultCpuSlowSpeed = 225;
		this.reCenterSpeed = 100;

		this.pong = pong;
		this.ball = this.pong.ball;

		this.score = 0;

		this.color = "white";

		this.paddleBlip = new Audio("./sounds/pongblip.wav");
		this.paddleBlipMed = new Audio("./sounds/pongblip_med.wav");
		this.paddleBlipHigh = new Audio("./sounds/pongblip_high.wav");
		this.maxPaddleBlip = new Audio("./sounds/explosion.wav");	
	}

	capturePaddle(paddle) {
		this.otherPaddle = paddle;
	}

	checkForBallCollision(ball) {

		//LEFT SIDE - Horizontal ball collision with paddle

		if (this.x < this.canvas.width / 2) {
			
			if (ball.x < this.x + ball.size
			&&  ball.y + (ball.size / 2) > this.y - 10
			&&  ball.y + (ball.size / 2) < this.y + this.length + 10) {
			
				if (ball.x > this.x - ball.size / 2) {

					ball.x = this.x + ball.size;
					ball.ySpeed = this.deflectionFactor 
								  * (ball.y - (this.y + this.length / 2)) / this.length;				
					ball.xSpeed = -ball.xSpeed;					

					if (!this.isDemo) {

						this.playPaddleBlip();

						if (ball.setSpeed <= ball.maxSpeed) {
							ball.setSpeed += this.pong.ballSpeedIncrease;
							this.deflectionFactor += this.pong.ballSpeedIncrease;
						}

						if (this.otherPaddle !== null) {
							if (this.otherPaddle.cpuSlowSpeed < this.otherPaddle.cpuMaxSpeed) {
								this.otherPaddle.cpuSlowSpeed += (0.125 * 50);
							}
						}

						if (this.isCpu) {
							if (this.cpuSlowSpeed < this.cpuMaxSpeed) {
								this.cpuSlowSpeed += (0.125 * 50);
							}
						}
					}
				}
			}

			//LEFT SIDE - Vertical ball collision with paddle edges 

			//TOP EDGE

			if (ball.y + ball.size > this.y
			&&	ball.y + ball.size < this.y + 30
			&& 	ball.x > this.x - 10
			&&	ball.x < this.x + 10) {

				ball.y = this.y - (ball.size);
				ball.ySpeed = -ball.ySpeed;

				if (!this.isDemo) {
					this.playPaddleBlip();
				}	
			}

			//BOTTOM EDGE

			if (ball.y < this.y + this.length
			&& 	ball.y > this.y + this.length - 30
			&& 	ball.x > this.x - 10
			&&	ball.x < this.x + 10) {

				ball.y = this.y + this.length + 10;
				ball.ySpeed = -ball.ySpeed;

				if (!this.isDemo) {
					this.playPaddleBlip();
				}	
			}
		}

		//RIGHT SIDE - Horizontal ball collision with paddle

		if (this.x > this.canvas.width / 2) {			
			if (ball.x + ball.size > this.x 
			&&  ball.y + (ball.size / 2) > this.y
			&&  ball.y + (ball.size / 2) < this.y + this.length) {

				if (ball.x + ball.size < this.x + ball.size + 10) {

					ball.x = this.x - ball.size;
					ball.ySpeed = this.deflectionFactor 
								  * (ball.y - (this.y + this.length / 2)) / this.length;		
					ball.xSpeed = -ball.xSpeed;		

					if (!this.isDemo) {

						this.playPaddleBlip();

						if (ball.setSpeed <= ball.maxSpeed) {
							ball.setSpeed += this.pong.ballSpeedIncrease;
							this.deflectionFactor += this.pong.ballSpeedIncrease;
						}

						if (this.otherPaddle !== null) {
							if (this.otherPaddle.cpuSlowSpeed < this.otherPaddle.cpuMaxSpeed) {
								this.otherPaddle.cpuSlowSpeed += (0.125 * 50);
							}
						}

						if (this.isCpu) {
							if (this.cpuSlowSpeed < this.cpuMaxSpeed) {
								this.cpuSlowSpeed += (0.125 * 50);
							}
						}
					}
				}	
			}

			//RIGHT SIDE - Vertical ball collision with paddle edges 

			//TOP EDGE

			if (ball.y + ball.size > this.y
			&&	ball.y + ball.size < this.y + 30
			&& 	ball.x + 10 > this.x - 10
			&&	ball.x + 10 < this.x + 30) {

				ball.y = this.y - (ball.size);
				ball.ySpeed = -ball.ySpeed;

				if (!this.isDemo) {
					this.playPaddleBlip();
				}
			}

			//BOTTOM EDGE

			if (ball.y < this.y + this.length
			&& 	ball.y > this.y + this.length - 30
			&& 	ball.x + 10 > this.x - 10
			&&	ball.x + 10 < this.x + 30) {

				ball.y = this.y + this.length + 10;
				ball.ySpeed = -ball.ySpeed;
				
				if (!this.isDemo) {
					this.playPaddleBlip();
				}
			}			
		}		
	}

	cpuMove(ball, deltaTime) {

		//Ball Tracking
		const rangeTop = ball.y - (this.y + ball.size);
		const rangeBot = ball.y - ((this.y - ball.size) + this.length);

		if (rangeTop > -5) {
			this.cpuSpeed = this.cpuSlowSpeed;
		} else {
			this.cpuSpeed = this.cpuMaxSpeed;
		}

		if (rangeBot < 5) {
			this.cpuSpeed = this.cpuSlowSpeed;
		} else {
			this.cpuSpeed = this.cpuMaxSpeed;
		}

		//LEFT SIDE

		if (this.x < this.canvas.width / 2) {
			if (ball.x < 500) {
				if (ball.y < this.y + ball.size) {				
					this.y += (-this.cpuSpeed) * deltaTime;		
				}

				if (ball.y > (this.y - ball.size) + this.length) {				
					this.y += (this.cpuSpeed) * deltaTime;
				}
			}

			//MOVING BACK TO CENTER

			if (ball.x > 525) {
				if (this.isDemo === true) {
					if (this.y < (this.canvas.height - this.canvas.height / 3) - (this.length / 4)) {
						this.y += this.reCenterSpeed * deltaTime;
					}

					if (this.y > (this.canvas.height - this.canvas.height / 3) - (this.length / 4)) {
						this.y -= this.reCenterSpeed * deltaTime;
					}
				} else {
					if (this.y + (this.length / 2) + 8 < this.canvas.height / 2) {
						this.y += this.reCenterSpeed * deltaTime;
					}

					if (this.y + (this.length / 2) + 8 > this.canvas.height / 2) {
						this.y -= this.reCenterSpeed * deltaTime;
					}
				}					
			}
		}

		//RIGHT SIDE

		if (this.x > this.canvas.width / 2) {
			if (ball.x > 450) {
				if (ball.y < this.y + ball.size) {				
					this.y += (-this.cpuSpeed) * deltaTime;		
				}

				if (ball.y > (this.y - ball.size) + this.length) {				
					this.y += (this.cpuSpeed) * deltaTime;
				}
			}

			//MOVING BACK TO CENTER

			if (this.isDemo === true) {
				if (ball.x < 425) {
					if (this.y < (this.canvas.height - this.canvas.height / 3) - (this.length / 4)) {
						this.y += this.reCenterSpeed * deltaTime;
					}

					if (this.y > (this.canvas.height - this.canvas.height / 3) - (this.length / 4)) {
						this.y -= this.reCenterSpeed * deltaTime;
					}
				}
			} else {
				if (ball.x < 425) {
					if (this.y + (this.length / 2) + 8 < this.canvas.height / 2) {
						this.y += this.reCenterSpeed * deltaTime;
					}

					if (this.y + (this.length / 2) + 8 > this.canvas.height / 2) {
						this.y -= this.reCenterSpeed * deltaTime;
					}
				}
			}				
		}

		//CPU WALL COLLISION

		if (this.y < 0) {
			this.y = 0;
			this.cpuSpeed = 0;
		} else {
			this.cpuSpeed = this.cpuMaxSpeed;
		}

		if (this.y > this.canvas.height - this.length) {
			this.y = this.canvas.height - this.length;
			this.cpuSpeed = 0;
		} else {
			this.cpuSpeed = this.cpuMaxSpeed;
		}
	}

	draw(context) {
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, 
						 this.width, this.length);
	}

	playPaddleBlip(time) {
		if (this.ball.setSpeed >= this.ball.maxSpeed) {
			this.ball.color = "rgb(255, 0, 0)";
			this.maxPaddleBlip.play();
			trimSFX(this.maxPaddleBlip, 500);

			this.pong.setBackgroundPhase("max");

		} else if (this.ball.setSpeed > this.ball.maxSpeed * 3/4) {
			this.ball.color = "rgb(255, 196, 59)";
			this.paddleBlipHigh.play();

			this.pong.setBackgroundPhase("med");

		} else if (this.ball.setSpeed > this.ball.maxSpeed / 2) {
			this.ball.color = "rgb(255, 255, 90)";
			this.paddleBlipMed.play();
		} else {
			this.paddleBlip.play();
		}
	}

	update(context, ball, deltaTime) {
		this.draw(context);

		this.y += this.speed * deltaTime;

		if (this.y < 0) {
			this.y = 0;
			this.speed = 0;
		}

		if (this.y > this.canvas.height - this.length) {
			this.y = this.canvas.height - this.length;
			this.speed = 0;
		}

		if (this.isCpu) {
			this.cpuMove(ball, deltaTime);
		}

		this.checkForBallCollision(ball); 
	}
}

function trimSFX(sound, millis) {
	setTimeout(function() {
		sound.pause();
		sound.currentTime = 0;
	}, millis);
}