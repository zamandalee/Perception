import Animations from './animations';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');

  new Animations(canvas, ctx);
});
