import anime from 'animejs';

import Circle from './circle';
import Rectangle from './rectangle';
import Word from './word';

import { animeValues } from './animeValues';

// –––––––––––– CIRCLES ––––––––––––
export const createCircles = (xVals, yVals, animeVals, radius) => {
  const circles = [];

  for ( let i = 0; i < animeVals.numEls; i++ ) {
    const color = animeVals.colors[i];
    circles.push(new Circle( xVals, yVals, color, animeVals, radius ));
  }

  return circles;
};


// –––––––––––– WORDS ––––––––––––
export const createWords = (state, animeVals) => {
  const words = [];
  for (let i = 0; i < 8; i++) {
    let x = anime.random(state.canvas.width * (1/4), state.canvas.width * (3/4));
    let y = anime.random(state.canvas.height * (1/4), state.canvas.height * (3/4));
    const word = new Word(x, y, animeVals.colors[i], animeVals);
    words.push(word);
  }
  return words;
};


// –––––––––––– RECTANGLES ––––––––––––
export const createRectangles = (xVals, yVals, animeVals, w, h) => {
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
