// structure of code inspired by iamsammak's soundspace: https://github.com/iamsammak/soundspace
// TODO add different fonts to word animations

import anime from 'animejs';

import { animeValues } from './animeValues';
import { createCircles, createWords, createRectangles } from './shapeCreation';
import { handleState, ZERO_KEYPRESSES, ONE_KEYPRESS } from './game';

class Animations {

  constructor(canvas, ctx) {
    this.state = { key: null, currentState: ZERO_KEYPRESSES,
      animationRunning: false, animations: [],
      canvas, ctx, matchScore: 0};

    this.infiniteAnimation(this.state);
    this.keydownListener(this.state);
  }

  infiniteAnimation(state) {
    anime({
      duration: Infinity,
      update: () => {
        state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);

        state.animations.forEach((anim) => {
          anim.animatables.forEach( (animatable) => {
            animatable.target.draw(state.ctx);
          });
        });
        // if ( this.state.animations.length > 0 ) {
        //   this.state.animations[0].animatables.forEach( (animatable) => {
        //       animatable.target.draw(this.ctx);
        //     });
        // }
      },
    });
  }

  // below method from https://github.com/iamsammak/soundspace

  static clearAnimation(state) {
    state.animations = [];

    // if there are no this.state.animations in the array, set to false
    // if( this.state.animations.length === 0 ) {
    //   window.animationRunning = false;
    // }
  }

  // stackoverflow.com/questions/1664785/resize-html5-this.canvas-to-fit-window
  static resizeCanvas(state) {
    state.canvas.width = window.innerWidth;
    state.canvas.height = window.innerHeight;
  }


// –––––––––––– CIRCLES ––––––––––––
// –––––– balloon ––––––
  static balloon(state, animeVals) {
    this.resizeCanvas(state);

    const x = state.canvas.width / 2;
    const y = state.canvas.height / 2;
    const circle = createCircles(x, y, animeVals, state.canvas.width * (3 / 2));

    const animeBalloon = anime({
      targets: circle,
      radius: 0,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: this.clearAnimation(state),
    });

    state.animations.push(animeBalloon);
  }

// –––––– purple fireworks ––––––
  static purpleFireworks(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state),
    });

    state.animations.push(animeFireworks);
  }

// –––––– teal fireworks ––––––
  static tealFireworks(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state),
    });

    state.animations.push(animeFireworks);
  }

// –––––– blobs ––––––
  static blobs(state, animeVals) {
    this.resizeCanvas(state);

    const x = Math.random() * state.canvas.width;
    const y = Math.random() * state.canvas.height;
    const circles = createCircles(x, y, animeVals, state.canvas.width / 14);

    const animeBlobs = anime({
      targets: circles,
      x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
      y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: this.clearAnimation(state)
    });
    state.animations.push(animeBlobs);
  }


// –––––––––––– WORDS ––––––––––––
// –––––– 加油 ––––––
  static go(state, animeVals) {
    this.resizeCanvas(state);

    const words = createWords(state, animeVals);
    const animeGo = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
      y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: this.clearAnimation(state)
    });
    state.animations.push(animeGo);
  }

// –––––– perceive ––––––
  static perceive(state, animeVals) {
    this.resizeCanvas(state);

    const words = createWords(state, animeVals);
    const animePerceive = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8)); },
      y: () => { return anime.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: this.clearAnimation(state)
    });
    state.animations.push(animePerceive);
  }


// –––––––––––– RECTANGLES ––––––––––––
// –––––– square line up ––––––
  static squareLineUp(state, animeVals) {
  this.resizeCanvas(state);

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
        complete: this.clearAnimation(state),
      });

      state.animations.push(animeSquareLineUp);
}

// –––––– square line right ––––––
  static squareLineRight(state, animeVals) {
  this.resizeCanvas(state);

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
    complete: this.clearAnimation(state),
  });

  state.animations.push(animeSquareLine);
}

// –––––– purple slide up ––––––
  static purpleSlideUp(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state),
    });

    state.animations.push(animePurpleSlide);
  }

// –––––– red slide left ––––––
  static redSlideLeft(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state),
    });

    state.animations.push(animeRedSlide);
  }

// –––––– green flash ––––––
  static greenFlash(state, animeVals) {
    this.resizeCanvas(state);
    const x = 0;
    const y = 0;
    let width = state.canvas.width;
    let height = state.canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animeGreenFlash = anime({
      targets: rectangle,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: this.clearAnimation(state)
    });

    state.animations.push(animeGreenFlash);
  }

// –––––– square panels ––––––
  static squarePanels(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state)
    });

    state.animations.push(animeSqPanels);
  }

// –––––– square slide ––––––
  static squareSlide(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state)
    });

    state.animations.push(animeSqSlide);
  }

// –––––– banana peel ––––––
  static bananaPeel(state, animeVals) {
    this.resizeCanvas(state);

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
      complete: this.clearAnimation(state),
    });

    state.animations.push(animeBanana);
  }


// assign state.animations to keyboard keys
  keydownListener(state) {
    document.addEventListener( 'keydown', (event) => {
      state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);

      //e is object!! https://developer.mozilla.org/en-US/docs/Web/Events/keydown
      state.key = (event.key).toLowerCase();
      handleState(state); //finite state machine handles animation
    }, false);

    window.addEventListener('resize', Animations.resizeCanvas(state), false);
  }

}

export default Animations;
