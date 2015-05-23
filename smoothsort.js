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
        // swap vars:
        var tempB;
        if (N < 2) { // Nothing to sort when less than 2 items
            return m;
        }

        while (q !== N) {
            r1 = r;
            if ((p & 7) === 3) {
                b1 = b; c1 = c; sift();
                p = (p + 1)>>>2;
                /*up: */tempB = b;   b += c + 1;  c = tempB; /*up: */tempB = b;   b += c + 1;  c = tempB;
            } else if ((p & 3) === 1) {
                if (q + c < N) {
                    b1 = b; c1 = c; sift();
                } else {
                    trinkle();
                }
                /*down*/ tempB = b;  b = c;  c = tempB - c - 1;
                p *= 2;

                while (b !== 1) {
                    /*down*/ tempB = b;  b = c;  c = tempB - c - 1;
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
                while ( p && !(p & 1)) {
                    p >>>= 1;
                    /*up: */tempB = b;   b += c + 1;  c = tempB;
                }
            } else if (b >= 3) {
                p -= 1;
                r = r - b + c;
                //(p === 0) && skip();
                if ( p > 0 ) {
                    semitrinkle();
                }

                /*down*/ tempB = b;  b = c;  c = tempB - c - 1;
                p = 2 * p + 1;
                r += c;
                semitrinkle();

                /*down*/ tempB = b;  b = c;  c = tempB - c - 1;
                p = 2 * p + 1;

            }
        }

        return m;

        function sift() {
            var r2;
            // Swap variables:
            var tempB1, tempM;
            while (b1 >= 3) {
                r2 = r1 - b1 + c1;
                //m[r2] >= m[r1 - 1] && skip()
                if ( m[r2] <= m[r1 - 1] ) {
                    r2 = r1 - 1;
                    /*down1*/ tempB1 = b1; b1 = c1; c1 = tempB1 - c1 - 1;
                }

                if (m[r1] >= m[r2]) { // m[r1] >= m[r2]
                    b1 = 1;
                } else { //m[r1] < m[r2]
                    /*m:swap(r1, r2); */ tempM = m[r1]; m[r1] = m[r2]; m[r2] = tempM;
                    r1 = r2;
                    /*down1*/ tempB1 = b1; b1 = c1; c1 = tempB1 - c1 - 1;
                }
            }
        }

        function semitrinkle() {
            // Swap variables
            var tempM;
            r1 = r - c;
            // m[r1] <= m[r]  && skip();
            if (m[r1] > m[r]) {
                /*m:swap(r, r1); */ tempM = m[r]; m[r] = m[r1]; m[r1] = tempM;
                trinkle();
            }
        }

        function trinkle() {
            // 'let scope' variables :
            var r2, r3;
            // Swap variables:
            var tempB1, tempM;

            p1 = p;
            b1 = b;
            c1 = c;

            while (p1 > 0) {
                while (p1 && !(p1&1)) {
                    p1 >>>= 1;
                    /*up1:*/ tempB1 = b1; b1 += c1 + 1; c1 = tempB1;
                }
                r3 = r1 - b1;

                if (p1 === 1 || m[r3] <= m[r1]) { //p1 === 1 || m[r3] <= m[r1]
                    p1 = 0;
                } else {  // p1 > 1 && m[r3] > m[r1]
                    p1 -= 1;
                    if (b1 === 1) {
                        /*m:swap(r1, r3); */ tempM = m[r1]; m[r1] = m[r3]; m[r3] = tempM;
                        r1 = r3;
                    } else if (b1 >= 3) {
                        r2 = r1 - b1 + c1;

                        //m[r2] >= m[r1 - 1] && skip();

                        if (m[r2] <= m[r1 -1]) {
                            r2 = r1 - 1;
                            /*down1*/ tempB1 = b1; b1 = c1; c1 = tempB1 - c1 - 1;
                            p1 *= 2;
                        }

                        if (m[r3] >= m[r2]) { // m[r3] >= m[r2]
                            /*m:swap(r1, r3); */ tempM = m[r1]; m[r1] = m[r3]; m[r3] = tempM;
                            r1 = r3;
                        } else { // m[r3] <= m[r2]
                            /*m:swap(r1, r2); */ tempM = m[r1]; m[r1] = m[r2]; m[r2] = tempM;
                            r1 = r2;
                            /*down1*/ tempB1 = b1; b1 = c1; c1 = tempB1 - c1 - 1;
                            p1 = 0;
                        }
                    }
                }
            }
            sift();
        }
    };
})();
