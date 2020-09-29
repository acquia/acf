/**
 * Library for managing ACF events. Mimics the EventEmitter in NodeJS.
 */

class acfEventEmitter {

  /**
   * Create the list to hold the events.
   */
  constructor() {
    this.events = {};
  }

  /**
   * Add a listener to the object.
   *
   * @param {string} eventName 
   * @param {*} fn 
   */
  on(eventName, fn) {
    this._getEventListByName(eventName).add(fn);
  }

  /**
   * Trigger the functions registered for the event.
   *
   * @param {string} eventName 
   * @param  {...any} args 
   */
  emit(eventName, ...args) {
    this._getEventListByName(eventName).forEach(function (fn) {
      fn.apply(this, args);
    }.bind(this));
  }

  /**
   * Remove a listener from the event.
   *
   * @param {string} eventName 
   * @param {*} fn 
   */
  removeListener(eventName, fn) {
    this._getEventListByName(eventName).delete(fn);
  }

  /**
   * Add a one time listener and remove the function from the list after it runs
   *
   * @param {string} eventName 
   * @param {*} fn 
   */
  once(eventName, fn) {
    const self = this;
    const onceFn = function (...args) {
      fn.apply(self, args);
      self.removeListener(eventName, onceFn);
    };
    this.on(eventName, onceFn);
  }

  /**
   * Count how many listeners are assigned to a particular event.
   *
   * @param {string} eventName 
   */
  listenerCount(eventName) {
    return this._getEventListByName(eventName).length;
  }

  /**
   * Return a list of the listener functions associated with an event.
   *
   * @param {string} eventName 
   */
  getListeners(eventName) {
    return this.events[eventName];
  }

  /**
   * Helper -  Retrieve the event & create if it doesn't exist.
   * @param {strong} eventName 
   */
  _getEventListByName(eventName) {
    if (typeof this.events[eventName] === 'undefined') {
      this.events[eventName] = new Set();
    }
    return this.events[eventName]
  }

}