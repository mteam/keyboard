var expect = require('expect.js'),
    sham = require('sham'),
    Keyboard = require('./index');

describe('Keyboard', function() {
  var events = {
    p: { keyCode: 80 },
    7: { keyCode: 55 },
    kp6: { keyCode: 102 },
    f7: { keyCode: 118 },
    down: { keyCode: 40 },
    esc: { keyCode: 27 }
  };

  it('should trigger events', function() {
    var keyboard = new Keyboard;

    var pressed = sham.spy().called(),
        released = sham.spy().called();

    keyboard.on('pressed', pressed);
    keyboard.on('released', released);

    keyboard.down(events.p);
    keyboard.up(events.p);

    pressed.check();
    released.check();
  });

  it('should give correct key name', function() {
    var keyboard = new Keyboard;

    var pressed = sham.spy();
    keyboard.on('pressed', pressed);

    for (var name in events) {
      pressed.args(name);
      keyboard.down(events[name]);
    }
  });

  it('should remember whether key is pressed', function() {
    var keyboard = new Keyboard;

    expect(keyboard.isDown('p')).to.be(false);
    keyboard.down(events.p);
    expect(keyboard.isDown('p')).to.be(true);
    keyboard.up(events.p);
    expect(keyboard.isDown('p')).to.be(false);
  });
});
