"use strict";

self.HashTable = function() {
    const TABLE_SIZE = 1 << 24;
    const NODE_SIZE = 2;
    const NODE_BYTES = NODE_SIZE * 4;
    let size = 0;
    let lastNode = 0;
    let nodeEnd = 0;
    let table;
    let dataBuffer_uint8;
    let nodeBuffer_uint32;

    function nextNewNode() {
        size++;
        lastNode += NODE_SIZE;
        if (lastNode < nodeEnd) return lastNode;
        else return -1;
        //throw new Error(`Out of HashTable buffer size: ${size}`);
    }

    function nodeValue(ptr) {
        return nodeBuffer_uint32[ptr];
    }

    function nodeNext(ptr) {
        return nodeBuffer_uint32[ptr + 1];
    }

    function setValue(ptr, value) {
        return nodeBuffer_uint32[ptr] = value;
    }

    function setNext(ptr, next) {
        return nodeBuffer_uint32[ptr + 1] = next;
    }

    let toHash = function toHash(key) {

    };

    let toKey = function toKey(value) {

    };

    let compare = function compare(l, r) {
        return l - r;
    };

    function init(buffer_uint32, buffer_uint8) {
        size = 0;
        lastNode = 0;
        nodeEnd = buffer_uint32.length - NODE_SIZE + 1;
        table = new Uint32Array(TABLE_SIZE * NODE_SIZE);
        dataBuffer_uint8 = buffer_uint8;
        nodeBuffer_uint32 = buffer_uint32;
    }

    function get(key) {
        const ptr = toHash(key) * NODE_SIZE;
        let node = table[ptr];
        while (node) {
            const key2 = toKey(nodeValue(node));
            if (0 === compare(key, key2)) return nodeValue(node);
            node = nodeNext(node);
        }
        return -1;
    }

    function set(key, value) {
        const ptr = toHash(key) * NODE_SIZE;
        const first = table[ptr];
        const newNode = nextNewNode();
        if (newNode == -1) return newNode;
        setValue(newNode, value);
        setNext(newNode, first);
        table[ptr] = newNode;
        table[ptr + 1]++;
        return newNode;
    }

    function getMaxLength() {
        let maxLen = 0;
        let count8 = 0;
        let count300 = 0;
        let count500 = 0;
        for (let ptr = table.length - NODE_SIZE; ptr >= 0; ptr -= NODE_SIZE) {
            let len = table[ptr + 1];
            if (len > 8) count8++;
            if (len > 309) count300++;
            if (len > 1000) count500++;
            if (len > maxLen) maxLen = len;
        }
        return [maxLen, count500, count300, count8];
    }

    return {
        get init() { return init; },
        get get() { return get; },
        get set() { return set; },
        get getMaxLength() { return getMaxLength; },
        get nodeBytes() { return NODE_BYTES; },
        get tableSize() { return TABLE_SIZE; },
        get size() { return size; },

        set toHash(f) { typeof f == "function" && (toHash = f); },
        set toKey(f) { typeof f == "function" && (toKey = f); },
        set compare(f) { typeof f == "function" && (compare = f); }
    };
}()
