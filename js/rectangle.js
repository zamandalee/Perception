class Rectangle {
  constructor(x, y, color, animeVals) {
    this.x = x;
    this.y = y;
    this.width = animeVals.width;
    this.height = animeVals.height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Rectangle;
