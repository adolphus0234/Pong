import BgBall from './components/BgBall.js';

export default class BgAnimation {

	constructor(context) {
		this.context = context;

		this.ballSize = 22;

		this.row_1 = [new BgBall(20, this.ballSize, this.context, 480), 
					  new BgBall(100, this.ballSize, this.context, 480), 
					  new BgBall(180, this.ballSize, this.context, 480), 
					  new BgBall(260, this.ballSize, this.context, 480), 
					  new BgBall(340, this.ballSize, this.context, 480), 
					  new BgBall(420, this.ballSize, this.context, 480), 
					  new BgBall(500, this.ballSize, this.context, 480), 
					  new BgBall(580, this.ballSize, this.context, 480),
					  new BgBall(660, this.ballSize, this.context, 480), 
					  new BgBall(740, this.ballSize, this.context, 480), 
					  new BgBall(820, this.ballSize, this.context, 480), 
					  new BgBall(900, this.ballSize, this.context, 480),
					];

		this.row_2 = [new BgBall(20, this.ballSize, this.context, 320), 
					  new BgBall(100, this.ballSize, this.context, 320), 
					  new BgBall(180, this.ballSize, this.context, 320), 
					  new BgBall(260, this.ballSize, this.context, 320), 
					  new BgBall(340, this.ballSize, this.context, 320), 
					  new BgBall(420, this.ballSize, this.context, 320), 
					  new BgBall(500, this.ballSize, this.context, 320), 
					  new BgBall(580, this.ballSize, this.context, 320), 
					  new BgBall(660, this.ballSize, this.context, 320), 
					  new BgBall(740, this.ballSize, this.context, 320), 
					  new BgBall(820, this.ballSize, this.context, 320), 
					  new BgBall(900, this.ballSize, this.context, 320), 
					];

		this.row_3 = [new BgBall(20, this.ballSize, this.context, 160), 
					  new BgBall(100, this.ballSize, this.context, 160), 
					  new BgBall(180, this.ballSize, this.context, 160), 
					  new BgBall(260, this.ballSize, this.context, 160), 
					  new BgBall(340, this.ballSize, this.context, 160), 
					  new BgBall(420, this.ballSize, this.context, 160), 
					  new BgBall(500, this.ballSize, this.context, 160), 
					  new BgBall(580, this.ballSize, this.context, 160), 
					  new BgBall(660, this.ballSize, this.context, 160), 
					  new BgBall(740, this.ballSize, this.context, 160), 
					  new BgBall(820, this.ballSize, this.context, 160), 
					  new BgBall(900, this.ballSize, this.context, 160), 
					];

		this.row_4 = [new BgBall(20, this.ballSize, this.context, 0), 
				      new BgBall(100, this.ballSize, this.context, 0), 
					  new BgBall(180, this.ballSize, this.context, 0), 
					  new BgBall(260, this.ballSize, this.context, 0), 
					  new BgBall(340, this.ballSize, this.context, 0), 
					  new BgBall(420, this.ballSize, this.context, 0), 
					  new BgBall(500, this.ballSize, this.context, 0), 
					  new BgBall(580, this.ballSize, this.context, 0), 
					  new BgBall(660, this.ballSize, this.context, 0), 
					  new BgBall(740, this.ballSize, this.context, 0), 
					  new BgBall(820, this.ballSize, this.context, 0), 
					  new BgBall(900, this.ballSize, this.context, 0), 
					 ];

		this.row_5 = [new BgBall(-60, this.ballSize, this.context, -160), 
					  new BgBall(20, this.ballSize, this.context, -160), 
					  new BgBall(100, this.ballSize, this.context, -160), 
					  new BgBall(180, this.ballSize, this.context, -160), 
					  new BgBall(260, this.ballSize, this.context, -160), 
					  new BgBall(340, this.ballSize, this.context, -160), 
					  new BgBall(420, this.ballSize, this.context, -160), 
					  new BgBall(500, this.ballSize, this.context, -160), 
					  new BgBall(580, this.ballSize, this.context, -160), 
					  new BgBall(660, this.ballSize, this.context, -160), 
					  new BgBall(740, this.ballSize, this.context, -160),
					 ];

		this.row_6 = [new BgBall(-60, this.ballSize, this.context, -320), 
					  new BgBall(20, this.ballSize, this.context, -320), 
					  new BgBall(100, this.ballSize, this.context, -320), 
					  new BgBall(180, this.ballSize, this.context, -320), 
					  new BgBall(260, this.ballSize, this.context, -320), 
					  new BgBall(340, this.ballSize, this.context, -320), 
					  new BgBall(420, this.ballSize, this.context, -320), 
					  new BgBall(500, this.ballSize, this.context, -320), 
					  new BgBall(580, this.ballSize, this.context, -320),
					  new BgBall(660, this.ballSize, this.context, -320), 
					  new BgBall(740, this.ballSize, this.context, -320),
					 ];

		this.row_7 = [new BgBall(-60, this.ballSize, this.context, -480), 
					  new BgBall(20, this.ballSize, this.context, -480), 
					  new BgBall(100, this.ballSize, this.context, -480), 
					  new BgBall(180, this.ballSize, this.context, -480), 
					  new BgBall(260, this.ballSize, this.context, -480), 
					  new BgBall(340, this.ballSize, this.context, -480), 
					  new BgBall(420, this.ballSize, this.context, -480),  			
					 ];

		this.row_8 = [new BgBall(-60, this.ballSize, this.context, -640), 
					  new BgBall(20, this.ballSize, this.context, -640), 
					  new BgBall(100, this.ballSize, this.context, -640), 
					  new BgBall(180, this.ballSize, this.context, -640), 
					  new BgBall(260, this.ballSize, this.context, -640),
					  new BgBall(340, this.ballSize, this.context, -640), 
					  new BgBall(420, this.ballSize, this.context, -640),					  	 
					 ];

		this.row_9 = [new BgBall(-60, this.ballSize, this.context, -800), 
					  new BgBall(20, this.ballSize, this.context, -800), 
					  new BgBall(100, this.ballSize, this.context, -800),
					  new BgBall(180, this.ballSize, this.context, -800), 
					  new BgBall(260, this.ballSize, this.context, -800), 					 
					 ];

		this.timeout = false;

	}

