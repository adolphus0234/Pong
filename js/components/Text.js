export default class Text {
	constructor(context, text, fontSize = "20px", x = 25, y = 110, color = 'white') {
		this.context = context;
		this.text = text;

		this.color = color;
		this.font = new FontFace('Ponde', "url(./fonts/ponde_.ttf)");
		this.fontSize = fontSize;
		this.x = x;
		this.y = y;

		this.yOffset = 0;
	}

	show() {
		let that = this;

		this.font.load().then(function() {
			document.fonts.add(that.font);

			that.context.fillStyle = that.color;
			that.context.font = `${that.fontSize} ${that.font.family}`;

			that.context.fillText(that.text, that.x, that.y);
		});
	}

	update(color, text = null) {

		if (text === null) {
			this.color = color;
		} else {	
			this.text = text;
			this.color = color;		
		}
		
		this.show();
	}
}