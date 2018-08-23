import anime from 'animejs';
import { animeValues } from './animeValues';
import { createRectangles } from './shapeCreation';

const resizeCanvas = (state) => {
  state.canvas.width = window.innerWidth;
  state.canvas.height = window.innerHeight;
};

const clearAnimation = (state) => {
  state.animations = [];
};

// –––––––––––– RECTANGLES ––––––––––––
// –––––– square line up ––––––
export const squareLineUp = (state, animeVals) => {
resizeCanvas(state);

  const x = state.canvas.width * (8 / 10);
  const yArr = [ state.canvas.height / 7,
                 state.canvas.height * (2 / 7),
                 state.canvas.height * (3 / 7),
                 state.canvas.height * (4 / 7),
                 state.canvas.height * (5 / 7) ];
    const squares = createRectangles(x, yArr, animeVals, state.canvas.height / 8, state.canvas.height / 8);

    const animeSquareLineUp = anime({
      targets: squares,
      x: () => { return state.canvas.width / 10; },
      width: state.canvas.height / 15,
      height: state.canvas.height / 15,
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: 'easeOutExpo',
      complete: clearAnimation(state),
    });

    state.animations.push(animeSquareLineUp);
};

// –––––– square line right ––––––
export const squareLineRight = (state, animeVals) => {
resizeCanvas(state);

const x = state.canvas.width / 11;
const yVals = [ state.canvas.height / 12,
                state.canvas.height * (2 / 12),
                state.canvas.height * (3 / 12),
                state.canvas.height * (4 / 12),
                state.canvas.height * (5 / 12),
                state.canvas.height * (6 / 12),
                state.canvas.height * (7 / 12),
                state.canvas.height * (8 / 12),
                state.canvas.height * (9 / 12),
                state.canvas.height * (10 / 12) ];
const squares = createRectangles(x, yVals, animeVals, state.canvas.height / 20, state.canvas.height / 20);

const animeSquareLine = anime({
  targets: squares,
  x: () => { return state.canvas.width * (8 / 10); },
  width: state.canvas.height / 8,
  height: state.canvas.height / 8,
  duration: animeVals.duration,
  delay: (el, idx) => { return idx * 80; },
  easing: animeVals.easing,
  complete: clearAnimation(state),
});

state.animations.push(animeSquareLine);
};

// –––––– purple slide up ––––––
export const purpleSlideUp = (state, animeVals) => {
  resizeCanvas(state);

  const x = 0;
  const y = 0;
  let width = state.canvas.width;
  let height = state.canvas.height;
  const rectangle = createRectangles(x, y, animeVals, width, height);

  const animePurpleSlide = anime({
    targets: rectangle,
    height: animeVals.endHeight,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animePurpleSlide);
};

// –––––– red slide left ––––––
export const redSlideLeft = (state, animeVals) => {
  resizeCanvas(state);

  const x = 0;
  const y = 0;
  let width = state.canvas.width;
  let height = state.canvas.height;
  const rectangle = createRectangles(x, y, animeVals, width, height);

  const animeRedSlide = anime({
    targets: rectangle,
    width: animeVals.endWidth,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animeRedSlide);
};

// –––––– green flash ––––––
export const greenFlash = (state, animeVals) => {
  resizeCanvas(state);
  const x = 0;
  const y = 0;
  let width = state.canvas.width;
  let height = state.canvas.height;
  const rectangle = createRectangles(x, y, animeVals, width, height);

  const animeGreenFlash = anime({
    targets: rectangle,
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });

  state.animations.push(animeGreenFlash);
};

// –––––– square panels ––––––
export const squarePanels = (state, animeVals) => {
  resizeCanvas(state);

  const xVals = [ 0, state.canvas.width / 5, state.canvas.width * (2 / 5),
                  state.canvas.width * (3 / 5), state.canvas.width * (4 / 5) ];
  const y = state.canvas.height * (3 / 8);

  const squares = createRectangles(xVals, y, animeVals, (state.canvas.width / 5), (state.canvas.width / 5));

  const animeSqPanels = anime({
    targets: squares,
    width: animeVals.endWidth,
    duration: animeVals.duration,
    delay: 0,
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });

  state.animations.push(animeSqPanels);
};

// –––––– square slide ––––––
export const squareSlide = (state, animeVals) => {
  resizeCanvas(state);

  const x = 0;
  const yVals = [ (state.canvas.height / 7),
                  state.canvas.height * (2 / 7),
                  state.canvas.height * (3 / 7),
                  state.canvas.height * (4 / 7),
                  state.canvas.height * (5 / 7) ];

  const rectangles = createRectangles(x, yVals, animeVals, state.canvas.width / 2, state.canvas.height / 12);

  const animeSqSlide = anime({
    targets: rectangles,
    x: (sq, idx) => { return state.canvas.width; },
    duration: animeVals.duration,
    easing: animeVals.easing,
    complete: clearAnimation(state)
  });

  state.animations.push(animeSqSlide);
};

// –––––– banana peel ––––––
export const bananaPeel = (state, animeVals) => {
  resizeCanvas(state);

  const x = ( state.canvas.width * (3 / 4) );
  const yVals = [ (state.canvas.height / 9),
                  state.canvas.height * (2 / 9),
                  state.canvas.height * (3 / 9),
                  state.canvas.height * (4 / 9),
                  state.canvas.height * (5 / 9),
                  state.canvas.height * (6 / 9),
                  state.canvas.height * (7 / 9),
                  state.canvas.height * (7 / 9),
                  state.canvas.height * (6 / 9),
                  state.canvas.height * (5 / 9),
                  state.canvas.height * (4 / 9),
                  state.canvas.height * (3 / 9),
                  state.canvas.height * (2 / 9),
                  state.canvas.height / 9 ];

  const rectangles = createRectangles(x, yVals, animeVals, state.canvas.height / 10, state.canvas.height / 10);

  const animeBanana = anime({
    targets: rectangles,
    x: (sq, idx) => { return state.canvas.width * (1/15); },
    width: animeVals.endWidth,
    duration: animeVals.duration,
    delay: (el, index) => { return index * 50; },
    easing: animeVals.easing,
    complete: clearAnimation(state),
  });

  state.animations.push(animeBanana);
};
