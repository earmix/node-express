/**
 * Information model events
 */

const { EventEmitter } = require('events');
const UserEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
UserEvents.setMaxListeners(0);

// Model events
const events = {
  save: 'save',
  remove: 'remove',
  updateOne: 'updateOne'
};

const emitEvent = (event) => {
  return (doc) => {
    UserEvents.emit(event + ':' + doc._id, doc);
    UserEvents.emit(event, doc);
  };
}

// Register the event emitter to the model events
const registerEvents = (User) => {
  for (let e in events) {
    let event = events[e];
    User.post(e, emitEvent(event));
  }
}

module.exports = UserEvents;
module.exports.registerEvents = registerEvents;
// export { registerEvents };
// export default UserEvents;