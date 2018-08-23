import anime from 'animejs';
import { animeValues } from './animeValues';
import { createWords } from './shapeCreation';

const resizeCanvas = (state) => {
  state.canvas.width = window.innerWidth;
  state.canvas.height = window.innerHeight;
};

const clearAnimation = (state) => {
  state.animations = [];
};

// –––––––––––– WORDS ––––––––––––
// –––––– 加油 ––––––
export const go = (state, animeVals) => {
  resizeCanvas(state);

  const words = createWords(state, animeVals);
  const animeGo = anime({
    targets: words,
    font: animeVals.font,
    x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
    y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
    duration: animeVals.duration,
    delay: (el, idx) => { return idx * 80; },
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });
  state.animations.push(animeGo);
};

// –––––– perceive ––––––
export const perceive = (state, animeVals) => {
  resizeCanvas(state);

  const words = createWords(state, animeVals);
  const animePerceive = anime({
    targets: words,
    font: animeVals.font,
    x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
    y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
    duration: animeVals.duration,
    delay: (el, idx) => { return idx * 80; },
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });
  state.animations.push(animePerceive);
};
