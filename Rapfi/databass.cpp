
typedef unsigned char BYTE;
typedef unsigned int UINT;
typedef long long LLNG; 
typedef unsigned short DWORD;

/// Color represents the type of piece on board
enum Color : BYTE {
    BLACK,
    WHITE,
    WALL,
    EMPTY,
    COLOR_NB,     // Total number of color on board
    SIDE_NB = 2,  // Two side of stones (Black and White)
};


extern void outputArray(int* ptr);
extern void outputParam(UINT p1, UINT p2, UINT p3, UINT p4, UINT p5);
extern void outputKey(BYTE* ptr, UINT len);
extern void outputProgress(double progress);
extern void lz4Callback(UINT idx);
extern void onError(char* message);

LLNG tempLL[4] = {0};
BYTE INPUT[1024] = {0};
BYTE OUTPUT[1024] = {0};

//-------------------- IO ------------------------------

BYTE* input() {
    return INPUT;
}

BYTE* output() {{
    return OUTPUT;
}}

//-------------------- xxhash32 ------------------------

// Simple hash function, from: http://burtleburtle.net/bob/hash/integer.html.
// Chosen because it doesn't use multiply and achieves full avalanche.
int hashU32(int a) {
    a = a + 2127912214 + (a << 12);
    a = a ^ -949894596 ^ (UINT)a >> 19;
    a = a + 374761393 + (a << 5);
    a = a + -744332180 ^ a << 9;
    a = a + -42973499 + (a << 3);
    return a ^ -1252372727 ^ (UINT)a >> 16;
}

// Reads a 64-bit little-endian integer from an array.
LLNG readU64(BYTE* b, UINT n) {
    LLNG x = 0;
    x |= b[n++] << 0;
    x |= b[n++] << 8;
    x |= b[n++] << 16;
    x |= b[n++] << 24;
    x |= b[n++] << 32;
    x |= b[n++] << 40;
    x |= b[n++] << 48;
    x |= b[n++] << 56;
    return x;
}


// Reads a 32-bit little-endian integer from an array.
int readU32(BYTE* b, UINT n) {
    int x = 0;
    x |= b[n++] << 0;
    x |= b[n++] << 8;
    x |= b[n++] << 16;
    x |= b[n++] << 24;
    return x;
}

// Multiplies two numbers using 32-bit integer multiplication.
// Algorithm from Emscripten.
int imul(int a, int b) {
    LLNG ah = (UINT)a >> 16;
    LLNG al = a & 65535;
    LLNG bh = (UINT)b >> 16;
    LLNG bl = b & 65535;

    return al * bl + (ah * bl + al * bh << 16);
}

// xxh32.js - implementation of xxhash32 in plain JavaScript
    
// xxhash32 primes
UINT prime1 = 0x9e3779b1;
UINT prime2 = 0x85ebca77;
UINT prime3 = 0xc2b2ae3d;
UINT prime4 = 0x27d4eb2f;
UINT prime5 = 0x165667b1;

// Utility functions/primitives
// --

int rotl32(int x, int r) {
    return (UINT)x >> (int)(32 - r) | x << r | 0;
}

int rotmul32(int h, int r, int m) {
    return imul((UINT)h >> (int)(32 - r) | h << r, m) | 0;
}

int shiftxor32(int h, int s) {
    return (UINT)h >> s ^ h;
}

// Implementation
// --

int xxhapply(int h, int src, int m0, int s, int m1) {
    return rotmul32(imul(src, m0) + h, s, m1);
}

int xxh1(int h, BYTE* src, int index) {
    return rotmul32((h + imul(src[index], prime5)), 11, prime1);
}

int xxh4(int h, BYTE* src, int index) {
    return xxhapply(h, readU32(src, index), prime3, 17, prime4);
}

LLNG* xxh16(LLNG* h, BYTE* src, int index) {
    h[0] = xxhapply(h[0], readU32(src, index + 0), prime2, 13, prime1);
    h[1] = xxhapply(h[1], readU32(src, index + 4), prime2, 13, prime1);
    h[2] = xxhapply(h[2], readU32(src, index + 8), prime2, 13, prime1);
    h[3] = xxhapply(h[3], readU32(src, index + 12), prime2, 13, prime1);
    return h;
}

