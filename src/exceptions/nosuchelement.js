/**
 * This class is an error to be thrown when a required element does not exist within a list.
 *
 * @class
 * @author Quentin Guenther <qguenther@outlook.com>
 * @copyright Quentin Guenther 2018
 */
class NoSuchElement extends Error {
    /**
     * Instantiate NoSuchElement Error.
     *
     * @constructor
     * @param {*} params params to be passed to the Error super constructor
     */
    constructor(...params) {
        super(...params);

        this.name = this.constructor.name;

        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NoSuchElement);
        }
    }
}

/**
 * A module that is a NoSuchElement exception.
 *
 * @module exceptions/NoSuchElement
 */
module.exports = NoSuchElement;