class Rectangle {
  constructor(x, y, color, animeVals, width, height) {
    this.x = x;
    this.y = y;
    this.width = animeVals.width || width;
    this.height = animeVals.height || height;
    this.color = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Rectangle;