UINT xxh32(UINT seed, BYTE* src, UINT index, int len) {
    int h;
    int l;
    l = len;
    //outputKey(src, len);
    if (len >= 16) {
        LLNG* hp = tempLL;
        hp[0] = seed + prime1 + prime2;
        hp[1] = seed + prime2;
        hp[2] = seed;
        hp[3] = seed - prime1;
        //outputArray(hp);

        while (len >= 16) {
            hp = xxh16(hp, src, index);
            //outputArray(hp);
            index += 16;
            len -= 16;
        }

        h = rotl32(hp[0], 1) + rotl32(hp[1], 7) + rotl32(hp[2], 12) + rotl32(hp[3], 18) + l;
    } else {
        h = (UINT)(seed + prime5 + len);
    }

    while (len >= 4) {
        h = xxh4(h, src, index);

        index += 4;
        len -= 4;
    }

    while (len > 0) {
        h = xxh1(h, src, index);

        index++;
        len--;
    }

    h = shiftxor32(imul(shiftxor32(imul(shiftxor32(h, 15), prime2), 13), prime3), 16);

    return (UINT)h;
}

//---------------------- lz4 -----------------------------


// Compression format parameters/constants.
UINT minMatch = 4;
    
// Frame constants.
UINT magicNum = 0x184D2204;

// Frame descriptor flags.
UINT fdContentChksum = 0x4;
UINT fdContentSize = 0x8;
UINT fdBlockChksum = 0x10;

UINT fdVersion = 0x40;
UINT fdVersionMask = 0xC0;

// Block sizes.
UINT bsUncompressed = 0x80000000;
UINT bsShift = 4;
UINT bsMask = 7;
UINT bsMap[16] = {0,0,0,0,
    0x10000,
    0x40000,
    0x100000,
    0x400000
};
    
// Decompresses a block of Lz4.
UINT decompressBlock(BYTE* src, BYTE* dst, UINT sIndex, UINT sLength, UINT dIndex) {
    UINT mLength, mOffset, sEnd, n, i;
    
    // Setup initial state.
    sEnd = sIndex + sLength;

    // Consume entire input block.
    while (sIndex < sEnd) {
        UINT token = src[sIndex++];

        // Copy literals.
        UINT literalCount = (token >> 4);
        if (literalCount > 0) {
            // Parse length.
            if (literalCount == 0xf) {
                while (true) {
                    literalCount += src[sIndex];
                    if (src[sIndex++] != 0xff) {
                        break;
                    }
                }
            }

            // Copy literals
            for (n = sIndex + literalCount; sIndex < n;) {
                dst[dIndex++] = src[sIndex++];
            }
        }

        if (sIndex >= sEnd) {
            break;
        }

        // Copy match.
        mLength = (token & 0xf);

        // Parse offset.
        mOffset = src[sIndex++] | (src[sIndex++] << 8);

        // Parse length.
        if (mLength == 0xf) {
            while (true) {
                mLength += src[sIndex];
                if (src[sIndex++] != 0xff) {
                    break;
                }
            }
        }

        mLength += minMatch;
        // Copy match
        // prefer to use typedarray.copyWithin for larger matches
        // NOTE: copyWithin doesn't work as required by LZ4 for overlapping sequences
        // e.g. mOffset=1, mLength=30 (repeach char 30 times)
        // we special case the repeat char w/ array.fill
        if (mOffset == 1) {
            for(UINT idx = dIndex; idx < dIndex + mLength; idx++) {
                dst[idx] = dst[dIndex - 1];
            }
            dIndex += mLength;
        } else if (mOffset > mLength && mLength > 31) {
            for (UINT move = 0; move < mLength; move++) {
                dst[dIndex + move] = dst[dIndex - mOffset + move];
            }
            dIndex += mLength;
        } else {
            for (i = dIndex - mOffset, n = i + mLength; i < n;) {
                dst[dIndex++] = dst[i++];
            }
        }

    }

    return dIndex;
}


// Decompresses a frame of Lz4 data.
UINT decompressFrame(BYTE* src, UINT cLen, BYTE* dst, UINT dLen) {
    bool useBlockSum, useContentSum, useContentSize;
    UINT descriptor;
    UINT sIndex = 0;
    UINT dIndex = 0;
    UINT callIndex = 0;

    /*
    // Read magic number
    if (readU32(src, sIndex) != magicNum) {
        onError("invalid magic number");
        return 0;
    }
    */

    sIndex += 4;

    // Read descriptor
    descriptor = src[sIndex++];

    // Check version
    if ((descriptor & fdVersionMask) != fdVersion) {
        onError("incompatible descriptor version");
        return 0;
    }

    // Read flags
    useBlockSum = (descriptor & fdBlockChksum) != 0;
    useContentSum = (descriptor & fdContentChksum) != 0;
    useContentSize = (descriptor & fdContentSize) != 0;

    // Read block size
    UINT bsIdx = (src[sIndex++] >> bsShift) & bsMask;

    if (bsMap[bsIdx] == 0) {
        onError("invalid block size");
        return 0;
    }

    if (useContentSize) {
        // TODO: read content size
        sIndex += 8;
    }

    sIndex++;

    // Read blocks.
    while (true) {
        int compSize;

        compSize = readU32(src, sIndex);
        sIndex += 4;

        if (compSize == 0) {
            break;
        }

        if (useBlockSum) {
            // TODO: read block checksum
            sIndex += 4;
        }

        //outputParam(compSize, src[sIndex-4], src[sIndex-3], src[sIndex-2], src[sIndex-1]);
        // Check if block is compressed
        if ((compSize & bsUncompressed) != 0) {
            // Mask off the 'uncompressed' bit
            compSize &= ~bsUncompressed;

            //outputParam(sIndex, compSize, dIndex, 1, 1);
            // Copy uncompressed data into destination buffer.
            for (UINT j = 0; j < compSize; j++) {
                if (sIndex >= dLen) goto lineExit;
                dst[dIndex++] = src[sIndex++];
            }
        } else {
            //outputParam(sIndex, compSize, dIndex, 2, 2);
            // Decompress into blockBuf
            if((compSize + dIndex) > dLen) goto lineExit;
            dIndex = decompressBlock(src, dst, sIndex, compSize, dIndex);
            sIndex += compSize;
        }
        
        if ((dIndex >> 27) > callIndex) {
            callIndex++;
            lz4Callback(dIndex);
        }
        
    }
        
    lineExit:;

    if (useContentSum) {
        // TODO: read content checksum
        sIndex += 4;
    }

    return dIndex;
}



