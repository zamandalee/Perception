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
    this.state = { key: null, currentState: ZERO_KEYPRESSES, animationRunning: false, animations: [] };

    this.infiniteAnimation();
  }

  infiniteAnimation() {
    anime({
      duration: Infinity,
      update: () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.state.animations.forEach((anim) => {
          anim.animatables.forEach( (animatable) => {
            animatable.target.draw(this.ctx);
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

  clearAnimation(anim) {
    if( this.state.animations.includes(anim) ) {
      const idx = this.state.animations.indexOf(anim);
      this.state.animations.splice(idx, 1);

      // if there are no this.state.animations in the array, set to false
      // if( this.state.animations.length === 0 ) {
      //   window.animationRunning = false;
      // }
    }
  }

  // stackoverflow.com/questions/1664785/resize-html5-this.canvas-to-fit-window
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

// –––––––––––– CIRCLES ––––––––––––
  createCircles(xVals, yVals, animeVals, radius) {
    const circles = [];

    for ( let i = 0; i < animeVals.numEls; i++ ) {
      const color = animeVals.colors[i];
      circles.push(new Circle( xVals, yVals, color, animeVals, radius ));
    }

    return circles;
  }


// –––––– balloon ––––––
  static balloon(state, animeVals) {
    this.resizeCanvas();

    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2;
    const circle = createCircles(x, y, animeVals, this.canvas.width * (3 / 2));

    const animeBallon = anime({
      targets: circle,
      radius: 0,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animeBallon);
  };

// –––––– fireworks ––––––
  static purpleFireworks(animeVals) {
    this.resizeCanvas();

    const x = Math.random() * (this.canvas.width * (7 / 9));
    const y = Math.random() * (this.canvas.height * (7 / 9));
    const circles = createCircles(x, y, animeVals, this.canvas.width / 25);

    const animeFireworks = anime({
      targets: circles,
      x: cir => { return cir.x + anime.random(-(this.canvas.width), this.canvas.width); },
      y: cir => { return cir.y + anime.random(-(this.canvas.width), this.canvas.width); },
      radius: this.canvas.width / 55,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animeFireworks);
  };

// –––––– fireworks ––––––
  static tealFireworks(animeVals) {
    this.resizeCanvas();

    const x = Math.random() * (this.canvas.width * (7 / 9));
    const y = Math.random() * (this.canvas.height * (7 / 9));
    const circles = createCircles(x, y, animeVals, this.canvas.width / 25);

    const animeFireworks = anime({
      targets: circles,
      x: cir => { return cir.x + anime.random(-(this.canvas.width), this.canvas.width); },
      y: cir => { return cir.y + anime.random(-(this.canvas.width), this.canvas.width); },
      radius: this.canvas.width / 55,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animeFireworks);
  };

// –––––– blobs ––––––
  static blobs(animeVals) {
    this.resizeCanvas();

    const x = Math.random() * this.canvas.width;
    const y = Math.random() * this.canvas.height;
    const circles = createCircles(x, y, animeVals, this.canvas.width / 14);

    const animeBlobs = anime({
      targets: circles,
      x: () => { return anime.random(this.canvas.width * (1 / 8), this.canvas.width * (7 / 8)); },
      y: () => { return anime.random(this.canvas.height * (1 / 8), this.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });
    this.state.animations.push(animeBlobs);
  };


// –––––––––––– WORDS ––––––––––––
  createWords(animeVals, width, height) {
    const words = [];
    for (let i = 0; i < 8; i++) {
      let x = anime.random(this.canvas.width * (1/4), this.canvas.width * (3/4));
      let y = anime.random(this.canvas.height * (1/4), this.canvas.height * (3/4));
      const word = new Word(x, y, animeVals.colors[i], animeVals, width, height);
      words.push(word);
    }
    return words;
  };

// –––––– 加油 ––––––
  static go(animeVals) {
    this.resizeCanvas();

    const words = createWords(animeVals);
    const animeGo = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(this.canvas.width * (1 / 8), this.canvas.width * (7 / 8)); },
      y: () => { return anime.random(this.canvas.height * (1 / 8), this.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: clearAnimation
    });
    this.state.animations.push(animeGo);
  };

// –––––– perceive ––––––
  static perceive(animeVals) {
    this.resizeCanvas();

    const words = createWords(animeVals);
    const animePerceive = anime({
      targets: words,
      font: animeVals.font,
      x: () => { return anime.random(this.canvas.width * (1 / 8), this.canvas.width * (7 / 8)); },
      y: () => { return anime.random(this.canvas.height * (1 / 8), this.canvas.height * (7 / 8)); },
      duration: animeVals.duration,
      delay: (el, idx) => { return idx * 80; },
      easing: animeVals.easing,
      complete: clearAnimation
    });
    this.state.animations.push(animePerceive);
  };


// –––––––––––– RECTANGLES ––––––––––––
  createRectangles(xVals, yVals, animeVals, w, h) {
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
  static squareLineUp(animeVals) {
  this.resizeCanvas();

    const x = this.canvas.width * (8 / 10);
    const yArr = [ this.canvas.height / 7,
                   this.canvas.height * (2 / 7),
                   this.canvas.height * (3 / 7),
                   this.canvas.height * (4 / 7),
                   this.canvas.height * (5 / 7) ];
      const squares = createRectangles(x, yArr, animeVals, this.canvas.height / 8, this.canvas.height / 8);

      const animeSquareLineUp = anime({
        targets: squares,
        x: () => { return this.canvas.width / 10; },
        width: this.canvas.height / 15,
        height: this.canvas.height / 15,
        duration: animeVals.duration,
        delay: (el, idx) => { return idx * 80; },
        easing: 'easeOutExpo',
        complete: clearAnimation,
      });

      this.state.animations.push(animeSquareLineUp);
};

// –––––– square line right ––––––
  static squareLineRight(animeVals) {
  this.resizeCanvas();

  const x = this.canvas.width / 11;
  const yVals = [ this.canvas.height / 12,
                  this.canvas.height * (2 / 12),
                  this.canvas.height * (3 / 12),
                  this.canvas.height * (4 / 12),
                  this.canvas.height * (5 / 12),
                  this.canvas.height * (6 / 12),
                  this.canvas.height * (7 / 12),
                  this.canvas.height * (8 / 12),
                  this.canvas.height * (9 / 12),
                  this.canvas.height * (10 / 12) ];
  const squares = createRectangles(x, yVals, animeVals, this.canvas.height / 20, this.canvas.height / 20);

  const animeSquareLine = anime({
    targets: squares,
    x: () => { return this.canvas.width * (8 / 10); },
    width: this.canvas.height / 8,
    height: this.canvas.height / 8,
    duration: animeVals.duration,
    delay: (el, idx) => { return idx * 80; },
    easing: animeVals.easing,
    complete: clearAnimation,
  });

  this.state.animations.push(animeSquareLine);
};

// –––––– purple slide up ––––––
  static purpleSlideUp(animeVals) {
    this.resizeCanvas();

    const x = 0;
    const y = 0;
    let width = this.canvas.width;
    let height = this.canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animePurpleSlide = anime({
      targets: rectangle,
      height: animeVals.endHeight,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animePurpleSlide);
  };

// –––––– red slide left ––––––
  static redSlideLeft(animeVals) {
    this.resizeCanvas();

    const x = 0;
    const y = 0;
    let width = this.canvas.width;
    let height = this.canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animeRedSlide = anime({
      targets: rectangle,
      width: animeVals.endWidth,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animeRedSlide);
  };

// –––––– green flash ––––––
  static greenFlash(animeVals) {
    this.resizeCanvas();
    const x = 0;
    const y = 0;
    let width = this.canvas.width;
    let height = this.canvas.height;
    const rectangle = createRectangles(x, y, animeVals, width, height);

    const animeGreenFlash = anime({
      targets: rectangle,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    this.state.animations.push(animeGreenFlash);
  };

// –––––– square panels ––––––
  static squarePanels(animeVals) {
    this.resizeCanvas();

    const xVals = [ 0, this.canvas.width / 5, this.canvas.width * (2 / 5),
                    this.canvas.width * (3 / 5), this.canvas.width * (4 / 5) ];
    const y = this.canvas.height * (3 / 8);

    const squares = createRectangles(xVals, y, animeVals, (this.canvas.width / 5), (this.canvas.width / 5));

    const animeSqPanels = anime({
      targets: squares,
      width: animeVals.endWidth,
      duration: animeVals.duration,
      delay: 0,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    this.state.animations.push(animeSqPanels);
  };

// –––––– square slide ––––––
  static squareSlide(animeVals) {
    this.resizeCanvas();
    console.log("squareslide");

    const x = 0;
    const yVals = [ (this.canvas.height / 7),
                    this.canvas.height * (2 / 7),
                    this.canvas.height * (3 / 7),
                    this.canvas.height * (4 / 7),
                    this.canvas.height * (5 / 7) ];

    const rectangles = createRectangles(x, yVals, animeVals, this.canvas.width / 2, this.canvas.height / 12);

    const animeSqSlide = anime({
      targets: rectangles,
      x: (sq, idx) => { return this.canvas.width; },
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    this.state.animations.push(animeSqSlide);
  };

// –––––– banana peel ––––––
  static bananaPeel(animeVals) {
    this.resizeCanvas();

    const x = ( this.canvas.width * (3 / 4) );
    const yVals = [ (this.canvas.height / 9),
                    this.canvas.height * (2 / 9),
                    this.canvas.height * (3 / 9),
                    this.canvas.height * (4 / 9),
                    this.canvas.height * (5 / 9),
                    this.canvas.height * (6 / 9),
                    this.canvas.height * (7 / 9),
                    this.canvas.height * (7 / 9),
                    this.canvas.height * (6 / 9),
                    this.canvas.height * (5 / 9),
                    this.canvas.height * (4 / 9),
                    this.canvas.height * (3 / 9),
                    this.canvas.height * (2 / 9),
                    this.canvas.height / 9 ];

    const rectangles = createRectangles(x, yVals, animeVals, this.canvas.height / 10, this.canvas.height / 10);

    const animeBanana = anime({
      targets: rectangles,
      x: (sq, idx) => { return this.canvas.width * (1/15); },
      width: animeVals.endWidth,
      duration: animeVals.duration,
      delay: (el, index) => { return index * 50; },
      easing: animeVals.easing,
      complete: clearAnimation,
    });

    this.state.animations.push(animeBanana);
  };


// assign this.state.animations to keyboard keys
  keydownListener() {
    document.addEventListener( 'keydown', (event) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //e is object!! https://developer.mozilla.org/en-US/docs/Web/Events/keydown
      state.key = (event.key).toLowerCase();
      handleState(state); //finite state machine handles

    }, false);

    window.addEventListener('resize', this.resizeCanvas, false);
  }

  }

export default Animations;
