class Word {
  constructor(x, y, color, animeVals) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.text = animeVals.text;
    this.font = animeVals.font;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = this.font;
    ctx.fillText(this.text, this.x, this.y);
  }
}

export default Word;
