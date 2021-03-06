/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _animations = __webpack_require__(1);
	
	var _animations2 = _interopRequireDefault(_animations);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var canvas = document.getElementById("canvas");
	  var ctx = canvas.getContext('2d');
	
	  new _animations2.default(canvas, ctx);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // flow: shapeCreation -> animation creation is ___Animations ->
	// keypress listener here -> keypress and animation rendering handled in game
	// TODO add different fonts to word animations
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _animeValues = __webpack_require__(3);
	
	var _shapeCreation = __webpack_require__(4);
	
	var _game = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Animations = function () {
	  function Animations(canvas, ctx) {
	    _classCallCheck(this, Animations);
	
	    this.state = { key: null, currentState: _game.ZERO_KEYPRESSES,
	      animationRunning: false, animations: [],
	      canvas: canvas, ctx: ctx, matchScore: 0 };
	
	    this.infiniteAnimation(this.state);
	    this.keydownListener(this.state);
	  }
	
	  // below method from https://github.com/iamsammak/soundspace
	
	
	  _createClass(Animations, [{
	    key: 'infiniteAnimation',
	    value: function infiniteAnimation(state) {
	      (0, _animejs2.default)({
	        duration: Infinity,
	        update: function update() {
	          state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
	
	          state.animations.forEach(function (anim) {
	            anim.animatables.forEach(function (animatable) {
	              animatable.target.draw(state.ctx);
	            });
	          });
	        }
	      });
	    }
	  }, {
	    key: 'keydownListener',
	
	
	    // assign state.animations to keyboard keys
	    value: function keydownListener(state) {
	      document.addEventListener('keydown', function (event) {
	        state.ctx.clearRect(0, 0, state.canvas.width, state.canvas.height);
	
	        //e is object!! https://developer.mozilla.org/en-US/docs/Web/Events/keydown
	        state.key = event.key.toLowerCase();
	        (0, _game.handleState)(state); //finite state machine handles animation
	      }, false);
	
	      window.addEventListener('resize', Animations.resizeCanvas(state), false);
	    }
	  }], [{
	    key: 'clearAnimation',
	    value: function clearAnimation(state) {
	      state.animations = [];
	    }
	
	    // stackoverflow.com/questions/1664785/resize-html5-this.canvas-to-fit-window
	
	  }, {
	    key: 'resizeCanvas',
	    value: function resizeCanvas(state) {
	      state.canvas.width = window.innerWidth;
	      state.canvas.height = window.innerHeight;
	    }
	  }]);
	
	  return Animations;
	}();
	
	exports.default = Animations;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 * Anime v1.1.3
	 * http://anime-js.com
	 * JavaScript animation engine
	 * Copyright (c) 2016 Julian Garnier
	 * http://juliangarnier.com
	 * Released under the MIT license
	 */
	
	(function (root, factory) {
	  if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof module === 'object' && module.exports) {
	    // Node. Does not work with strict CommonJS, but
	    // only CommonJS-like environments that support module.exports,
	    // like Node.
	    module.exports = factory();
	  } else {
	    // Browser globals (root is window)
	    root.anime = factory();
	  }
	}(this, function () {
	
	  var version = '1.1.3';
	
	  // Defaults
	
	  var defaultSettings = {
	    duration: 1000,
	    delay: 0,
	    loop: false,
	    autoplay: true,
	    direction: 'normal',
	    easing: 'easeOutElastic',
	    elasticity: 400,
	    round: false,
	    begin: undefined,
	    update: undefined,
	    complete: undefined
	  }
	
	  // Transforms
	
	  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];
	  var transform, transformStr = 'transform';
	
	  // Utils
	
	  var is = {
	    arr: function(a) { return Array.isArray(a) },
	    obj: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
	    svg: function(a) { return a instanceof SVGElement },
	    dom: function(a) { return a.nodeType || is.svg(a) },
	    num: function(a) { return !isNaN(parseInt(a)) },
	    str: function(a) { return typeof a === 'string' },
	    fnc: function(a) { return typeof a === 'function' },
	    und: function(a) { return typeof a === 'undefined' },
	    nul: function(a) { return typeof a === 'null' },
	    hex: function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
	    rgb: function(a) { return /^rgb/.test(a) },
	    hsl: function(a) { return /^hsl/.test(a) },
	    col: function(a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)) }
	  }
	
	  // Easings functions adapted from http://jqueryui.com/
	
	  var easings = (function() {
	    var eases = {};
	    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
	    var functions = {
	      Sine: function(t) { return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2); },
	      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
	      Elastic: function(t, m) {
	        if( t === 0 || t === 1 ) return t;
	        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
	        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
	      },
	      Back: function(t) { return t * t * ( 3 * t - 2 ); },
	      Bounce: function(t) {
	        var pow2, bounce = 4;
	        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
	        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
	      }
	    }
	    names.forEach(function(name, i) {
	      functions[name] = function(t) {
	        return Math.pow( t, i + 2 );
	      }
	    });
	    Object.keys(functions).forEach(function(name) {
	      var easeIn = functions[name];
	      eases['easeIn' + name] = easeIn;
	      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
	      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
	      eases['easeOutIn' + name] = function(t, m) { return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2; };
	    });
	    eases.linear = function(t) { return t; };
	    return eases;
	  })();
	
	  // Strings
	
	  var numberToString = function(val) {
	    return (is.str(val)) ? val : val + '';
	  }
	
	  var stringToHyphens = function(str) {
	    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	  }
	
	  var selectString = function(str) {
	    if (is.col(str)) return false;
	    try {
	      var nodes = document.querySelectorAll(str);
	      return nodes;
	    } catch(e) {
	      return false;
	    }
	  }
	
	  // Numbers
	
	  var random = function(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
	
	  // Arrays
	
	  var flattenArray = function(arr) {
	    return arr.reduce(function(a, b) {
	      return a.concat(is.arr(b) ? flattenArray(b) : b);
	    }, []);
	  }
	
	  var toArray = function(o) {
	    if (is.arr(o)) return o;
	    if (is.str(o)) o = selectString(o) || o;
	    if (o instanceof NodeList || o instanceof HTMLCollection) return [].slice.call(o);
	    return [o];
	  }
	
	  var arrayContains = function(arr, val) {
	    return arr.some(function(a) { return a === val; });
	  }
	
	  var groupArrayByProps = function(arr, propsArr) {
	    var groups = {};
	    arr.forEach(function(o) {
	      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
	      groups[group] = groups[group] || [];
	      groups[group].push(o);
	    });
	    return Object.keys(groups).map(function(group) {
	      return groups[group];
	    });
	  }
	
	  var removeArrayDuplicates = function(arr) {
	    return arr.filter(function(item, pos, self) {
	      return self.indexOf(item) === pos;
	    });
	  }
	
	  // Objects
	
	  var cloneObject = function(o) {
	    var newObject = {};
	    for (var p in o) newObject[p] = o[p];
	    return newObject;
	  }
	
	  var mergeObjects = function(o1, o2) {
	    for (var p in o2) o1[p] = !is.und(o1[p]) ? o1[p] : o2[p];
	    return o1;
	  }
	
	  // Colors
	
	  var hexToRgb = function(hex) {
	    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
	    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    var r = parseInt(rgb[1], 16);
	    var g = parseInt(rgb[2], 16);
	    var b = parseInt(rgb[3], 16);
	    return 'rgb(' + r + ',' + g + ',' + b + ')';
	  }
	
	  var hslToRgb = function(hsl) {
	    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
	    var h = parseInt(hsl[1]) / 360;
	    var s = parseInt(hsl[2]) / 100;
	    var l = parseInt(hsl[3]) / 100;
	    var hue2rgb = function(p, q, t) {
	      if (t < 0) t += 1;
	      if (t > 1) t -= 1;
	      if (t < 1/6) return p + (q - p) * 6 * t;
	      if (t < 1/2) return q;
	      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
	      return p;
	    }
	    var r, g, b;
	    if (s == 0) {
	      r = g = b = l;
	    } else {
	      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      var p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1/3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1/3);
	    }
	    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
	  }
	
	  var colorToRgb = function(val) {
	    if (is.rgb(val)) return val;
	    if (is.hex(val)) return hexToRgb(val);
	    if (is.hsl(val)) return hslToRgb(val);
	  }
	
	  // Units
	
	  var getUnit = function(val) {
	    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
	  }
	
	  var addDefaultTransformUnit = function(prop, val, intialVal) {
	    if (getUnit(val)) return val;
	    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
	    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
	    return val;
	  }
	
	  // Values
	
	  var getCSSValue = function(el, prop) {
	    // First check if prop is a valid CSS property
	    if (prop in el.style) {
	      // Then return the property value or fallback to '0' when getPropertyValue fails
	      return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
	    }
	  }
	
	  var getTransformValue = function(el, prop) {
	    var defaultVal = prop.indexOf('scale') > -1 ? 1 : 0;
	    var str = el.style.transform;
	    if (!str) return defaultVal;
	    var rgx = /(\w+)\((.+?)\)/g;
	    var match = [];
	    var props = [];
	    var values = [];
	    while (match = rgx.exec(str)) {
	      props.push(match[1]);
	      values.push(match[2]);
	    }
	    var val = values.filter(function(f, i) { return props[i] === prop; });
	    return val.length ? val[0] : defaultVal;
	  }
	
	  var getAnimationType = function(el, prop) {
	    if ( is.dom(el) && arrayContains(validTransforms, prop)) return 'transform';
	    if ( is.dom(el) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
	    if ( is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
	    if (!is.nul(el[prop]) && !is.und(el[prop])) return 'object';
	  }
	
	  var getInitialTargetValue = function(target, prop) {
	    switch (getAnimationType(target, prop)) {
	      case 'transform': return getTransformValue(target, prop);
	      case 'css': return getCSSValue(target, prop);
	      case 'attribute': return target.getAttribute(prop);
	    }
	    return target[prop] || 0;
	  }
	
	  var getValidValue = function(values, val, originalCSS) {
	    if (is.col(val)) return colorToRgb(val);
	    if (getUnit(val)) return val;
	    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
	    if (!unit && originalCSS) unit = getUnit(originalCSS);
	    return unit ? val + unit : val;
	  }
	
	  var decomposeValue = function(val) {
	    var rgx = /-?\d*\.?\d+/g;
	    return {
	      original: val,
	      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
	      strings: numberToString(val).split(rgx)
	    }
	  }
	
	  var recomposeValue = function(numbers, strings, initialStrings) {
	    return strings.reduce(function(a, b, i) {
	      var b = (b ? b : initialStrings[i - 1]);
	      return a + numbers[i - 1] + b;
	    });
	  }
	
	  // Animatables
	
	  var getAnimatables = function(targets) {
	    var targets = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
	    return targets.map(function(t, i) {
	      return { target: t, id: i };
	    });
	  }
	
	  // Properties
	
	  var getProperties = function(params, settings) {
	    var props = [];
	    for (var p in params) {
	      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
	        var prop = is.obj(params[p]) ? cloneObject(params[p]) : {value: params[p]};
	        prop.name = p;
	        props.push(mergeObjects(prop, settings));
	      }
	    }
	    return props;
	  }
	
	  var getPropertiesValues = function(target, prop, value, i) {
	    var values = toArray( is.fnc(value) ? value(target, i) : value);
	    return {
	      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
	      to: (values.length > 1) ? values[1] : values[0]
	    }
	  }
	
	  // Tweens
	
	  var getTweenValues = function(prop, values, type, target) {
	    var valid = {};
	    if (type === 'transform') {
	      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
	      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
	    } else {
	      var originalCSS = (type === 'css') ? getCSSValue(target, prop) : undefined;
	      valid.from = getValidValue(values, values.from, originalCSS);
	      valid.to = getValidValue(values, values.to, originalCSS);
	    }
	    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
	  }
	
	  var getTweensProps = function(animatables, props) {
	    var tweensProps = [];
	    animatables.forEach(function(animatable, i) {
	      var target = animatable.target;
	      return props.forEach(function(prop) {
	        var animType = getAnimationType(target, prop.name);
	        if (animType) {
	          var values = getPropertiesValues(target, prop.name, prop.value, i);
	          var tween = cloneObject(prop);
	          tween.animatables = animatable;
	          tween.type = animType;
	          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
	          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
	          tween.round = (is.col(values.from) || tween.round) ? 1 : 0;
	          tween.delay = (is.fnc(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
	          tween.duration = (is.fnc(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
	          tweensProps.push(tween);
	        }
	      });
	    });
	    return tweensProps;
	  }
	
	  var getTweens = function(animatables, props) {
	    var tweensProps = getTweensProps(animatables, props);
	    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
	    return splittedProps.map(function(tweenProps) {
	      var tween = cloneObject(tweenProps[0]);
	      tween.animatables = tweenProps.map(function(p) { return p.animatables });
	      tween.totalDuration = tween.delay + tween.duration;
	      return tween;
	    });
	  }
	
	  var reverseTweens = function(anim, delays) {
	    anim.tweens.forEach(function(tween) {
	      var toVal = tween.to;
	      var fromVal = tween.from;
	      var delayVal = anim.duration - (tween.delay + tween.duration);
	      tween.from = toVal;
	      tween.to = fromVal;
	      if (delays) tween.delay = delayVal;
	    });
	    anim.reversed = anim.reversed ? false : true;
	  }
	
	  var getTweensDuration = function(tweens) {
	    return Math.max.apply(Math, tweens.map(function(tween){ return tween.totalDuration; }));
	  }
	
	  var getTweensDelay = function(tweens) {
	    return Math.min.apply(Math, tweens.map(function(tween){ return tween.delay; }));
	  }
	
	  // will-change
	
	  var getWillChange = function(anim) {
	    var props = [];
	    var els = [];
	    anim.tweens.forEach(function(tween) {
	      if (tween.type === 'css' || tween.type === 'transform' ) {
	        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
	        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
	      }
	    });
	    return {
	      properties: removeArrayDuplicates(props).join(', '),
	      elements: removeArrayDuplicates(els)
	    }
	  }
	
	  var setWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.willChange = willChange.properties;
	    });
	  }
	
	  var removeWillChange = function(anim) {
	    var willChange = getWillChange(anim);
	    willChange.elements.forEach(function(element) {
	      element.style.removeProperty('will-change');
	    });
	  }
	
	  /* Svg path */
	
	  var getPathProps = function(path) {
	    var el = is.str(path) ? selectString(path)[0] : path;
	    return {
	      path: el,
	      value: el.getTotalLength()
	    }
	  }
	
	  var snapProgressToPath = function(tween, progress) {
	    var pathEl = tween.path;
	    var pathProgress = tween.value * progress;
	    var point = function(offset) {
	      var o = offset || 0;
	      var p = progress > 1 ? tween.value + o : pathProgress + o;
	      return pathEl.getPointAtLength(p);
	    }
	    var p = point();
	    var p0 = point(-1);
	    var p1 = point(+1);
	    switch (tween.name) {
	      case 'translateX': return p.x;
	      case 'translateY': return p.y;
	      case 'rotate': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
	    }
	  }
	
	  // Progress
	
	  var getTweenProgress = function(tween, time) {
	    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
	    var percent = elapsed / tween.duration;
	    var progress = tween.to.numbers.map(function(number, p) {
	      var start = tween.from.numbers[p];
	      var eased = easings[tween.easing](percent, tween.elasticity);
	      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
	      val = tween.round ? Math.round(val * tween.round) / tween.round : val;
	      return val;
	    });
	    return recomposeValue(progress, tween.to.strings, tween.from.strings);
	  }
	
	  var setAnimationProgress = function(anim, time) {
	    var transforms;
	    anim.currentTime = time;
	    anim.progress = (time / anim.duration) * 100;
	    for (var t = 0; t < anim.tweens.length; t++) {
	      var tween = anim.tweens[t];
	      tween.currentValue = getTweenProgress(tween, time);
	      var progress = tween.currentValue;
	      for (var a = 0; a < tween.animatables.length; a++) {
	        var animatable = tween.animatables[a];
	        var id = animatable.id;
	        var target = animatable.target;
	        var name = tween.name;
	        switch (tween.type) {
	          case 'css': target.style[name] = progress; break;
	          case 'attribute': target.setAttribute(name, progress); break;
	          case 'object': target[name] = progress; break;
	          case 'transform':
	          if (!transforms) transforms = {};
	          if (!transforms[id]) transforms[id] = [];
	          transforms[id].push(progress);
	          break;
	        }
	      }
	    }
	    if (transforms) {
	      if (!transform) transform = (getCSSValue(document.body, transformStr) ? '' : '-webkit-') + transformStr;
	      for (var t in transforms) {
	        anim.animatables[t].target.style[transform] = transforms[t].join(' ');
	      }
	    }
	  }
	
	  // Animation
	
	  var createAnimation = function(params) {
	    var anim = {};
	    anim.animatables = getAnimatables(params.targets);
	    anim.settings = mergeObjects(params, defaultSettings);
	    anim.properties = getProperties(params, anim.settings);
	    anim.tweens = getTweens(anim.animatables, anim.properties);
	    anim.duration = anim.tweens.length ? getTweensDuration(anim.tweens) : params.duration;
	    anim.delay = anim.tweens.length ? getTweensDelay(anim.tweens) : params.delay;
	    anim.currentTime = 0;
	    anim.progress = 0;
	    anim.ended = false;
	    return anim;
	  }
	
	  // Public
	
	  var animations = [];
	  var raf = 0;
	
	  var engine = (function() {
	    var play = function() { raf = requestAnimationFrame(step); };
	    var step = function(t) {
	      if (animations.length) {
	        for (var i = 0; i < animations.length; i++) animations[i].tick(t);
	        play();
	      } else {
	        cancelAnimationFrame(raf);
	        raf = 0;
	      }
	    }
	    return play;
	  })();
	
	  var animation = function(params) {
	
	    var anim = createAnimation(params);
	    var time = {};
	
	    anim.tick = function(now) {
	      anim.ended = false;
	      if (!time.start) time.start = now;
	      time.current = Math.min(Math.max(time.last + now - time.start, 0), anim.duration);
	      setAnimationProgress(anim, time.current);
	      var s = anim.settings;
	      if (time.current >= anim.delay) {
	        if (s.begin) s.begin(anim); s.begin = undefined;
	        if (s.update) s.update(anim);
	      }
	      if (time.current >= anim.duration) {
	        if (s.loop) {
	          time.start = now;
	          if (s.direction === 'alternate') reverseTweens(anim, true);
	          if (is.num(s.loop)) s.loop--;
	        } else {
	          anim.ended = true;
	          anim.pause();
	          if (s.complete) s.complete(anim);
	        }
	        time.last = 0;
	      }
	    }
	
	    anim.seek = function(progress) {
	      setAnimationProgress(anim, (progress / 100) * anim.duration);
	    }
	
	    anim.pause = function() {
	      removeWillChange(anim);
	      var i = animations.indexOf(anim);
	      if (i > -1) animations.splice(i, 1);
	    }
	
	    anim.play = function(params) {
	      anim.pause();
	      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
	      time.start = 0;
	      time.last = anim.ended ? 0 : anim.currentTime;
	      var s = anim.settings;
	      if (s.direction === 'reverse') reverseTweens(anim);
	      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
	      setWillChange(anim);
	      animations.push(anim);
	      if (!raf) engine();
	    }
	
	    anim.restart = function() {
	      if (anim.reversed) reverseTweens(anim);
	      anim.pause();
	      anim.seek(0);
	      anim.play();
	    }
	
	    if (anim.settings.autoplay) anim.play();
	
	    return anim;
	
	  }
	
	  // Remove one or multiple targets from all active animations.
	
	  var remove = function(elements) {
	    var targets = flattenArray(is.arr(elements) ? elements.map(toArray) : toArray(elements));
	    for (var i = animations.length-1; i >= 0; i--) {
	      var animation = animations[i];
	      var tweens = animation.tweens;
	      for (var t = tweens.length-1; t >= 0; t--) {
	        var animatables = tweens[t].animatables;
	        for (var a = animatables.length-1; a >= 0; a--) {
	          if (arrayContains(targets, animatables[a].target)) {
	            animatables.splice(a, 1);
	            if (!animatables.length) tweens.splice(t, 1);
	            if (!tweens.length) animation.pause();
	          }
	        }
	      }
	    }
	  }
	
	  animation.version = version;
	  animation.speed = 1;
	  animation.list = animations;
	  animation.remove = remove;
	  animation.easings = easings;
	  animation.getValue = getInitialTargetValue;
	  animation.path = getPathProps;
	  animation.random = random;
	
	  return animation;
	
	}));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// use of this file was inspired by iamsammak: https://github.com/iamsammak/soundspace
	
	var animeValues = exports.animeValues = {
	  a: {
	    numEls: 22,
	    colors: ['#f4de70'],
	    width: 100,
	    height: 50,
	    endWidth: 0,
	    duration: 500,
	    delay: 100,
	    easing: 'easeInOutSine'
	  },
	
	  b: {
	    numEls: 22,
	    colors: ['#bcd6ff', '#a2c0ef', '#83a8e2', '#6d96d6', '#5382cc'],
	    duration: 700,
	    delay: 100,
	    easing: 'easeInOutSine'
	  },
	
	  c: {
	    numEls: 5,
	    colors: ['#b3a5d1', '#b7e5d8', '#f9cb9cff', '#eeed9eff', '#d5a6bdff'],
	    endWidth: 0,
	    duration: 700,
	    easing: 'easeInOutSine'
	  },
	
	  d: {
	    numEls: 20,
	    colors: ['#e8defc', '#e5d8ff', '#ccbee8', '#b3a5d1', '#9f91bf', '#9f91bf', '#706291', '#d87070', '#4a3d68', '#3b2e59', '#2e2249', '#ccbee8', '#9f91bf', '#d87070', '#8779a8', '#ccbee8', '#584b77', '#d88c8c'],
	    duration: 500,
	    easing: 'easeInOutSine'
	  },
	
	  e: {
	    numEls: 1,
	    colors: ['#eaafaf'],
	    endWidth: 0,
	    duration: 400,
	    easing: 'easeInOutSine'
	  },
	
	  f: {
	    numEls: 1,
	    colors: ['#b3a5d1'],
	    endHeight: 0,
	    duration: 400,
	    easing: 'easeInOutSine'
	  },
	
	  g: {
	    numEls: 10,
	    colors: ['#e8defc', '#e5d8ff', '#ccbee8', '#b3a5d1', '#9f91bf', '#8779a8', '#706291', '#584b77', '#4a3d68', '#3b2e59'],
	    duration: 500,
	    easing: 'easeInOutSine'
	  },
	
	  h: {
	    numEls: 5,
	    colors: ['#5f995e', '#76aa75', '#90c18f', '#a4d1a3', '#c8edc7'],
	    duration: 500
	  },
	
	  i: {
	    colors: ['#9f91bf', '#584b77', '#6d96d6', '#bcd6ff', '#b7e5d8', '#76aa75', '#c8edc7', '#e8defc'],
	    duration: 500,
	    easing: 'easeInOutSine',
	    text: 'perceive!',
	    font: ['40px Roboto Condensed']
	  },
	
	  j: {
	    colors: ['#3a7765', '#d5a6bdff', '#d87070', '#f9cb9cff', '#c14343', '#f4de70', '#f49842', '#db74bc'],
	    duration: 500,
	    easing: 'easeInOutSine',
	    text: '加油!',
	    font: ['60px Roboto Condensed']
	  },
	
	  k: {
	    numEls: 10,
	    colors: ['#eaafaf', '#d88c8c', '#d87070', '#d65e5e', '#f49842', '#aa2f2f', '#eaafaf', '#f49842', '#f9cb9cff'],
	    duration: 500,
	    easing: 'easeInOutSine'
	  },
	
	  l: {
	    numEls: 20,
	    colors: ['#d9fcf2', '#f4de70', '#9cd1c2', '#eeed9eff', '#d5a6bdff', '#54917f', '#3a7765', '#54917f', '#9cd1c2', '#eeed9eff', '#b7e5d8', '#d5a6bdff', '#80baa9', '#63a08e', '#f4de70', '#3a7765', '#54917f', '#9cd1c2'],
	    duration: 500,
	    easing: 'easeInOutSine'
	  },
	
	  m: {
	    numEls: 1,
	    colors: ['#489e62'],
	    duration: 500,
	    easing: 'easeInOutSine'
	  }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createRectangles = exports.createWords = exports.createCircles = undefined;
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _circle = __webpack_require__(5);
	
	var _circle2 = _interopRequireDefault(_circle);
	
	var _rectangle = __webpack_require__(6);
	
	var _rectangle2 = _interopRequireDefault(_rectangle);
	
	var _word = __webpack_require__(7);
	
	var _word2 = _interopRequireDefault(_word);
	
	var _animeValues = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// –––––––––––– CIRCLES ––––––––––––
	var createCircles = exports.createCircles = function createCircles(xVals, yVals, animeVals, radius) {
	  var circles = [];
	
	  for (var i = 0; i < animeVals.numEls; i++) {
	    var color = animeVals.colors[i];
	    circles.push(new _circle2.default(xVals, yVals, color, animeVals, radius));
	  }
	
	  return circles;
	};
	
	// –––––––––––– WORDS ––––––––––––
	var createWords = exports.createWords = function createWords(state, animeVals) {
	  var words = [];
	  for (var i = 0; i < 8; i++) {
	    var x = _animejs2.default.random(state.canvas.width * (1 / 4), state.canvas.width * (3 / 4));
	    var y = _animejs2.default.random(state.canvas.height * (1 / 4), state.canvas.height * (3 / 4));
	    var word = new _word2.default(x, y, animeVals.colors[i], animeVals);
	    words.push(word);
	  }
	  return words;
	};
	
	// –––––––––––– RECTANGLES ––––––––––––
	var createRectangles = exports.createRectangles = function createRectangles(xVals, yVals, animeVals, w, h) {
	  var rectangles = [];
	
	  for (var i = 0; i < animeVals.numEls; i++) {
	    var color = animeVals.colors[i];
	
	    // one of xVals or yVals could be an array, or neither could be
	    if (yVals.length) {
	      var y = yVals[i];
	      rectangles.push(new _rectangle2.default(xVals, y, color, animeVals, w, h));
	    } else {
	      if (xVals.length) {
	        var x = xVals[i];
	        rectangles.push(new _rectangle2.default(x, yVals, color, animeVals, w, h));
	      } else {
	        rectangles.push(new _rectangle2.default(xVals, yVals, color, animeVals, w, h));
	      }
	    }
	  }
	
	  return rectangles;
	};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Circle = function () {
	  function Circle(x, y, color, animeVals, radius) {
	    _classCallCheck(this, Circle);
	
	    this.x = x;
	    this.y = y;
	    this.color = color;
	    this.radius = radius;
	  }
	
	  _createClass(Circle, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.beginPath();
	      ctx.fillStyle = this.color;
	      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }]);
	
	  return Circle;
	}();
	
	exports.default = Circle;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Rectangle = function () {
	  function Rectangle(x, y, color, animeVals, width, height) {
	    _classCallCheck(this, Rectangle);
	
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.color = color;
	  }
	
	  _createClass(Rectangle, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.fillRect(this.x, this.y, this.width, this.height);
	    }
	  }]);
	
	  return Rectangle;
	}();
	
	exports.default = Rectangle;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Word = function () {
	  function Word(x, y, color, animeVals) {
	    _classCallCheck(this, Word);
	
	    this.x = x;
	    this.y = y;
	    this.color = color;
	    this.text = animeVals.text;
	    this.font = animeVals.font;
	  }
	
	  _createClass(Word, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.font = this.font;
	      ctx.fillText(this.text, this.x, this.y);
	    }
	  }]);
	
	  return Word;
	}();
	
	exports.default = Word;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.handleState = exports.WON = exports.NOT_MATCH = exports.MATCH = exports.ONE_KEYPRESS = exports.ZERO_KEYPRESSES = undefined;
	
	var _circleAnimations = __webpack_require__(9);
	
	var circleAnimations = _interopRequireWildcard(_circleAnimations);
	
	var _wordAnimations = __webpack_require__(10);
	
	var wordAnimations = _interopRequireWildcard(_wordAnimations);
	
	var _rectangleAnimations = __webpack_require__(11);
	
	var rectangleAnimations = _interopRequireWildcard(_rectangleAnimations);
	
	var _animeValues = __webpack_require__(3);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// ANIMATION/MATCHING GAME FLOW using a FINITE STATE MACHINE:
	
	//possible currentStates
	// TODO turn the matchText briefly green or red or purple depending on text
	
	// import Animations from './animations';
	var ZERO_KEYPRESSES = exports.ZERO_KEYPRESSES = 'ZERO_KEYPRESSES';
	var ONE_KEYPRESS = exports.ONE_KEYPRESS = 'ONE_KEYPRESS';
	var MATCH = exports.MATCH = 'MATCH';
	var NOT_MATCH = exports.NOT_MATCH = 'NOT_MATCH';
	var WON = exports.WON = 'WON';
	
	var alreadyMatched = [];
	
	var handleState = exports.handleState = function handleState(state) {
	    var matchText = '';
	    var htmlMessage = document.getElementById('match-text');
	
	    if (alphabet.includes(state.key)) {
	
	        // already matched
	        if (!matchedKeys[state.key]) {
	            matchText = "you've already found this match, try again 🙃";
	            htmlMessage.innerHTML = matchText;
	            state.currentState = ZERO_KEYPRESSES;
	        }
	        // not already matched
	        else {
	                switch (state.currentState) {
	                    case ZERO_KEYPRESSES:
	                        matchText = "that's one key, now press the matching one!";
	                        htmlMessage.innerHTML = matchText;
	
	                        state.currentState = ONE_KEYPRESS;
	                        state.firstKey = state.key;
	                        dispatchAnimation(state);
	                        state.key = null;
	                        break;
	
	                    case ONE_KEYPRESS:
	                        dispatchAnimation(state);
	
	                        // matching logic
	                        state.currentState = matchedKeys[state.firstKey] === state.key ? MATCH : NOT_MATCH;
	                        handleState(state);
	
	                        state.currentState = ZERO_KEYPRESSES;
	                        break;
	
	                    case MATCH:
	                        state.matchScore++;
	                        var htmlScore = document.getElementById('current-score');
	                        htmlScore.innerHTML = state.matchScore;
	
	                        // htmlMessage.classList.remove("message-red");
	                        // htmlMessage.classList.add("message-green");
	
	                        matchText = "you've found a match 🎉";
	                        htmlMessage.innerHTML = matchText;
	
	                        // render array of already matched key pairs
	                        var htmlMatchedKeys = document.getElementById('matched-keys');
	                        alreadyMatched = alreadyMatched.concat([state.key, state.firstKey]);
	                        htmlMatchedKeys.innerHTML = 'matches found: ' + alreadyMatched.sort().join(', ');
	
	                        // if won
	                        if (state.matchScore === 13) {
	                            state.currentState = WON;
	                            handleState(state);
	                        } else {
	                            //disable key from being pressed again if not won
	                            delete matchedKeys[state.firstKey];
	                            delete matchedKeys[state.key];
	                            delete KEY_ANIMATIONS[state.firstKey];
	                            delete KEY_ANIMATIONS[state.key];
	                        }
	
	                        // htmlMessage.innerHTML = matchText;
	
	                        break;
	                    case NOT_MATCH:
	                        matchText = 'not a match ☹️';
	                        htmlMessage.innerHTML = matchText;
	
	                        // htmlMessage.classList.remove("message-green");
	                        // htmlMessage.classList.add("message-red");
	                        // htmlMessage.innerHTML = matchText;
	                        break;
	
	                    case WON:
	                        matchText = "YOU WIN 🌟";
	                        htmlMessage.innerHTML = matchText;
	
	                        var htmlWinningScore = document.getElementById("match-score");
	                        htmlWinningScore.classList.add("winning-score");
	
	                        // render a won modal
	                        var htmlWinModal = document.getElementById("hidden-win");
	                        var blackout = document.getElementById("hidden-win-blackout");
	                        htmlWinModal.setAttribute("id", "win-modal");
	                        blackout.setAttribute("id", "win-blackout");
	
	                        // delete so not clickable
	                        delete matchedKeys[state.firstKey];
	                        delete matchedKeys[state.key];
	                }
	            }
	    } else {
	        // htmlMessage.classList.remove("message-green");
	        // htmlMessage.classList.remove("message-red");
	
	        var oldMatchText = htmlMessage.innerHTML;
	        //SET TIMEOUT
	        matchText = "that's not an a-z key 🙅🏻, try again";
	        htmlMessage.innerHTML = matchText;
	    }
	};
	
	// KEY/ANIMATION RANDOM ASSIGNMENT LOGIC:
	
	var shuffleArray = function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	};
	
	var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	
	var shuffledAlphabet = shuffleArray(alphabet);
	
	// matchedKeys = obj containing matched keys as key/val pairs
	var matchedKeys = {};
	
	for (var i = 0; i < shuffledAlphabet.length; i += 2) {
	    var nextLetter = shuffledAlphabet[i + 1];
	    var currentLetter = shuffledAlphabet[i];
	    matchedKeys[currentLetter] = nextLetter;
	    matchedKeys[nextLetter] = currentLetter;
	}
	
	// KEY_ANIMATIONS = set same animation to paired keys
	var allAnimations = [function (state) {
	    return rectangleAnimations.bananaPeel(state, _animeValues.animeValues['a']);
	}, function (state) {
	    return rectangleAnimations.squareSlide(state, _animeValues.animeValues['b']);
	}, function (state) {
	    return rectangleAnimations.squarePanels(state, _animeValues.animeValues['c']);
	}, function (state) {
	    return circleAnimations.purpleFireworks(state, _animeValues.animeValues['d']);
	}, function (state) {
	    return rectangleAnimations.redSlideLeft(state, _animeValues.animeValues['e']);
	}, function (state) {
	    return rectangleAnimations.purpleSlideUp(state, _animeValues.animeValues['f']);
	}, function (state) {
	    return rectangleAnimations.squareLineRight(state, _animeValues.animeValues['g']);
	}, function (state) {
	    return rectangleAnimations.squareLineUp(state, _animeValues.animeValues['h']);
	}, function (state) {
	    return wordAnimations.perceive(state, _animeValues.animeValues['i']);
	}, function (state) {
	    return wordAnimations.go(state, _animeValues.animeValues['j']);
	}, function (state) {
	    return circleAnimations.blobs(state, _animeValues.animeValues['k']);
	}, function (state) {
	    return circleAnimations.tealFireworks(state, _animeValues.animeValues['l']);
	}, function (state) {
	    return circleAnimations.balloon(state, _animeValues.animeValues['m']);
	}];
	
	var KEY_ANIMATIONS = {};
	
	for (var _i = 0; _i < Object.keys(matchedKeys).length; _i += 2) {
	    var currentKey = Object.keys(matchedKeys)[_i];
	    var matchedKey = matchedKeys[currentKey];
	
	    KEY_ANIMATIONS[currentKey] = allAnimations[_i / 2];
	    KEY_ANIMATIONS[matchedKey] = allAnimations[_i / 2];
	}
	
	// run animation if pressed key is in KEY_ANIMATIONS
	var dispatchAnimation = function dispatchAnimation(state) {
	    if (KEY_ANIMATIONS[state.key]) {
	        // window.animationRunning = true;
	        KEY_ANIMATIONS[state.key](state);
	    }
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.blobs = exports.tealFireworks = exports.purpleFireworks = exports.balloon = undefined;
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _animeValues = __webpack_require__(3);
	
	var _shapeCreation = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var resizeCanvas = function resizeCanvas(state) {
	  state.canvas.width = window.innerWidth;
	  state.canvas.height = window.innerHeight;
	};
	
	var clearAnimation = function clearAnimation(state) {
	  state.animations = [];
	};
	
	// –––––––––––– CIRCLES ––––––––––––
	// –––––– balloon ––––––
	var balloon = exports.balloon = function balloon(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = state.canvas.width / 2;
	  var y = state.canvas.height / 2;
	  var circle = (0, _shapeCreation.createCircles)(x, y, animeVals, state.canvas.width * (3 / 2));
	
	  var animeBalloon = (0, _animejs2.default)({
	    targets: circle,
	    radius: 0,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeBalloon);
	};
	
	// –––––– purple fireworks ––––––
	var purpleFireworks = exports.purpleFireworks = function purpleFireworks(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = Math.random() * (state.canvas.width * (7 / 9));
	  var y = Math.random() * (state.canvas.height * (7 / 9));
	  var circles = (0, _shapeCreation.createCircles)(x, y, animeVals, state.canvas.width / 25);
	
	  var animeFireworks = (0, _animejs2.default)({
	    targets: circles,
	    x: function x(cir) {
	      return cir.x + _animejs2.default.random(-state.canvas.width, state.canvas.width);
	    },
	    y: function y(cir) {
	      return cir.y + _animejs2.default.random(-state.canvas.width, state.canvas.width);
	    },
	    radius: state.canvas.width / 55,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeFireworks);
	};
	
	// –––––– teal fireworks ––––––
	var tealFireworks = exports.tealFireworks = function tealFireworks(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = Math.random() * (state.canvas.width * (7 / 9));
	  var y = Math.random() * (state.canvas.height * (7 / 9));
	  var circles = (0, _shapeCreation.createCircles)(x, y, animeVals, state.canvas.width / 25);
	
	  var animeFireworks = (0, _animejs2.default)({
	    targets: circles,
	    x: function x(cir) {
	      return cir.x + _animejs2.default.random(-state.canvas.width, state.canvas.width);
	    },
	    y: function y(cir) {
	      return cir.y + _animejs2.default.random(-state.canvas.width, state.canvas.width);
	    },
	    radius: state.canvas.width / 55,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeFireworks);
	};
	
	// –––––– blobs ––––––
	var blobs = exports.blobs = function blobs(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = Math.random() * state.canvas.width;
	  var y = Math.random() * state.canvas.height;
	  var circles = (0, _shapeCreation.createCircles)(x, y, animeVals, state.canvas.width / 14);
	
	  var animeBlobs = (0, _animejs2.default)({
	    targets: circles,
	    x: function x() {
	      return _animejs2.default.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8));
	    },
	    y: function y() {
	      return _animejs2.default.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8));
	    },
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	  state.animations.push(animeBlobs);
	};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.perceive = exports.go = undefined;
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _animeValues = __webpack_require__(3);
	
	var _shapeCreation = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var resizeCanvas = function resizeCanvas(state) {
	  state.canvas.width = window.innerWidth;
	  state.canvas.height = window.innerHeight;
	};
	
	var clearAnimation = function clearAnimation(state) {
	  state.animations = [];
	};
	
	// –––––––––––– WORDS ––––––––––––
	// –––––– 加油 ––––––
	var go = exports.go = function go(state, animeVals) {
	  resizeCanvas(state);
	
	  var words = (0, _shapeCreation.createWords)(state, animeVals);
	  var animeGo = (0, _animejs2.default)({
	    targets: words,
	    font: animeVals.font,
	    x: function x() {
	      return _animejs2.default.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8));
	    },
	    y: function y() {
	      return _animejs2.default.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8));
	    },
	    duration: animeVals.duration,
	    delay: function delay(el, idx) {
	      return idx * 80;
	    },
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	  state.animations.push(animeGo);
	};
	
	// –––––– perceive ––––––
	var perceive = exports.perceive = function perceive(state, animeVals) {
	  resizeCanvas(state);
	
	  var words = (0, _shapeCreation.createWords)(state, animeVals);
	  var animePerceive = (0, _animejs2.default)({
	    targets: words,
	    font: animeVals.font,
	    x: function x() {
	      return _animejs2.default.random(state.canvas.width * (1 / 8), state.canvas.width * (7 / 8));
	    },
	    y: function y() {
	      return _animejs2.default.random(state.canvas.height * (1 / 8), state.canvas.height * (7 / 8));
	    },
	    duration: animeVals.duration,
	    delay: function delay(el, idx) {
	      return idx * 80;
	    },
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	  state.animations.push(animePerceive);
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.bananaPeel = exports.squareSlide = exports.squarePanels = exports.greenFlash = exports.redSlideLeft = exports.purpleSlideUp = exports.squareLineRight = exports.squareLineUp = undefined;
	
	var _animejs = __webpack_require__(2);
	
	var _animejs2 = _interopRequireDefault(_animejs);
	
	var _animeValues = __webpack_require__(3);
	
	var _shapeCreation = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var resizeCanvas = function resizeCanvas(state) {
	  state.canvas.width = window.innerWidth;
	  state.canvas.height = window.innerHeight;
	};
	
	var clearAnimation = function clearAnimation(state) {
	  state.animations = [];
	};
	
	// –––––––––––– RECTANGLES ––––––––––––
	// –––––– square line up ––––––
	var squareLineUp = exports.squareLineUp = function squareLineUp(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = state.canvas.width * (8 / 10);
	  var yArr = [state.canvas.height / 7, state.canvas.height * (2 / 7), state.canvas.height * (3 / 7), state.canvas.height * (4 / 7), state.canvas.height * (5 / 7)];
	  var squares = (0, _shapeCreation.createRectangles)(x, yArr, animeVals, state.canvas.height / 8, state.canvas.height / 8);
	
	  var animeSquareLineUp = (0, _animejs2.default)({
	    targets: squares,
	    x: function x() {
	      return state.canvas.width / 10;
	    },
	    width: state.canvas.height / 15,
	    height: state.canvas.height / 15,
	    duration: animeVals.duration,
	    delay: function delay(el, idx) {
	      return idx * 80;
	    },
	    easing: 'easeOutExpo',
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeSquareLineUp);
	};
	
	// –––––– square line right ––––––
	var squareLineRight = exports.squareLineRight = function squareLineRight(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = state.canvas.width / 11;
	  var yVals = [state.canvas.height / 12, state.canvas.height * (2 / 12), state.canvas.height * (3 / 12), state.canvas.height * (4 / 12), state.canvas.height * (5 / 12), state.canvas.height * (6 / 12), state.canvas.height * (7 / 12), state.canvas.height * (8 / 12), state.canvas.height * (9 / 12), state.canvas.height * (10 / 12)];
	  var squares = (0, _shapeCreation.createRectangles)(x, yVals, animeVals, state.canvas.height / 20, state.canvas.height / 20);
	
	  var animeSquareLine = (0, _animejs2.default)({
	    targets: squares,
	    x: function x() {
	      return state.canvas.width * (8 / 10);
	    },
	    width: state.canvas.height / 8,
	    height: state.canvas.height / 8,
	    duration: animeVals.duration,
	    delay: function delay(el, idx) {
	      return idx * 80;
	    },
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeSquareLine);
	};
	
	// –––––– purple slide up ––––––
	var purpleSlideUp = exports.purpleSlideUp = function purpleSlideUp(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = 0;
	  var y = 0;
	  var width = state.canvas.width;
	  var height = state.canvas.height;
	  var rectangle = (0, _shapeCreation.createRectangles)(x, y, animeVals, width, height);
	
	  var animePurpleSlide = (0, _animejs2.default)({
	    targets: rectangle,
	    height: animeVals.endHeight,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animePurpleSlide);
	};
	
	// –––––– red slide left ––––––
	var redSlideLeft = exports.redSlideLeft = function redSlideLeft(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = 0;
	  var y = 0;
	  var width = state.canvas.width;
	  var height = state.canvas.height;
	  var rectangle = (0, _shapeCreation.createRectangles)(x, y, animeVals, width, height);
	
	  var animeRedSlide = (0, _animejs2.default)({
	    targets: rectangle,
	    width: animeVals.endWidth,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeRedSlide);
	};
	
	// –––––– green flash ––––––
	var greenFlash = exports.greenFlash = function greenFlash(state, animeVals) {
	  resizeCanvas(state);
	  var x = 0;
	  var y = 0;
	  var width = state.canvas.width;
	  var height = state.canvas.height;
	  var rectangle = (0, _shapeCreation.createRectangles)(x, y, animeVals, width, height);
	
	  var animeGreenFlash = (0, _animejs2.default)({
	    targets: rectangle,
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeGreenFlash);
	};
	
	// –––––– square panels ––––––
	var squarePanels = exports.squarePanels = function squarePanels(state, animeVals) {
	  resizeCanvas(state);
	
	  var xVals = [0, state.canvas.width / 5, state.canvas.width * (2 / 5), state.canvas.width * (3 / 5), state.canvas.width * (4 / 5)];
	  var y = state.canvas.height * (3 / 8);
	
	  var squares = (0, _shapeCreation.createRectangles)(xVals, y, animeVals, state.canvas.width / 5, state.canvas.width / 5);
	
	  var animeSqPanels = (0, _animejs2.default)({
	    targets: squares,
	    width: animeVals.endWidth,
	    duration: animeVals.duration,
	    delay: 0,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeSqPanels);
	};
	
	// –––––– square slide ––––––
	var squareSlide = exports.squareSlide = function squareSlide(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = 0;
	  var yVals = [state.canvas.height / 7, state.canvas.height * (2 / 7), state.canvas.height * (3 / 7), state.canvas.height * (4 / 7), state.canvas.height * (5 / 7)];
	
	  var rectangles = (0, _shapeCreation.createRectangles)(x, yVals, animeVals, state.canvas.width / 2, state.canvas.height / 12);
	
	  var animeSqSlide = (0, _animejs2.default)({
	    targets: rectangles,
	    x: function x(sq, idx) {
	      return state.canvas.width;
	    },
	    duration: animeVals.duration,
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeSqSlide);
	};
	
	// –––––– banana peel ––––––
	var bananaPeel = exports.bananaPeel = function bananaPeel(state, animeVals) {
	  resizeCanvas(state);
	
	  var x = state.canvas.width * (3 / 4);
	  var yVals = [state.canvas.height / 9, state.canvas.height * (2 / 9), state.canvas.height * (3 / 9), state.canvas.height * (4 / 9), state.canvas.height * (5 / 9), state.canvas.height * (6 / 9), state.canvas.height * (7 / 9), state.canvas.height * (7 / 9), state.canvas.height * (6 / 9), state.canvas.height * (5 / 9), state.canvas.height * (4 / 9), state.canvas.height * (3 / 9), state.canvas.height * (2 / 9), state.canvas.height / 9];
	
	  var rectangles = (0, _shapeCreation.createRectangles)(x, yVals, animeVals, state.canvas.height / 10, state.canvas.height / 10);
	
	  var animeBanana = (0, _animejs2.default)({
	    targets: rectangles,
	    x: function x(sq, idx) {
	      return state.canvas.width * (1 / 15);
	    },
	    width: animeVals.endWidth,
	    duration: animeVals.duration,
	    delay: function delay(el, index) {
	      return index * 50;
	    },
	    easing: animeVals.easing,
	    complete: clearAnimation(state)
	  });
	
	  state.animations.push(animeBanana);
	};

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map