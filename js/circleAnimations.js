import anime from 'animejs';
import { animeValues } from './animeValues';
import { createCircles } from './shapeCreation';

const resizeCanvas = (state) => {
  state.canvas.width = window.innerWidth;
  state.canvas.height = window.innerHeight;
};

const clearAnimation = (state) => {
  state.animations = [];
};

// –––––––––––– CIRCLES ––––––––––––
// –––––– balloon ––––––
export const balloon = (state, animeVals) => {
  resizeCanvas(state);

  const x = state.canvas.width / 2;
  const y = state.canvas.height / 2;
  const circle = createCircles(x, y, animeVals, state.canvas.width * (3 / 2));

  const animeBalloon = anime({
    targets: circle,
    radius: 0,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animeBalloon);
};

// –––––– purple fireworks ––––––
export const purpleFireworks = (state, animeVals) => {
  resizeCanvas(state);

  const x = Math.random() * (state.canvas.width * (7 / 9));
  const y = Math.random() * (state.canvas.height * (7 / 9));
  const circles = createCircles(x, y, animeVals, state.canvas.width / 25);

  const animeFireworks = anime({
    targets: circles,
    x: cir => { return cir.x + anime.random(-(state.canvas.width), state.canvas.width); },
    y: cir => { return cir.y + anime.random(-(state.canvas.width), state.canvas.width); },
    radius: state.canvas.width / 55,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animeFireworks);
};

// –––––– teal fireworks ––––––
export const tealFireworks = (state, animeVals) => {
  resizeCanvas(state);

  const x = Math.random() * (state.canvas.width * (7 / 9));
  const y = Math.random() * (state.canvas.height * (7 / 9));
  const circles = createCircles(x, y, animeVals, state.canvas.width / 25);

  const animeFireworks = anime({
    targets: circles,
    x: cir => { return cir.x + anime.random(-(state.canvas.width), state.canvas.width); },
    y: cir => { return cir.y + anime.random(-(state.canvas.width), state.canvas.width); },
    radius: state.canvas.width / 55,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animeFireworks);
};

// –––––– blobs ––––––
export const blobs = (state, animeVals) => {
  resizeCanvas(state);

  const x = Math.random() * state.canvas.width;
  const y = Math.random() * state.canvas.height;
  const circles = createCircles(x, y, animeVals, state.canvas.width / 14);

  const animeBlobs = anime({
    targets: circles,
    x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
    y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });
  state.animations.push(animeBlobs);
};