//---------------------- dbTypes ---------------------------


int compareStone(BYTE lx, BYTE ly, BYTE rx, BYTE ry) {
    return ((int)lx * 32 + ly) - ((int)rx * 32 + ry);
}

int compareStones(BYTE* lStones, BYTE* rStones, int numCompare, int sIndex) {
    for (int i = 0; i < numCompare; i += 2) {
        const int diff = compareStone(lStones[sIndex + i], lStones[sIndex + i + 1], rStones[sIndex + i], rStones[sIndex + i + 1]);
        if (diff == 0) continue;
        else return diff;
    }
    return 0;
}

/// The three-way comparator of two database key.
/// DBKey is sorted using an "ascending" lexicographical order, in the following:
///     1. rule
///     2. board width
///     3. board height
///     4. stone positions
///     5. side to move (black=0, white=1)
/// @return Negative if lhs < rhs; 0 if lhs > rhs; Positive if lhs > rhs.

int databaseKeyCompare(BYTE* lUint8, BYTE* rUint8) {
    
    int diff = lUint8[2] - rUint8[2]; //rule
    if (diff != 0) return diff;
    diff = lUint8[3] - rUint8[3]; //board width
    if (diff != 0) return diff;
    diff = lUint8[4] - rUint8[4]; //board height
    if (diff != 0) return diff;
    
    const int numBytesLhs = (lUint8[0] | lUint8[1] << 8) - 3;
    const int numBytesRhs = (rUint8[0] | rUint8[1] << 8) - 3;
    if (numBytesLhs != numBytesRhs) return numBytesLhs - numBytesRhs;
    diff = compareStones(lUint8, rUint8, numBytesLhs, 5);
    if (diff != 0) return diff;

    
    const int numBlackStonesL = ((numBytesLhs >> 1) + 1) >> 1;
    const int numWhiteStonesL = numBytesLhs >> 2;
    const Color sideToMoveL = numBlackStonesL == numWhiteStonesL ? BLACK : WHITE;

    const int numBlackStonesR = ((numBytesRhs >> 1) + 1) >> 1;
    const int numWhiteStonesR = numBytesRhs >> 2;
    const Color sideToMoveR = numBlackStonesR == numWhiteStonesR ? BLACK : WHITE;
    
    return sideToMoveL - sideToMoveR;
}

//----------------------- hashTable --------------------------

const UINT TABLE_SIZE = 1 << 22;
const UINT NODE_SIZE = 2;
const UINT NODE_BYTES = NODE_SIZE * 4;

const UINT numAnd = TABLE_SIZE - 1;

UINT size = 0;
UINT lastNode = 0;
UINT nodeEnd = 0;
UINT* table = 0;
UINT tabel_len = 0;
BYTE* dataBuffer_uint8 = 0;
UINT dataBuffer_uint8_len = 0;
UINT* nodeBuffer_uint32 = 0;
UINT nodeBuffer_uint32_len = 0;

LLNG nextNewNode() {
    size++;
    lastNode += NODE_SIZE;
    if (lastNode < nodeEnd) return lastNode;
    else return -1;
}

UINT nodeValue(UINT ptr) {
    return nodeBuffer_uint32[ptr];
}

UINT nodeNext(UINT ptr) {
    return nodeBuffer_uint32[ptr + 1];
}

UINT setValue(UINT ptr, UINT value) {
    return nodeBuffer_uint32[ptr] = value;
}

