const listeners = {};

const Event = {
  on: (event, listener) => {
    if (listeners[event]) {
      listeners[event].push(listener);
    } else {
      listeners[event] = [];
      listeners[event].push(listener);
    }
  },

  trigger: (event, params) => {
    if (listeners[event] && listeners[event].length > 0) {
      listeners[event].forEach(listener => listener(params));
    } else {
      throw Error('dit not register event');
    }
  },

  off: event => {
    if (listeners[event] && listeners[event].length > 0) {
      listeners[event] = [];
    } else {
      throw Error('dit not register event');
    }
  },
};

Event.on('dispatch', function(o) {
  console.log(o);
});
Event.trigger('dispatch', { foo: 'foo' });
Event.off('dispatch');
