const chai = require('chai');
const assert = chai.assert;

const Node = require('../src/node');
const NoSuchElement = require('../src/exceptions/nosuchelement');

describe('Node Datatype', function() {
    describe('Create new Nodes.', function() {
        it('A Node can be created with a value', function() {
            let node = new Node('value');

            assert.isNotNull(node, 'A new Node should be instantiated');
        });

        it('A node with no value cannot be created', function() {
            assert.throws(function() { new Node() }, TypeError, 'value cannot be undefined.', 'Error thrown must be a TypeError and have this msg.');
        });
    });

    describe('Add connections to adjacency list.', function() {
        var node1;
        var node2
        beforeEach(function() {
            node1 = new Node(1);
            node2 = new Node(2);
        });

        it('Add a one-way connection from node1 to node2.', function() {
            node1.addAdjacent(node2);

            assert.isTrue(node1.adjacents.has(node2), 'node1 should contain node 2 in it\'s adjacency list.');
            assert.isFalse(node2.adjacents.has(node1), 'node2 should NOT contain node1 in it\'s adjacency list.');
        });

        it('Add a connection to an object that is not Node', function() {
            badObject = {
                id: 3
            };

            assert.throws(function() { node1.addAdjacent(badObject) }, TypeError, `${badObject.constructor.name} does not match type ${node1.constructor.name}.`, 'Error thrown must be a TypeError and have this msg.');
        });
    });

    describe('Remove connections from adjacency list.', function() {
        beforeEach(function() {
            node1 = new Node(1);
            node2 = new Node(2);
        });

        it('Remove one connection from node\'s adjacency list, making the adjacency list of the node empty.', function() {
            node1.addAdjacent(node2);
            node1.removeAdjacent(node2);

            assert.isFalse(node1.adjacents.has(node2), 'node2 should be removed from adjacency list of node1.');
        });

        it('Remove one connection from node with many connections.', function() {
            node3 = new Node(3);
            node1.addAdjacent(node2);
            node1.addAdjacent(node3);
            node1.removeAdjacent(node2);

            assert.isFalse(node1.adjacents.has(node2), 'node2 should be removed from adjacency list of node1.');
            assert.isTrue(node1.adjacents.has(node3), 'Removing a connection should only remove the targeted connection.');
        });

        it('Remove a non-existant connection.', function() {
            assert.throws(function() { node1.removeAdjacent(node2) }, NoSuchElement, 'non-existant connection.', 'Error thrown must be a NoSuchElement and have this mesg.');
        })
    });

    describe('Get list of connections.', function() {
        beforeEach(function() {
            node1 = new Node(1);
            node2 = new Node(2);
        });
        it('Get list of connections from node with connection(s).', function() {
            node1.addAdjacent(node2);

            let expected = new Map();
            expected.set(node2);

            assert.deepEqual(node1.getAdjacents(), expected, 'Should return a Map with only node2.');
        });

        it('Get list of connections from node with no connections.', function() {
            assert.deepEqual(node1.getAdjacents(), new Map(), 'Should return an empty Map.')
        });
    });

    describe('Check if a connection exists.', function() {
        beforeEach(function() {
            node1 = new Node(1);
            node2 = new Node(2);
        });

        it('Returns true if a existing connection is requested.', function() {
            node1.addAdjacent(node2);

            assert.isTrue(node1.isAdjacent(node2));
        });

        it('Returns false if a non-existing connection is requested', function() {
            assert.isFalse(node1.isAdjacent(node2));
        });
    });
});