UINT setNext(UINT ptr, UINT next) {
    return nodeBuffer_uint32[ptr + 1] = next;
}

UINT toHash(BYTE* key) {
    const UINT len = (key[0] | key[1] << 8) + 2;
    return xxh32(0, key, 0, len) & numAnd;
}

BYTE* toKey(UINT ptr) {
    return &dataBuffer_uint8[ptr];
}

int compare(BYTE* l, BYTE* r) {
    return databaseKeyCompare(l, r);
}

int init(UINT* tb, UINT tbLen, UINT* buffer_uint32, UINT uint32Len, BYTE* buffer_uint8, UINT uint8Len) {
    size = 0;
    lastNode = 0;
    nodeEnd = uint32Len - NODE_SIZE + 1;
    table = tb;
    tabel_len = tbLen;
    dataBuffer_uint8 = buffer_uint8;
    dataBuffer_uint8_len = uint8Len;
    nodeBuffer_uint32 = buffer_uint32;
    nodeBuffer_uint32_len = uint32Len;
    return 1;
}

UINT get(BYTE* key) {
    const UINT ptr = toHash(key) * NODE_SIZE;
    UINT node = table[ptr];
    while (node) {
        BYTE* key2 = toKey(nodeValue(node));
        if (0 == compare(key, key2)) return nodeValue(node);
        node = nodeNext(node);
    }
    return -1;
}

UINT set(BYTE* key, UINT value) {
    const UINT ptr = toHash(key) * NODE_SIZE;
    const UINT first = table[ptr];
    const LLNG newNode = nextNewNode();
    if (newNode == -1) return newNode;
    setValue(newNode, value);
    setNext(newNode, first);
    table[ptr] = newNode;
    table[ptr + 1]++;
    return newNode;
}

UINT getMaxLength() {
    UINT maxLen = 0;
    UINT count8 = 0;
    UINT count300 = 0;
    UINT count500 = 0;
    for (int ptr = TABLE_SIZE * NODE_SIZE - NODE_SIZE; ptr >= 0; ptr -= NODE_SIZE) {
        UINT len = table[ptr + 1];
        if (len > 8) count8++;
        if (len > 309) count300++;
        if (len > 1000) count500++;
        if (len > maxLen) maxLen = len;
    }
    return maxLen;
}

UINT nodeBytes() {
    return NODE_BYTES;
}

UINT nodeSize() {
    return NODE_SIZE;
}

UINT tableSize() {
    return TABLE_SIZE;
}

UINT tableBytes() {
    return TABLE_SIZE * NODE_SIZE * 4;
}

UINT getSize() {
    return size;
}

//---------------------- load ----------------------------

double load() {
    BYTE* uint8 = dataBuffer_uint8;
    UINT u8Index = 0;
    const UINT u8IndexEnd = dataBuffer_uint8_len;
    const UINT numRecords = uint8[u8Index++] | uint8[u8Index++] << 8 | uint8[u8Index++] << 16 | uint8[u8Index++] << 24;

    UINT recordIdx;
    for (recordIdx = 0; recordIdx < numRecords; recordIdx++) {
        if (0 == (recordIdx & 0x7FFFF)) {
            outputProgress(1.0 * recordIdx / numRecords);
        }

        const UINT recordStart = u8Index;

        // Read record key
        if (u8Index + 2 > u8IndexEnd) break;
        const UINT numKeyBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (numKeyBytes == 0) break;
        
        if (u8Index + numKeyBytes > u8IndexEnd) break;
        u8Index += numKeyBytes;

        // Read record message
        if (u8Index + 2 > u8IndexEnd) break;
        const UINT numRecordBytes = uint8[u8Index++] | uint8[u8Index++] << 8;
        if (u8Index + numRecordBytes > u8IndexEnd) break;
        u8Index += numRecordBytes;
        
        BYTE* key =  uint8 + recordStart; //getKeyBuffer(uint8, recordStart);
        UINT rt = set(key, recordStart);
        
        if (rt == 0xFFFFFFFF) break;
    }

    return 1.0 * recordIdx / numRecords;
}

//-------------------- test -----------------------------
/*
UINT maxUint32() {
    return 0xFFFFFFFF;
}

UINT minusOneUint32() {
    return -1;
}

LLNG maxLongLong() {
    return 0xFFFFFFFFF;
}

char testChar(char c) {
    return c;
}

BYTE testUChar(BYTE uc) {
    return uc;
}

int testInt(int i) {
    return i;
}

UINT testUint(UINT ui) {
    return ui;
}

int testLong(int l) {
    return l;
}

unsigned long testUlng(unsigned ul) {
    return ul;
}

LLNG testLLNG(LLNG ll) {
    return ll;
}

float testFloat(float f) {
    return f;
}

double testDouble(double d) {
    return d;
}
*/
