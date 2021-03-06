class Circle {
  constructor(x, y, color, animeVals, radius) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = radius;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
    ctx.fill();
  }
}

export default Circle;
