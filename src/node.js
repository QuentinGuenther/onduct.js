const NoSuchElement = require('./exceptions/nosuchelement');

/**
 * This class holds the vertex's value and it's adjacent verticies.
 *
 * @class
 * @author Quentin Guenther <qguenther@outlook.com>
 * @copyright Quentin Guenther 2018
 */
class Node {
    /**
     * Instantiate a new vertex.
     *
     * @constructor
     * @param {*} value The value which is held in the vertex. This value can be a perimative or an object.
     * @throws {TypeError} Argument value must not be undefined.
     */
    constructor(value) {
        if(typeof value !== 'undefined') {
            this.value = value;
            this.adjacents = new Map(); // adjacency list
        } else {
            throw new TypeError('value cannot be undefined.');
        }
    }

    /**
     * Create a one-way connection from this Node to another Node. Each node can have a one-way connection going both directions.
     *
     * @param {Node} node The node to add a connection with.
     * @throws {TypeError} Argument node must be instanceof Node.
     */
    addAdjacent(node) {
        if(node instanceof Node) {
            this.adjacents.set(node);
        } else {
            throw new TypeError(`${node.constructor.name} does not match type ${this.constructor.name}.`);
        }
    }

    /**
     * Remove a one-way connection from this to another node. If the two nodes are strongly-connected, only the connection from this to other will be removed.
     *
     * @param {Node} node The node to remove the connection with.
     * @throws {NoSuchElement} Argument node must exist in this node's adjacency list as a connection.
     */
    removeAdjacent(node) {
        if(this.isAdjacent(node)) {
            this.adjacents.delete(node);
        } else {
            throw new NoSuchElement(`non-existant connection.`);
        }
    }

    /**
     * Get the ajacency list of this Node represented by a map.
     *
     * @returns {Map} Adjacency list of this.
     */
    getAdjacents() {
        return this.adjacents;
    }

    /**
     * Returns true if adjacency list contains the specified Node.
     *
     * @param {Node} node Node whose presence in this adjacency list is to be tested.
     * @returns {boolean} If specified node exists in this adjacency list.
     */
    isAdjacent(node) {
        return this.adjacents.has(node);
    }
}

/**
 * A module that is a Node datatype.
 * @module Node
 */
module.exports = Node;