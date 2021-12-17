let square = true;
let step = 0;

export default class BgBall {
	constructor(interval, size, context, offset) {
		this.interval = interval;
		this.size = size;
		this.context = context;
		this.offset = offset;

		this.scrollSpeed = 25;

		this.x = ((950 - this.size) - this.interval) + this.offset;
		this.y = this.interval;	
	}

	update(deltaTime) {
		if (square === true) {
			this.context.fillRect(this.x, this.y, this.size, this.size);
		} else {
			this.context.beginPath();
			this.context.arc(this.x + this.size / 2, this.y + this.size / 2, 14, 0, 2 * Math.PI);
			this.context.fill();
		}

		step++;

		if (step === 20000) {
			square = !square;
			step = 0;
		}

		this.x -= this.scrollSpeed * deltaTime;
		this.y += this.scrollSpeed * deltaTime;
	}
}