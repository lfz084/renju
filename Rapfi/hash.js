"use strict";
self.hash = function() {
    // Simple hash function, from: http://burtleburtle.net/bob/hash/integer.html.
    // Chosen because it doesn't use multiply and achieves full avalanche.
    function hashU32(a) {
        a = a | 0;
        a = a + 2127912214 + (a << 12) | 0;
        a = a ^ -949894596 ^ a >>> 19;
        a = a + 374761393 + (a << 5) | 0;
        a = a + -744332180 ^ a << 9;
        a = a + -42973499 + (a << 3) | 0;
        return a ^ -1252372727 ^ a >>> 16 | 0;
    }

    // Reads a 64-bit little-endian integer from an array.
    function readU64(b, n) {
        var x = 0;
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
    function readU32(b, n) {
        var x = 0;
        x |= b[n++] << 0;
        x |= b[n++] << 8;
        x |= b[n++] << 16;
        x |= b[n++] << 24;
        return x;
    }

    // Writes a 32-bit little-endian integer from an array.
    function writeU32(b, n, x) {
        b[n++] = (x >> 0) & 0xff;
        b[n++] = (x >> 8) & 0xff;
        b[n++] = (x >> 16) & 0xff;
        b[n++] = (x >> 24) & 0xff;
    }

    // Multiplies two numbers using 32-bit integer multiplication.
    // Algorithm from Emscripten.
    function imul(a, b) {
        var ah = a >>> 16;
        var al = a & 65535;
        var bh = b >>> 16;
        var bl = b & 65535;

        return al * bl + (ah * bl + al * bh << 16) | 0;
    }

    // xxh32.js - implementation of xxhash32 in plain JavaScript
    
    // xxhash32 primes
    var prime1 = 0x9e3779b1;
    var prime2 = 0x85ebca77;
    var prime3 = 0xc2b2ae3d;
    var prime4 = 0x27d4eb2f;
    var prime5 = 0x165667b1;

    // Utility functions/primitives
    // --

    function rotl32(x, r) {
        x = x | 0;
        r = r | 0;

        return x >>> (32 - r | 0) | x << r | 0;
    }

    function rotmul32(h, r, m) {
        h = h | 0;
        r = r | 0;
        m = m | 0;

        return imul(h >>> (32 - r | 0) | h << r, m) | 0;
    }

    function shiftxor32(h, s) {
        h = h | 0;
        s = s | 0;

        return h >>> s ^ h | 0;
    }

    // Implementation
    // --

    function xxhapply(h, src, m0, s, m1) {
        return rotmul32(imul(src, m0) + h, s, m1);
    }

    function xxh1(h, src, index) {
        return rotmul32((h + imul(src[index], prime5)), 11, prime1);
    }

    function xxh4(h, src, index) {
        return xxhapply(h, readU32(src, index), prime3, 17, prime4);
    }

    function xxh16(h, src, index) {
        return [
    xxhapply(h[0], readU32(src, index + 0), prime2, 13, prime1),
    xxhapply(h[1], readU32(src, index + 4), prime2, 13, prime1),
    xxhapply(h[2], readU32(src, index + 8), prime2, 13, prime1),
    xxhapply(h[3], readU32(src, index + 12), prime2, 13, prime1)
  ];
    }

    function xxh32(seed, src, index, len) {
        var h, l;
        l = len;
        if (len >= 16) {
            h = [
      seed + prime1 + prime2,
      seed + prime2,
      seed,
      seed - prime1
    ];
    let s = "";
    s += `${h.length} : ${h.map(v => v.toString(10))}\n`

            while (len >= 16) {
                h = xxh16(h, src, index);
                s += `${h.length} : ${h.map(v => v.toString(10))}\n`
                index += 16;
                len -= 16;
            }

            h = rotl32(h[0], 1) + rotl32(h[1], 7) + rotl32(h[2], 12) + rotl32(h[3], 18) + l;
        } else {
            h = (seed + prime5 + len) >>> 0;
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

        return h >>> 0;
    }

    return xxh32;
    return {
        readU32,
        imul,
        rotl32,
        rotmul32,
        shiftxor32,
        xxhapply,
        xxh1,
        xxh4,
        xxh16,
        xxh32,
        readU32
    };
}()
