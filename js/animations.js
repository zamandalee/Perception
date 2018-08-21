import anime from 'animejs';

import { animeValues } from './animeValues.js';
import Circle from './circle';
import Rectangle from './rectangle';

const Animations = (canvas, ctx) => {
  const animations = [];

  // is this ok??? took from soundspace
  const infiniteAnimation = anime({
    duration: Infinity,
    update: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      animations.forEach((anim) => {
        anim.animatables.forEach( (animatable) => {
          animatable.target.draw(ctx);
        });
      });
    },
  });

  // const clearAnimation = (anim) => {
  //   const index = animations.indexOf(anim);
  //   if (index > -1) { animations.splice(index, 1); }
  // };

  const clearAnimation = (anim) => {
    if( animations.includes(anim) ) {
      const idx = animations.indexOf(anim);
      animations.splice(idx, 1);
    }
  };

  const resizeCanvas = () => {
    // stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };


  // –––––––––––– RECTANGLES ––––––––––––
    const createRectangles = (isYArr, xVals, yVals, animeVals) => {
      const rectangles = [];

      for ( let i = 0; i < animeVals.numEls; i++ ) {

        if ( isYArr ) {
          let y = yVals[i];
          rectangles.push(new Rectangle( xVals, y, animeVals.colors[i], animeVals ));
        } else {
          let x = xVals[i];
          rectangles.push(new Rectangle( x, yVals, animeVals.colors[i], animeVals ));
        }
      }

      return rectangles;
    };

// –––––– square balloon ––––––
  const squarePanels = (animeVals) => {
    // resizeCanvas();

    const xVals = [ 0, canvas.width / 5, canvas.width * (2 / 5),
                    canvas.width * (3 / 5), canvas.width * (4 / 5) ];
    const y = canvas.height / 4;

    const squares = createRectangles(false, xVals, y, animeVals);

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
    // resizeCanvas();

    const x = 0;
    const yVals = [ (canvas.height / 6),
                    canvas.height * (2 / 6),
                    canvas.height * (3 / 6),
                    canvas.height * (4 / 6),
                    canvas.height * (5 / 6) ];

    const rectangles = createRectangles(true, x, yVals, animeVals);

    const animeSqSlide = anime({
      targets: rectangles,
      x: (sq, idx) => { return canvas.width; },
      // width: canvas.width + 200,
      duration: animeVals.duration,
      easing: animeVals.easing,
      complete: clearAnimation
    });

    animations.push(animeSqSlide);
  };

// –––––– banana peel ––––––
  const bananaPeel = (animeVals) => {
    // resizeCanvas();

    const x = ( canvas.width * (3 / 4) ) - ( animeVals.width / 2 );
    const yVals = [ (canvas.height / 8) - (animeVals.height / 2),
                    canvas.height * (2 / 8) - (animeVals.height / 2),
                    canvas.height * (3 / 8) - (animeVals.height / 2),
                    canvas.height * (4 / 8) - (animeVals.height / 2),
                    canvas.height * (5 / 8) - (animeVals.height / 2),
                    canvas.height * (6 / 8) - (animeVals.height / 2),
                    canvas.height * (7 / 8) - (animeVals.height / 2),
                    canvas.height * (7 / 8) - (animeVals.height / 2),
                    canvas.height * (6 / 8) - (animeVals.height / 2),
                    canvas.height * (5 / 8) - (animeVals.height / 2),
                    canvas.height * (4 / 8) - (animeVals.height / 2),
                    canvas.height * (3 / 8) - (animeVals.height / 2),
                    canvas.height * (2 / 8) - (animeVals.height / 2),
                    canvas.height * (1 / 8) - (animeVals.height / 2) ];

    const rectangles = createRectangles(true, x, yVals, animeVals);

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

    if ( key === 'a' || key === 'z' ) {
      bananaPeel( animeValues['a'] );
    }
    else if ( key === 'b' || key === 'y' ) {
      squareSlide( animeValues['b'] );
    }
    else if (key === 'c' || key === 'x' ) {
      squarePanels( animeValues['c'] );
    }
  }, false);

  window.addEventListener('resize', resizeCanvas, false);
};

export default Animations;
