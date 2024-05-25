"use strict";
self.HashTable = function() {
    const NUM_LINKTOAVL = 4096;
    const TABLE_SIZE = 1 << 24;
    const TABLE_NODE_SIZE = 2;
    const LINK_NODE_SIZE = 2;
    const AVL_NODE_SIZE = 5;
    const TABLE_NODE_BYTES = TABLE_NODE_SIZE * 4;
    const AVL_NODE_BYTES = AVL_NODE_SIZE * 4;
    let size = 0;
    let lastNode = 0;
    let nodeEnd = 0;
    let table;
    let dataBuffer_uint8;
    let nodeBuffer_uint32;

    function nextNewNode(nodeSize) {
        size++;
        lastNode += nodeSize;
        if (lastNode < nodeEnd) return lastNode;
        else return -1;
        //throw new Error(`Out of HashTable buffer size: ${size}`);
    }

    //----------------- link node ----------------------

    function linkNodeValue(ptr) {
        return nodeBuffer_uint32[ptr];
    }

    function linkNodeNext(ptr) {
        return nodeBuffer_uint32[ptr + 1];
    }

    function setLinkValue(ptr, value) {
        return nodeBuffer_uint32[ptr] = value;
    }

    function setLinkNext(ptr, next) {
        return nodeBuffer_uint32[ptr + 1] = next;
    }

    function get_link(ptr, key) {
        let node = table[ptr];
        while (node) {
            const key2 = toKey(linkNodeValue(node));
            if (0 === compare(key, key2)) return linkNodeValue(node);
            node = linkNodeNext(node);
        }
        return -1;
    }

    function set_link(ptr, value) {
        const first = table[ptr];
        const newNode = nextNewNode(LINK_NODE_SIZE);
        if (newNode == -1) return newNode;
        setLinkValue(newNode, value);
        setLinkNext(newNode, first);
        table[ptr] = newNode;
        table[ptr + 1]++;
        return newNode;
    }

    //------------------ AVL NODE --------------------------

    function nodeParent(ptr) {
        return nodeBuffer_uint32[ptr + 0];
    }

    function nodeLeft(ptr) {
        return nodeBuffer_uint32[ptr + 1];
    }

    function nodeRight(ptr) {
        return nodeBuffer_uint32[ptr + 2];
    }

    function nodeValue(ptr) {
        return nodeBuffer_uint32[ptr + 3];
    }

    function nodeBalanceFactor(ptr) {
        const b = nodeBuffer_uint32[ptr + 4];
        const rt = (0x80000000 > b) ? b : b - 0x100000000;
        return rt;
    }

    function setParent(ptr, parentPtr) {
        nodeBuffer_uint32[ptr + 0] = parentPtr;
    }

    function setLeft(ptr, leftPtr) {
        nodeBuffer_uint32[ptr + 1] = leftPtr;
    }

    function setRight(ptr, rightPtr) {
        nodeBuffer_uint32[ptr + 2] = rightPtr;
    }

    function setValue(ptr, value) {
        nodeBuffer_uint32[ptr + 3] = value;
    }

    function setBalanceFactor(ptr, balanceFactor) {
        const b = balanceFactor < 0 ? 0x100000000 + balanceFactor : balanceFactor;
        nodeBuffer_uint32[ptr + 4] = b;
    }

    function rotateLeft(node) {
        const rightNode = nodeRight(node);
        const rightNode_Left = nodeLeft(rightNode);
        setRight(node, rightNode_Left);
        if (rightNode_Left) setParent(rightNode_Left, node);
        setParent(rightNode, nodeParent(node));
        const rightNode_Parent = nodeParent(rightNode);
        if (rightNode_Parent) {
            if (nodeLeft(rightNode_Parent) === node) {
                setLeft(rightNode_Parent, rightNode);
            } else {
                setRight(rightNode_Parent, rightNode);
            }
        }

        setParent(node, rightNode);
        setLeft(rightNode, node);

        setBalanceFactor(node, nodeBalanceFactor(node) + 1);
        const rightNode_BalanceFactor = nodeBalanceFactor(rightNode);
        if (rightNode_BalanceFactor < 0) {
            setBalanceFactor(node, nodeBalanceFactor(node) - rightNode_BalanceFactor);
        }

        setBalanceFactor(rightNode, nodeBalanceFactor(rightNode) + 1);
        const node_BalanceFactor = nodeBalanceFactor(node);
        if (node_BalanceFactor > 0) {
            setBalanceFactor(rightNode, nodeBalanceFactor(rightNode) + node_BalanceFactor);
        }
        return rightNode;
    }

    function rotateRight(node) {
        const leftNode = nodeLeft(node);
        const leftNode_Right = nodeRight(leftNode);
        setLeft(node, leftNode_Right);
        if (leftNode_Right) setParent(leftNode_Right, node);
        setParent(leftNode, nodeParent(node));
        const leftNode_Parent = nodeParent(leftNode);
        if (leftNode_Parent) {
            if (nodeLeft(leftNode_Parent) === node) {
                setLeft(leftNode_Parent, leftNode);
            } else {
                setRight(leftNode_Parent, leftNode);
            }
        }

        setParent(node, leftNode);
        setRight(leftNode, node);

        setBalanceFactor(node, nodeBalanceFactor(node) - 1);
        const leftNode_BalanceFactor = nodeBalanceFactor(leftNode);
        if (leftNode_BalanceFactor > 0) {
            setBalanceFactor(node, nodeBalanceFactor(node) - leftNode_BalanceFactor);
        }

        setBalanceFactor(leftNode, nodeBalanceFactor(leftNode) - 1);
        const node_BalanceFactor = nodeBalanceFactor(node);
        if (node_BalanceFactor < 0) {
            setBalanceFactor(leftNode, nodeBalanceFactor(leftNode) + node_BalanceFactor);
        }
        return leftNode;
    }

    function insert(root, key, value) {
        if (!nodeValue(root)) {
            setValue(root, value);
            return root;
        }

        let node = root;
        let parent = 0;
        let cmp = 0;

        while (node) {
            cmp = compare(key, toKey(nodeValue(node)));
            parent = node;
            if (cmp === 0) {
                setValue(node, value);
                return root;
            }
            else if (cmp < 0) {
                node = nodeLeft(node);
            }
            else {
                node = nodeRight(node);
            }
        }

        const newNode = nextNewNode(AVL_NODE_SIZE);
        if (newNode == -1) return newNode;
        setParent(newNode, parent);
        setValue(newNode, value);

        let newRoot;
        if (cmp < 0) {
            setLeft(parent, newNode);
        }
        else {
            setRight(parent, newNode);
        }
        
        while (parent) {
            cmp = compare(toKey(nodeValue(parent)), key);
            if (cmp < 0) {
                setBalanceFactor(parent, nodeBalanceFactor(parent) - 1);
            }
            else {
                setBalanceFactor(parent, nodeBalanceFactor(parent) + 1);
            }

            const parentBalanceFactor = nodeBalanceFactor(parent);
            if (parentBalanceFactor === 0) break;
            else if (parentBalanceFactor < -1) {
                // inlined
                //var newRoot = rightBalance(parent);
                const parent_Right = nodeRight(parent);
                if (nodeBalanceFactor(parent_Right) === 1) rotateRight(parent_Right);
                newRoot = rotateLeft(parent);

                if (parent === root) root = newRoot;
                break;
            } else if (parentBalanceFactor > 1) {
                // inlined
                // var newRoot = leftBalance(parent);
                const parent_Left = nodeLeft(parent);
                if (nodeBalanceFactor(parent_Left) === -1) rotateLeft(parent_Left);
                newRoot = rotateRight(parent);

                if (parent === root) root = newRoot;
                break;
            }
            parent = nodeParent(parent);
        }
        
        return root;
    }

    function find(root, key) {
        let node = root;
        let cmp = 0;
        while (node) {
            cmp = compare(key, toKey(nodeValue(node)));
            if (cmp === 0) {
                return nodeValue(node);
            }
            else if (cmp < 0) node = nodeLeft(node);
            else node = nodeRight(node);
        }
        return -1;
    };

    //------------------- HashMap -----------------------

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
        nodeEnd = buffer_uint32.length - AVL_NODE_SIZE + 1;
        table = new Uint32Array(TABLE_SIZE * TABLE_NODE_SIZE);
        dataBuffer_uint8 = buffer_uint8;
        nodeBuffer_uint32 = buffer_uint32;
    }

    function get(key) {
        const ptr = toHash(key) * TABLE_NODE_SIZE;
        if (table[ptr + 1] > NUM_LINKTOAVL) {
            return find(table[ptr], key);
        }
        else {
            return get_link(ptr, key);
        }
    }

    function set(key, value) {
        const ptr = toHash(key) * TABLE_NODE_SIZE;
        if (table[ptr + 1] == NUM_LINKTOAVL) {
            table[ptr + 1]++;
            let node = table[ptr];
            let newRoot = nextNewNode(AVL_NODE_SIZE);
            if (newRoot > -1) table[ptr] = newRoot;
            while (node) {
                newRoot = insert(table[ptr], key, linkNodeValue(node))
                if (newRoot > -1) table[ptr] = newRoot;
                else return -1;
                node = linkNodeNext(node);
            }
        }

        if (table[ptr + 1] > NUM_LINKTOAVL) {
            const newRoot = insert(table[ptr], key, value);
            if (newRoot > -1) table[ptr] = newRoot;
            return newRoot;
        }
        else {
            return set_link(ptr, value);
        }
    }

    function getMaxLength() {
        let maxLen = 0;
        let count8 = 0;
        let count300 = 0;
        let count500 = 0;
        for (let ptr = table.length - TABLE_NODE_SIZE; ptr >= 0; ptr -= TABLE_NODE_SIZE) {
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
        get tableNodeBytes() { return TABLE_NODE_BYTES; },
        get avlNodeBytes() { return AVL_NODE_BYTES; },
        get tableSize() { return TABLE_SIZE; },
        get size() { return size; },

        set toHash(f) { typeof f == "function" && (toHash = f); },
        set toKey(f) { typeof f == "function" && (toKey = f); },
        set compare(f) { typeof f == "function" && (compare = f); }
    };
}()
