// structure of code inspired by iamsammak's soundspace: https://github.com/iamsammak/soundspace

import anime from 'animejs';

import { animeValues } from './animeValues.js';
import Circle from './circle';
import Rectangle from './rectangle';

const Animations = (canvas, ctx) => {
  const animations = [];
  window.animationRunning = false;

  // below method from https://github.com/iamsammak/soundspace
  const infiniteAnimation = anime({
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

  const resizeCanvas = () => {
    // stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };


  // –––––––––––– WORDS ––––––––––––
  const createYes = function(options) {
    const words = [];
    for (let i = 0; i < options.numWords; i++) {
      let x = anime.random(canvas.width * (1/4), canvas.width * (3/4));
      let y = anime.random(canvas.height * (1/4), canvas.height * (3/4));
      const word = new Word(x, y, options);
      words.push(word);
    }
    return words;
  };

// –––––– perceive ––––––
  const animateYes = function(options) {
    resizeCanvas();
    const words = createYes(options);
    const wordAnimation = anime({
      targets: words,
      font: function() {
        let endFontIdx = Math.floor((Math.random()*options.endFont.length));
        return options.endFont[endFontIdx];
      },
      x: function() { return anime.random(canvas.width * (1/7), canvas.width * (6/7)); },
      y: function() { return anime.random(canvas.height * (1/7), canvas.height * (6/7)); },
      delay: function (el, index) { return index * 100; },
      duration: options.duration,
      easing: 'easeOutExpo',
      complete: clearAnimation
    });
    animations.push(wordAnimation);
  };


  // –––––––––––– RECTANGLES ––––––––––––
  const createRectangles = (xVals, yVals, animeVals, width, height) => {
    const rectangles = [];

    for ( let i = 0; i < animeVals.numEls; i++ ) {

      // one of xVals or yVals could be an array, or neither could be
      if ( yVals.length ) {
        console.log("in yvals.length true");
        let y = yVals[i];
        rectangles.push(new Rectangle( xVals, y, animeVals.colors[i], animeVals, width, height ));
      } else {
        if ( xVals.length ) {
          console.log("in xvals.length true");

          let x = xVals[i];
          rectangles.push(new Rectangle( x, yVals, animeVals.colors[i], animeVals, width, height ));
        } else {
          console.log("in xvals.length false");

          rectangles.push(new Rectangle( xVals, yVals, animeVals.colors[i], animeVals, width, height ));
        }
      }
    }

    return rectangles;
  };

// –––––– square line up ––––––
  const squareLineUp = (animeVals) => {
  resizeCanvas();

    const x = canvas.width * (9 / 10);
    const yArr = [ canvas.height / 7,
                  canvas.height * (2 / 7),
                  canvas.height * (3 / 7),
                  canvas.height * (4 / 7),
                  canvas.height * (5 / 7) ];
      const squares = createRectangles(x, yArr, animeVals);

      const animeSquareLineUp = anime({
        targets: squares,
        x: () => { return canvas.width * (1/10); },
        width: animeVals.endWidth,
        height: animeVals.endHeight,
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

  const x = canvas.width / 10;
  const yVals = [ canvas.height / 11 - (animeVals.width / 2),
                canvas.height * (2 / 11) - (animeVals.width / 2),
                canvas.height * (3 / 11) - (animeVals.width / 2),
                canvas.height * (4 / 11) - (animeVals.width / 2),
                canvas.height * (5 / 11) - (animeVals.width / 2),
                canvas.height * (6 / 11) - (animeVals.width / 2),
                canvas.height * (7 / 11) - (animeVals.width / 2),
                canvas.height * (8 / 11) - (animeVals.width / 2),
                canvas.height * (9 / 11) - (animeVals.width / 2),
                canvas.height * (10 / 11) - (animeVals.width / 2) ];
  const squares = createRectangles(x, yVals, animeVals);

  const animeSquareLine = anime({
    targets: squares,
    x: () => { return canvas.width * (9/10); },
    width: animeVals.endWidth,
    height: animeVals.endHeight,
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
    const y = canvas.height / 4;

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

    const rectangles = createRectangles(x, yVals, animeVals, canvas.width / 2, canvas.height / 10);

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
    const key = (event.key).toLowerCase();
    console.log(key);

    // if( !window.animationRunning ) {
      if ( key === 'a' || key === 'z' ) {
        window.animationRunning = true;
        bananaPeel( animeValues['a'] );
      }
      else if ( key === 'b' || key === 'y' ) {
        window.animationRunning = true;
        squareSlide( animeValues['b'] );
      }
      else if (key === 'c' || key === 'x' ) {
        window.animationRunning = true;
        squarePanels( animeValues['c'] );
      }
      else if (key === 'd' || key === 'w' ) {
        window.animationRunning = true;
        greenFlash( animeValues['d'] );
      }
      else if (key === 'e' || key === 'v' ) {
        window.animationRunning = true;
        redSlideLeft( animeValues['e'] );
      }
      else if (key === 'f' || key === 'u' ) {
        window.animationRunning = true;
        purpleSlideUp( animeValues['f'] );
      }
      else if (key === 'g' || key === 't' ) {
        window.animationRunning = true;
        squareLineRight( animeValues['g'] );
      }
      else if (key === 'h' || key === 's' ) {
        window.animationRunning = true;
        squareLineUp( animeValues['h'] );
      }
      // else if (key === 'i' || key === 'r' ) {
      //   window.animationRunning = true;
      //   purpleSlideUp( animeValues['i'] );
      // }
      // else if (key === 'j' || key === 'q' ) {
      //   window.animationRunning = true;
      //   purpleSlideUp( animeValues['j'] );
      // }
      // else if (key === 'k' || key === 'p' ) {
      //   window.animationRunning = true;
      //   purpleSlideUp( animeValues['k'] );
      // }
      // else if (key === 'l' || key === 'o' ) {
      //   window.animationRunning = true;
      //   purpleSlideUp( animeValues['l'] );
      // }
      // else if (key === 'm' || key === 'n' ) {
      //   window.animationRunning = true;
      //   purpleSlideUp( animeValues['m'] );
      // }
    // }
  }, false);

  window.addEventListener('resize', resizeCanvas, false);
};

export default Animations;
