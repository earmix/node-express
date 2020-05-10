/**
 * Broadcast updates to client when the model changes
 */

const UserEvents = require('./events');

// Model events to emit
const events = ['save', 'remove', 'updateOne'];

const createListener = (event, socket) => {
  return (doc) => socket.emit(event, doc);
}

const removeListener = (event, listener) => {
  return () => UserEvents.removeListener(event, listener);
}

exports.register = (socket) => {
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    let event = events[i];
    let listener = createListener(`user:${event}`, socket);

    UserEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}