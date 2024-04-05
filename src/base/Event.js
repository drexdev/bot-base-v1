const { ClientEvents } = require("discord.js");

/**
 * @template {keyof ClientEvents} Key
 * @typedef {Object} EventData
 * @property {Key} name
 * @property {boolean} [once]
 * @property {(...args: ClientEvents[Key]) => void} execute
 */

/**
 * @template {keyof ClientEvents} Key
 * @class
 * @classdesc Representa um evento.
 */
module.exports = class Event {
    /**
     * @template {keyof ClientEvents} Key
     * @type {Array<EventData<Key>>}
     */
    static all = [];

    /**
     * @param {EventData<Key>} data
     */
    constructor(data) {
        Event.all.push(data);
    }
}
