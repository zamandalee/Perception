<p align="center"><img src="./assets/images/perceptionlogo.png" width=250px/></p>

<h1 align="center">Perception</h1>

<p align="center">
  <a href="https://aguamenti.github.io/Perception/">Click to Play!</a>
  <br>Experience a visual exploration of human perception to moving objects and muscle memory.
</p>

<p align="center">
  <a href="#technologies">Technologies</a> •
  <a href="#background">Background</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#pending-features">Pending Features</a>
</p>

<p align="center"><img src="./assets/images/shortanimationdemo.gif" width=400px/></p>

## Technologies
- JavaScript
- HTML/CSS, Canvas
- Anime.js library

## Background
Perception: memory game with a twist. One that simultaneously stimulates the hippocampus and sensory cortex.

Upon pressing an alphabet key, an animation will appear on the screen. The player aims to remember which keys have the same associated animation, and to find all 13 matching keys.

## Key Features
#### Custom Animations
<img src="./assets/images/animationsdemo.gif" width=350px/>

A novel way to integrate the Anime.js API, positional equations, and HTML5 Canvas:

```js
// the firework animation:
const circles = [];
for ( let i = 0; i < animeVals.numEls; i++ ) {
  const color = animeVals.colors[i];
  circles.push(new Circle( xVals, yVals, color, animeVals, radius ));
}

const animeFireworks = anime({
  targets: circles, // targets objects rather than HTML elements, resulting in more DRY code
  x: cir => { return cir.x + anime.random(-(state.canvas.width), state.canvas.width); },
  y: cir => { return cir.y + anime.random(-(state.canvas.width), state.canvas.width); },
  radius: state.canvas.width / 55,
  duration: animeVals.duration,
  easing: animeVals.easing,
  complete: clearAnimation(state),
});
```

Also note how the guiding messages at the top of the page change depending on the player's move.

#### Instructions Modal
<img src="./assets/images/instructions.png" width=350px/>

## Pending Features
- Introduce a timer feature, recording how long it takes the user to find 13 matches
- Incorporate a backend so user highscores are saved
- Explore the Howler.js library to add sounds corresponding to each