	run(deltaTime) {
		this.context.fillStyle = "rgb(25, 25, 25)";

		this.row_1.forEach((ball, i) => {
			ball.update(deltaTime);
			
			if (this.row_1[i].x < 465) {
				this.row_1.splice(i, 1)
				this.row_1.unshift(new BgBall(-20, this.ballSize, this.context, 480))
			}
		});

		this.row_2.forEach((ball, i) => {
			ball.update(deltaTime);
			
			if (this.row_2[i].x < 305) {
				this.row_2.splice(i, 1)
				this.row_2.unshift(new BgBall(-20, this.ballSize, this.context, 320))
			}
		});
		
		this.row_3.forEach((ball, i) => {
			ball.update(deltaTime);
			
			if (this.row_3[i].x < 145) {
				this.row_3.splice(i, 1)
				this.row_3.unshift(new BgBall(-20, this.ballSize, this.context, 160))
			}
		});
		
		this.row_4.forEach((ball, i) => {
			ball.update(deltaTime);
			
			if (this.row_4[i].x < -15) {
				this.row_4.splice(i, 1)
				this.row_4.unshift(new BgBall(-20, this.ballSize, this.context, 0))
			}			
		});

		this.row_5.forEach((ball, i) => {
			ball.update(deltaTime);

			if (this.row_5[i].x < -15) {
				this.row_5.splice(i, 1)
				this.row_5.unshift(new BgBall(-100, this.ballSize, this.context, -160))
			}
		});

		this.row_6.forEach((ball, i) => {
			ball.update(deltaTime);

			if (this.row_6[i].x < -175) {
				this.row_6.splice(i, 1)
				this.row_6.unshift(new BgBall(-100, this.ballSize, this.context, -320))
			}
		});

		this.row_7.forEach((ball, i) => {
			ball.update(deltaTime);

			if (this.row_7[i].x < -15) {
				this.row_7.splice(i, 1)
				this.row_7.unshift(new BgBall(-100, this.ballSize, this.context, -480))
			}
		});

		this.row_8.forEach((ball, i) => {
			ball.update(deltaTime);

			if (this.row_8[i].x < -175) {
				this.row_8.splice(i, 1)
				this.row_8.unshift(new BgBall(-100, this.ballSize, this.context, -640))
			}
		});

		this.row_9.forEach((ball, i) => {
			ball.update(deltaTime);

			if (this.row_9[i].x < -175) {
				this.row_9.splice(i, 1)
				this.row_9.unshift(new BgBall(-100, this.ballSize, this.context, -800))
			}
		});
	}

	update(deltaTime) {
		if (!this.timeout) {
			this.run(deltaTime);
		}		
	}
}