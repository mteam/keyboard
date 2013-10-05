var events = require('events');
var event = require('event');
var bind = require('bind');

// --- setup ---

function Keyboard() {
  events.extend(this);
  this.pressed = {};

  this.press = bind(this, 'press');
  this.release = bind(this, 'release');
}

Keyboard.prototype.attach = function() {
  event.bind(window, 'keydown', this.press);
  event.bind(window, 'keyup', this.release);
};

Keyboard.prototype.detach = function() {
  event.unbind(window, 'keydown', this.press);
  event.unbind(window, 'keyup', this.release);
};

// --- events handling ---

Keyboard.prototype.press = function(event) {
  var code = event.keyCode;
  var key = names[code] || code;

  if (!this.pressed[key]) {
    this.pressed[key] = true;
    this.trigger('pressed', key, code);
    this.trigger('pressed:' + key);
  }
};

Keyboard.prototype.release = function(event) {
  var code = event.keyCode;
  var key = names[code] || code;

  if (this.pressed[key]) {
    this.pressed[key] = false;
    this.trigger('released', key, code);
    this.trigger('released:' + key);
  }
};

// ---

Keyboard.prototype.isDown = function(key) {
  return !!this.pressed[key];
};

// --- key names ---

var names = {
  8: 'backspace',     37: 'left',       186: ';',
  9: 'tab',           38: 'up',         187: '=',
  13: 'return',       39: 'right',      188: ',',
  16: 'shift',        40: 'down',       189: '-',
  17: 'ctrl',         45: 'insert',     190: '.',
  18: 'alt',          46: 'delete',     191: '/',
  20: 'capslock',     91: 'meta',       192: '`',
  27: 'esc',          93: 'menu',       219: '[',
  32: 'space',        106: 'kp*',       220: '\\',
  33: 'pageup',       107: 'kp+',       221: ']',
  34: 'pagedown',     109: 'kp-',       222: '\'',
  35: 'end',          110: 'kp.',
  36: 'home',         111: 'kp/'
};

// a-z
var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
for (var i = 0; i < letters.length; i++) {
  names[i + 65] = letters[i];
}

// numbers
for (var j = 0; j <= 9; j++) {
  names[j + 48] = '' + j;
  names[j + 96] = 'kp' + j;
}

// fn keys
for (var k = 0; k <= 12; k++) {
  names[k + 111] = 'f' + k;
}

module.exports = Keyboard;
