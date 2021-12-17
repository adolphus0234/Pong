import Text from './Text.js';

export default class MultiText extends Text {
	constructor(context, text, fontSize = "20px", x = 25, y = 110, color = 'white') {
		super(context, text, fontSize, x, y, color);

		this.nextLinePos = 0;

		this.additionalLines = [];

		this.yHasBeenSet = false;

		this.show = function() {
			let that = this;

			this.font.load().then(function() {
				document.fonts.add(that.font);

				that.context.fillStyle = that.color;
				that.context.font = `${that.fontSize} ${that.font.family}`;

				that.context.fillText(that.text, that.x, that.y);

				if (that.additionalLines.length > 0) {
					that.additionalLines.forEach(newLine => {
						that.context.font = `${newLine.FontSize} ${that.font.family}`;
						that.context.fillText(newLine.Text, that.x, newLine.YOffset + that.y);
					});
				}
			});
		}
	}

	addLine(text, spaceSize, fontSize = this.fontSize) {
		this.nextLinePos += spaceSize;
		let nextLine = {
			Text: text,
			YOffset: this.nextLinePos,
			FontSize: fontSize
		}

		this.additionalLines.push(nextLine);
	}
}