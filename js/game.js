// FINITE STATE MACHINE!
// TODO window.animationRunning into state

import { Animations } from './animations';
import { animeValues } from './animeValues';

export const ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
export const ONE_KEYPRESS = 'ONE_KEYPRESS';

export const handleState = (state) => {

  switch ( state.currentState ) {
    case ZERO_KEYPRESSES:
      // if( !window.animationRunning ) {
        state.currentState = ONE_KEYPRESS;
        state.firstKey = state.key;
        state.key = null;
        animationHandler.dispatchAnimation(state.firstKey);
      // }
      break;
    case ONE_KEYPRESS:
      state.currentState = ZERO_KEYPRESSES;

      // matching

  }
};

class animationHandler {

// create class constant:
  static get ANIMATIONS() {
    console.log(Animations.bananaPeel);
    console.log(Animations.bananaPeel( animeValues['a'] ));
    return {
      a: Animations.bananaPeel( animeValues['a'] ),
      z: Animations.bananaPeel( animeValues['a'] ),
      b: Animations.squareSlide( animeValues['b'] ),
      y: Animations.squareSlide( animeValues['b'] ),
      c: Animations.squarePanels( animeValues['c'] ),
      x: Animations.squarePanels( animeValues['c'] ),
      d: Animations.purpleFireworks( animeValues['d'] ),
      w: Animations.purpleFireworks( animeValues['d'] ),
      e: Animations.redSlideLeft( animeValues['e'] ),
      v: Animations.redSlideLeft( animeValues['e'] ),
      f: Animations.purpleSlideUp( animeValues['f'] ),
      u: Animations.purpleSlideUp( animeValues['f'] ),
      g: Animations.squareLineRight( animeValues['g'] ),
      t: Animations.squareLineRight( animeValues['g'] ),
      h: Animations.squareLineUp( animeValues['h'] ),
      s: Animations.squareLineUp( animeValues['h'] ),
      i: Animations.perceive( animeValues['i'] ),
      r: Animations.perceive( animeValues['i'] ),
      j: Animations.go( animeValues['j'] ),
      q: Animations.go( animeValues['j'] ),
      k: Animations.blobs( animeValues['k'] ),
      p: Animations.blobs( animeValues['k'] ),
      l: Animations.tealFireworks( animeValues['l'] ),
      o: Animations.tealFireworks( animeValues['l'] ),
      m: Animations.balloon( animeValues['m'] ),
      n: Animations.balloon( animeValues['m'] )
    };
  }

  static dispatchAnimation(key) {
    if( this.ANIMATIONS[key] ) {
      console.log("in conditional");
      window.animationRunning = true;
      this.ANIMATIONS[key]();
    }
  }
}
