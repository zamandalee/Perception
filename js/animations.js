// structure of code inspired by iamsammak's soundspace: https://github.com/iamsammak/soundspace
// TODO add different fonts to word animations

import anime from 'animejs';

import { animeValues } from './animeValues.js';
import Circle from './circle';
import Rectangle from './rectangle';
import Word from './word';

import { handleState, ZERO_KEYPRESSES, ONE_KEYPRESS } from './game.js';

class Animations {

  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.animations = [];
    this.state = { key: null, currentState: ZERO_KEYPRESSES, animationRunning: false };
  }

  // below method from https://github.com/iamsammak/soundspace
  infiniteAnimation = anime({
    duration: Infinity,
    update: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach((anim) => {
        anim.animatables.forEach( (animatable) => {
          animatable.target.draw(ctx);
        });
      });
      // if ( animations.length > 0 ) {
      //   animations[0].animatables.forEach( (animatable) => {
      //       animatable.target.draw(ctx);
      //     });
      // }
    },
  });

  const clearAnimation = (anim) => {
    if( animations.includes(anim) ) {
      const idx = animations.indexOf(anim);
      animations.splice(idx, 1);

      // if there are no animations in the array, set to false
      // if( animations.length === 0 ) {
      //   window.animationRunning = false;
      // }
    }
  };

  // stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

// –––––––––––– CIRCLES ––––––––––––
  const createCircles = (xVals, yVals, animeVals, radius) => {
    const circles = [];

    for ( let i = 0; i < animeVals.numEls; i++ ) {
      const color = animeVals.colors[i];
      circles.push(new Circle( xVals, yVals, color, animeVals, radius ));
    }

    return circles;
  };


