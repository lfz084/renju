/*
class Node {
    constructor(uint32) {
        this.uint32 = uint32;
        this.ptr = 0;
    }
    get parent() {
        return this.uint32[this.ptr + 0];
    }
    get left() {
        return this.uint32[this.ptr + 1];
    }
    get right() {
        return this.uint32[this.ptr + 2];
    }
    get value() {
        return this.uint32[this.ptr + 3];
    }
    get balanceFactor() {
        return this.uint32[this.ptr + 4];
    }
    set ptr(index) {
        this.ptr = index;
    }
    set parent(ptr) {
        this.uint32[this.ptr + 0] = ptr;
    }
    set left(ptr) {
        this.uint32[this.ptr + 1] = ptr;
    }
    set right(ptr) {
        this.uint32[this.ptr + 2] = ptr;
    }
    set value(value) {
        this.uint32[this.ptr + 3] = value;
    }
    set balanceFactor(v) {
        this.uint32[this.ptr + 4] = v;
    }

}
*/

self.AVL = function() {
    const nodeSize = 5; // 20bytes / 4 = 5;
    const nodeBytes = 4 * nodeSize;

    let dataBuffer_uint8;
    let avlBuffer_uint32;
    let avlBuffer_uint32_End;
    let root = nodeSize;
    let lastNode = root;
    let size = 0;
    let height = 0;

    function init(_avlBuffer_uint32, _dataBuffer_uint8) {
        avlBuffer_uint32 = _avlBuffer_uint32;
        dataBuffer_uint8 = _dataBuffer_uint8;
        avlBuffer_uint32_End = avlBuffer_uint32.length - nodeSize + 1;
        root = nodeSize;
        lastNode = root;
        size = 0;
        height = 0;
    }

    function nextNewNode() {
        lastNode += nodeSize;
        if (lastNode < avlBuffer_uint32_End) return lastNode;
        else return -1;
        //throw new Error(`Out of AVL buffer `);
    }

    function nodeParent(ptr) {
        return avlBuffer_uint32[ptr + 0];
    }

    function nodeLeft(ptr) {
        return avlBuffer_uint32[ptr + 1];
    }

    function nodeRight(ptr) {
        return avlBuffer_uint32[ptr + 2];
    }

    function nodeValue(ptr) {
        return avlBuffer_uint32[ptr + 3];
    }

    function nodeBalanceFactor(ptr) {
        const b = avlBuffer_uint32[ptr + 4];
        const rt = (0x80000000 > b) ? b : b - 0x100000000;
        return rt;
    }

    function setParent(ptr, parentPtr) {
        avlBuffer_uint32[ptr + 0] = parentPtr;
    }

    function setLeft(ptr, leftPtr) {
        avlBuffer_uint32[ptr + 1] = leftPtr;
    }

    function setRight(ptr, rightPtr) {
        avlBuffer_uint32[ptr + 2] = rightPtr;
    }

    function setValue(ptr, value) {
        avlBuffer_uint32[ptr + 3] = value;
    }

    function setBalanceFactor(ptr, balanceFactor) {
        const b = balanceFactor < 0 ? 0x100000000 + balanceFactor : balanceFactor;
        avlBuffer_uint32[ptr + 4] = b;
    }


    let compare = function(l, r) { return l - r };

    let get = function(key) {
        let node = root;
        let cmp = 0;
        while (node) {
            cmp = compare(key, nodeValue(node));
            if (cmp === 0) {
                return nodeValue(node);
            }
            else if (cmp < 0) node = nodeLeft(node);
            else node = nodeRight(node);
        }
        return -1;
    };

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

    function insert(key) {
        if (root == nodeSize && !nodeValue(root)) {
            setValue(root, key);
            size = 1;
            height = 1;
            return root;
        }
    
        let node = root;
        let parent = 0;
        let cmp = 0;
        let _height = 0;
    
        while (node) {
            cmp = compare(key, nodeValue(node));
            parent = node;
            _height++;
            if (cmp === 0) {
                setValue(node, key);
                return node;
            }
            else if (cmp < 0) {
                node = nodeLeft(node);
            }
            else {
                node = nodeRight(node);
            }
        }
    
        const newNode = nextNewNode();
        if (newNode == -1) return newNode;
        setParent(newNode, parent);
        setValue(newNode, key);
        size++;
        if (height < _height) height++;
    
        let newRoot;
        if (cmp < 0) {
            setLeft(parent, newNode);
        }
        else {
            setRight(parent, newNode);
        }
    
        while (parent) {
            cmp = compare(nodeValue(parent), key);
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
    
        return newNode;
    }

    function map(callback) {
        const stack = [];
        let node = root;
        let dir = 1; // 1 left， -1 right
        let height = 0;

        while (node) {
            if (dir == 1) {
                const left = nodeLeft(node);
                if (left) {
                    stack.push({ node: node, right: 1 });
                    node = left;
                    dir = 1;
                }
                else dir = -1;
            }
            else {
                const right = nodeRight(node);
                if (right) {
                    stack.push({ node: node, right: 0 });
                    node = right;
                    dir = 1;
                }
                else {
                    callback(node);
                    node = undefined;
                    height = Math.max(stack.length + 1, height);
                    while (stack.length) {
                        const back = stack.pop();
                        if (back.right) {
                            node = back.node;
                            dir = -1;
                            break;
                        }
                        else callback(back.node);
                    }
                }
            }
        }
        return height;
    }

    function minNode() {
        let node = root;
        while (true) {
            const leftNode = nodeLeft(node);
            if (leftNode) node = leftNode;
            else return node;
        }
    }

    function mMaxNode() {
        let node = root;
        while (true) {
            const rightNode = nodeRight(node);
            if (rightNode) node = rightNode;
            else return node;
        }
    }

    function test(numMaxNodes = 0xFF) {
        let outStr = "";
        const array = [];
        for (let i = 0; i < numMaxNodes; i++) array.push(i + 1);
        for (let i = 0; i < 0x8F; i++) {
            const outArr = [];
            const testArray = array.slice(0);
            const u8 = new Uint8Array(0);
            const u32 = new Uint32Array((numMaxNodes + 1) * nodeSize);
            init(u32, u8);
            while (testArray.length) {
                const idxRandom = Math.floor(Math.random() * testArray.length);
                const key = testArray.splice(idxRandom, 1) * 1;
                insert(key);
                outArr.push(key);
            }
            outStr += `[${outArr}] <br>\n`;
            array.map(key => {
                key != get(key) && (outStr += `key: ${key} != get: ${get(key)} <br>\n`);
            })
            outStr += `size: ${size}, height: ${height} <br>\n`;
        }
        return outStr;
    }

    return {
        get root() { return root; },
        get size() { return size; },
        get height() { return height; },
        get getMinNode() { return minNode },
        get getMaxNode() { return maxNode },

        get nodeSize() { return nodeSize; },
        get nodeBytes() { return nodeBytes; },
        get nodeParent() { return nodeParent; },
        get nodeLeft() { return nodeLeft; },
        get nodeRight() { return nodeRight; },
        get nodeValue() { return nodeValue; },
        get nodeBalanceFactor() { return nodeBalanceFactor; },

        get init() { return init; },
        get insert() { return insert; },
        get map() { return map; },
        get get() { return get; },
        get set() { return insert; },
        get test() { return test; },

        set compare(f) { typeof f == "function" && (compare = f); },
        set get(f) { typeof f == "function" && (get = f); }
    }
}()
