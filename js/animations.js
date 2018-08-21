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
        rectangles.push( new Rectangle( xVals, y, animeVals.colors[i], animeVals ) );
      } else {
        let x = xVals[i];
        rectangles.push( new Rectangle( x, yVals, animeVals.colors[i], animeVals ) );
      }
    }

    return rectangles;
  };

// –––––– square spin ––––––
  const squareSpin = (animeVals) => {
    // resizeCanvas();

    const xVals = [ (canvas.width / 6),
                    canvas.width * (2 * 6),
                    canvas.width * (3 * 6),
                    canvas.width * (4 * 6),
                    canvas.width * (5 * 6)];
    const y = canvas.height / 2;
    const squares = createRectangles(false, xVals, y, animeVals);

    squares.forEach( (sq) => {
      sq.draw(ctx);
    });

    const animeSqSpin = anime({
      targets: squares,
      translateX: [
        { value: 100, duration: 300, easing: 'easeInOutQuart' },
        { value: -100, duration: 300, easing: 'easeInOutQuart' },
        { value: 0, duration: 400, easing: 'easeInOutQuart' },
      ],
      rotate: { value: '1turn', duration: 500,
                easing: 'easeInOutSine', delay: 600 },
      complete: clearAnimation
    });

    animations.push(squareSpin);
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

    const rectangles = createRectangles(x, yVals, animeVals);

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


  document.addEventListener( 'keydown', (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //e is object!! https://developer.mozilla.org/en-US/docs/Web/Events/keydown
    const key = (event.key).toLowerCase();
    console.log(key);

    if( key === 'a' || key === 'z' ) {
      bananaPeel( animeValues['a'] );
    } else if ( key === 'b' || key === 'y' ) {
      squareSpin( animeValues['b'] );
    }
  }, false);

  window.addEventListener('resize', resizeCanvas, false);
};

export default Animations;