// –––––– balloon ––––––
  static const balloon = (animeVals) => {
    resizeCanvas();

    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const circle = createCircles(x, y, animeVals, canvas.width * (3 / 2));

    const animeBallon = anime({
      targets: circle,
      radius: 0,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animeBallon);
  };

// –––––– fireworks ––––––
  const purpleFireworks = (animeVals) => {
    resizeCanvas();

    const x = Math.random() * (canvas.width * (7 / 9));
    const y = Math.random() * (canvas.height * (7 / 9));
    const circles = createCircles(x, y, animeVals, canvas.width / 25);

    const animeFireworks = anime({
      targets: circles,
      x: cir => { return cir.x + anime.random(-(canvas.width), canvas.width); },
      y: cir => { return cir.y + anime.random(-(canvas.width), canvas.width); },
      radius: canvas.width / 55,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animeFireworks);
  };

// –––––– fireworks ––––––
  const tealFireworks = (animeVals) => {
    resizeCanvas();

    const x = Math.random() * (canvas.width * (7 / 9));
    const y = Math.random() * (canvas.height * (7 / 9));
    const circles = createCircles(x, y, animeVals, canvas.width / 25);

    const animeFireworks = anime({
      targets: circles,
      x: cir => { return cir.x + anime.random(-(canvas.width), canvas.width); },
      y: cir => { return cir.y + anime.random(-(canvas.width), canvas.width); },
      radius: canvas.width / 55,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animeFireworks);
  };

// –––––– blobs ––––––
  const blobs = (animeVals) => {
    resizeCanvas();

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const circles = createCircles(x, y, animeVals, canvas.width / 14);

    const animeBlobs = anime({
      targets: circles,
      x: () => { return anime.random(canvas.width * (1 / 8), canvas.width * (7 / 8)); },
      y: () => { return anime.random(canvas.height * (1 / 8), canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });
    animations.push(animeBlobs);
  };


// –––––––––––– WORDS ––––––––––––
  const createWords = (animeVals, width, height) => {
    const words = [];
    for (let i = 0; i < 8; i++) {
      let x = anime.random(canvas.width * (1/4), canvas.width * (3/4));
      let y = anime.random(canvas.height * (1/4), canvas.height * (3/4));
      const word = new Word(x, y, animeVals.colors[i], animeVals, width, height);
      words.push(word);
    }
    return words;
  };

// –––––– 加油 ––––––
  const go = (animeVals) => {
    resizeCanvas();

    const words = createWords(animeVals);
    const animeGo = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(canvas.width * (1 / 8), canvas.width * (7 / 8)); },
      y: () => { return anime.random(canvas.height * (1 / 8), canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: clearAnimation
    });
    animations.push(animeGo);
  };

// –––––– perceive ––––––
  const perceive = (animeVals) => {
    resizeCanvas();

    const words = createWords(animeVals);
    const animePerceive = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(canvas.width * (1 / 8), canvas.width * (7 / 8)); },
      y: () => { return anime.random(canvas.height * (1 / 8), canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: clearAnimation
    });
    animations.push(animePerceive);
  };


// –––––––––––– RECTANGLES ––––––––––––
  const createRectangles = (xVals, yVals, animeVals, w, h) => {
    const rectangles = [];

    for ( let i = 0; i < animeVals.numEls; i++ ) {
      const color = animeVals.colors[i];

      // one of xVals or yVals could be an array, or neither could be
      if ( yVals.length ) {
        const y = yVals[i];
        rectangles.push(new Rectangle( xVals, y, color, animeVals, w, h ));
      }
      else {
        if ( xVals.length ) {
          const x = xVals[i];
          rectangles.push(new Rectangle( x, yVals, color, animeVals, w, h ));
        }
        else {
          rectangles.push(new Rectangle( xVals, yVals, color, animeVals, w, h ));
        }
      }
    }

    return rectangles;
  };

// –––––– square line up ––––––
  const squareLineUp = (animeVals) => {
  resizeCanvas();

    const x = canvas.width * (8 / 10);
    const yArr = [ canvas.height / 7,
                   canvas.height * (2 / 7),
                   canvas.height * (3 / 7),
                   canvas.height * (4 / 7),
                   canvas.height * (5 / 7) ];
      const squares = createRectangles(x, yArr, animeVals, canvas.height / 8, canvas.height / 8);

      const animeSquareLineUp = anime({
        targets: squares,
        x: () => { return canvas.width / 10; },
        width: canvas.height / 15,
        height: canvas.height / 15,
        duration: animeVals.duration,
        delay: (el, idx) => { return idx * 80; },
        easing: 'easeOutExpo',
        complete: clearAnimation,
      });

      animations.push(animeSquareLineUp);
};

// –––––– square line right ––––––
  const squareLineRight = (animeVals) => {
  resizeCanvas();

  const x = canvas.width / 11;
  const yVals = [ canvas.height / 12,
                  canvas.height * (2 / 12),
                  canvas.height * (3 / 12),
                  canvas.height * (4 / 12),
                  canvas.height * (5 / 12),
                  canvas.height * (6 / 12),
                  canvas.height * (7 / 12),
                  canvas.height * (8 / 12),
                  canvas.height * (9 / 12),
                  canvas.height * (10 / 12) ];
  const squares = createRectangles(x, yVals, animeVals, canvas.height / 20, canvas.height / 20);

  const animeSquareLine = anime({
    targets: squares,
    x: () => { return canvas.width * (8 / 10); },
    width: canvas.height / 8,
    height: canvas.height / 8,
    duration: animeVals.duration,
    delay: (el, idx) => { return idx * 80; },
    easing: animeVals.easing,
    complete: clearAnimation,
  });

  animations.push(animeSquareLine);
};

// –––––– purple slide up ––––––
  const purpleSlideUp = (animeVals) => {
    resizeCanvas();

    const x = 0;
    const y = 0;
    let width = canvas.width;
    let height = canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animePurpleSlide = anime({
      targets: rectangle,
      height: animeVals.endHeight,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animePurpleSlide);
  };

// –––––– red slide left ––––––
  const redSlideLeft = (animeVals) => {
    resizeCanvas();

    const x = 0;
    const y = 0;
    let width = canvas.width;
    let height = canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animeRedSlide = anime({
      targets: rectangle,
      width: animeVals.endWidth,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animeRedSlide);
  };

// –––––– green flash ––––––
  const greenFlash = (animeVals) => {
    resizeCanvas();
    const x = 0;
    const y = 0;
    let width = canvas.width;
    let height = canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animeGreenFlash = anime({
      targets: rectangle,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    animations.push(animeGreenFlash);
  };

// –––––– square panels ––––––
  const squarePanels = (animeVals) => {
    resizeCanvas();

    const xVals = [ 0, canvas.width / 5, canvas.width * (2 / 5),
                    canvas.width * (3 / 5), canvas.width * (4 / 5) ];
    const y = canvas.height * (3 / 8);

    const squares = createRectangles(xVals, y, animeVals, (canvas.width / 5), (canvas.width / 5));

    const animeSqPanels = anime({
      targets: squares,
      width: animeVals.endWidth,
      duration: animeVals.duration,
      delay: 0,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    animations.push(animeSqPanels);
  };

// –––––– square slide ––––––
  const squareSlide = (animeVals) => {
    resizeCanvas();
    console.log("squareslide");

    const x = 0;
    const yVals = [ (canvas.height / 7),
                    canvas.height * (2 / 7),
                    canvas.height * (3 / 7),
                    canvas.height * (4 / 7),
                    canvas.height * (5 / 7) ];

    const rectangles = createRectangles(x, yVals, animeVals, canvas.width / 2, canvas.height / 12);

    const animeSqSlide = anime({
      targets: rectangles,
      x: (sq, idx) => { return canvas.width; },
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    animations.push(animeSqSlide);
  };

// –––––– banana peel ––––––
  const bananaPeel = (animeVals) => {
    resizeCanvas();

    const x = ( canvas.width * (3 / 4) );
    const yVals = [ (canvas.height / 9),
                    canvas.height * (2 / 9),
                    canvas.height * (3 / 9),
                    canvas.height * (4 / 9),
                    canvas.height * (5 / 9),
                    canvas.height * (6 / 9),
                    canvas.height * (7 / 9),
                    canvas.height * (7 / 9),
                    canvas.height * (6 / 9),
                    canvas.height * (5 / 9),
                    canvas.height * (4 / 9),
                    canvas.height * (3 / 9),
                    canvas.height * (2 / 9),
                    canvas.height / 9 ];

    const rectangles = createRectangles(x, yVals, animeVals, canvas.height / 10, canvas.height / 10);

    const animeBanana = anime({
      targets: rectangles,
      x: (sq, idx) => { return canvas.width * (1/15); },
      width: animeVals.endWidth,
      duration: animeVals.duration,
      delay: (el, index) => { return index * 50; },
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    animations.push(animeBanana);
  };


// assign animations to keyboard keys
  document.addEventListener( 'keydown', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //e is object!! https://developer.mozilla.org/en-US/docs/Web/Events/keydown
    state.key = (event.key).toLowerCase();
    handleState(state); //finite state machine handles

  }, false);

  window.addEventListener('resize', resizeCanvas, false);
};

export default Animations;
