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

  // below method from https://github.com/iamsammak/soundspace
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
