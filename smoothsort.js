/**
 * Created by RKGladson on 5/13/15.
 * Javascript is no excuse to write bad code.™
 */

var  smoothsort= (function (undefined) {
    "use strict";
    return function smoothSortReference(array) {
        var r1,
            p = 1, b = 1, c = 1,
            p1, b1, c1,
            q = 1,
            r = 0,
            m = (array || []),
            N = m.length;
        if (N < 2) { // Nothing to sort when less than 2 items
            return m;
        }

        while (q !== N) {
            r1 = r;
            if (p % 8 === 3) {
                b1 = b; c1 = c; sift();
                p = Math.floor((p + 1) / 4);
                up(); up();
            } else if (p % 4 === 1) {
                if (q + c < N) {
                    b1 = b; c1 = c; sift();
                } else {
                    trinkle();
                }
                down();
                p *= 2;

                while (b !== 1) {
                    down();
                    p *= 2
                }
                p += 1;
            }
            q += 1;
            r += 1;
        }
        r1 = r;
        trinkle();
        while (1 !== q) {
            q -= 1;
            if (b === 1) {
                r -= 1;
                p -= 1;
                while ( even(p)) {
                    p = Math.floor(p/2);
                    up();
                }
            } else if (b >= 3) {
                p -= 1;
                r = r - b + c;
                if (p === 0) {
                    skip();
                } else { // p > 0
                    semitrinkle();
                }

                down();
                p = 2 * p + 1;
                r += c;
                semitrinkle(p, b, c);

                down();
                p = 2 * p + 1;

            }
        }

        return m;

        function skip () {}

        function even (val) {
            return Boolean(val) && !(val%2);
        }
        function up () {
            //[b, c] = [b + c + 1, b];
            // Becomes:
            var tempB = b;
            b += c + 1;
            c = tempB;
        }

        function down () {
            //[b, c] = [c, b - c - 1];
            var tempB = b;
            b = c;
            c = tempB - c - 1;
        }

        function up1 () {
            //[b1, c1] = [b1 + c1 + 1, b1];
            // Becomes:
            var tempB1 = b1;
            b1 += c1 + 1;
            c1 = tempB1;
        }

        function down1 () {
            //[b1, c1] = [c1, b1 - c1 - 1];
            var tempB1 = b1;
            b1 = c1;
            c1 = tempB1 - c1 - 1;
        }

        function mSwap(indexA, indexB) {
            var temp = m[indexA];
            m[indexA] = m[indexB];
            m[indexB] = temp;
        }

        function sift() {
            var r2;
            while (b1 >= 3) {
                r2 = r1 - b1 + c1;
                if (m[r2] >= m[r1 - 1]) { //m[r2] >= m[r1 - 1]
                    skip();
                } else {//else m[r2] <= m[r1 - 1]
                    r2 = r1 - 1;
                    down1();
                }

                if (m[r1] >= m[r2]) { // m[r1] >= m[r2]
                    b1 = 1;
                } else { //m[r1] < m[r2]
                    mSwap(r1, r2);
                    r1 = r2;
                    down1();
                }
            }
        }

        function semitrinkle() {
            r1 = r - c;
            if (m[r1] <= m[r]) { // m[r1] <= m[r]
                skip();
            } else { // m[r1] > m[r]
                mSwap(r, r1);
                trinkle();
            }
        }

        function trinkle() {
            // 'let scope' variables :
            var r2, r3;
            p1 = p;
            b1 = b;
            c1 = c;

            while (p1 > 0) {
                while (even(p1)) {
                    p1 = Math.floor(p1/2);
                    up1();
                }
                r3 = r1 - b1;

                if (p1 === 1 || m[r3] <= m[r1]) { //p1 === 1 || m[r3] <= m[r1]
                    p1 = 0;
                } else {  // p1 > 1 && m[r3] > m[r1]
                    p1 -= 1;
                    if (b1 === 1) {
                        mSwap(r1, r3);
                        r1 = r3;
                    } else if (b1 >= 3) {
                        r2 = r1 - b1 + c1;

                        if (m[r2] >= m[r1 - 1]) { //m[r2] >= m[r1 - 1]
                            skip();
                        } else { // m[r2] <= m[r1 -1]
                            r2 = r1 - 1;
                            down1();
                            p1 *= 2;
                        }

                        if (m[r3] >= m[r2]) { // m[r3] >= m[r2]
                            mSwap(r1, r3);
                            r1 = r3;
                        } else { // m[r3] <= m[r2]
                            mSwap(r1, r2);
                            r1 = r2;
                            down1();
                            p1 = 0;
                        }
                    }
                }
            }
            sift();
        }
    };
})();
