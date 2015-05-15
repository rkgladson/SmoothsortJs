/**
 * Created by RKGladson on 5/13/15.
 * Javascript is no excuse to write bad code.™
 */

var  smoothsort= (function (undefined) {
    "use strict";
    return function smoothSortReference(array, comparisonFn) {
        var r1,
            p = 1, b = 1, c = 1,
            q = 1,
            r = 0,
            m = (array || []) ,
            N = m.length,
            comp = comparisonFn || function (valA, valB) {
                    return valA <= valB;
                };
        var tempC, tempB;
        if (N < 2) { // Nothing to sort when less than 2 items
            return m;
        }

        while (q !== N) {
            r1 = r;
            if (p % 8 === 3) {
                sift(b, c);
                p = Math.floor((p + 1) / 4);
                // [b, c] = [b + c + 1, b];
                // Becomes:
                tempB = b;
                b = b + c +1;
                c = tempB;
                tempB = undefined;

                // [b, c] = [b + c + 1, b];
                // Becomes:
                tempB = b;
                b = b + c +1;
                c = tempB;
                tempB = undefined;

            } else if (p % 4 === 1) {
                if (q + c < N) {
                    sift(b, c);
                } else {
                    trinkle(p, b, c);
                }
                // down
                // [b,c] = [c, b - c - 1];
                // Becomes:
                tempC = c;
                c = b - c -1;
                b = tempC;
                tempC = undefined;

                p *= 2;
                while (b !== 1) {
                    // down
                    // [b,c] = [c, b - c - 1];
                    // Becomes:
                    tempC = c;
                    c = b - c -1;
                    b = tempC;
                    tempC = undefined;

                    p *= 2
                }
                p += 1;
            }
            q += 1;
            r += 1;
        }
        r1 = r;
        trinkle(p, b, c);
        while (1 < q) {
            q -= 1;
            if (b === 1) {
                r -= 1;
                p -= 1;
                while ( p && !p%2) { // even(p)
                    p = Math.floor(p/2);
                    tempB = b;
                    b = tempB + c + 1;
                    c = tempB;
                    tempB = undefined;
                }
            } else if(3 <= b) {
                p -= 1;
                r = r - b + c;
                if (p > 0) {
                    semitrinkle(p, b ,c);
                }
                //  [b, c] = [c, b - c - 1];
                // Becomes
                tempC = c;
                c = b - c -1;
                b = tempC;
                tempC = undefined;

                p = 2*p +1;
                r += c;
                semitrinkle(p, b, c);
                //  [b, c] = [c, b - c - 1];
                // Becomes
                tempC = c;
                c = b - c -1;
                b = tempC;
                tempC = undefined;

                p = 2*p +1;

            }
        }

        return m;


        function sift(b1, c1) {
            var r2;
            // in place swap variables
            var tempC1, tempMR1;
            while (b1 >= 3) {
                r2 = r1 - b1 + c1;
                if (m[r2] >= m[r1 - 1]) { //m[r2] >= m[r1 - 1]
                    //skip
                } else {//else m[r2] <= m[r1 - 1]
                    r2 = r1 - 1;
                    //down1
                    // [b1, c1] = [c1, b1 - c1 - 1];
                    // becomes:
                    // let tempB = b1;
                    tempC1 = c1;
                    c1 = b1 - c1 - 1;
                    b1 = tempC1;
                    tempC1 = undefined;
                }

                if (m[r1] >= m[r2]) { // m[r1] >= m[r2]
                    b1 = 1;
                } else { //m[r1] < m[r2]
                    //[m[r1], m[r2]] = [m[r2], m[r1]]
                    // Becomes:
                    tempMR1 = m[r1];
                    m[r1] = m[r2];
                    m[r2] = tempMR1;
                    tempMR1 = undefined;

                    r1 = r2;
                    // down1
                    // [b1, c1] = [c1, b1 - c1 - 1];
                    // becomes:
                    tempC1 = c1;
                    c1 = b1 - c1 - 1;
                    b1 = tempC1;
                    tempC1 = undefined;
                }
                r2 = undefined;
            }

        }



        function semitrinkle(p, b, c) {
            var tempMR;
            r1 = r - c;
            // m[r1] <= m[r] -> skip
            if (m[r1] <= m[r]) {
                // skip
            } else if (m[r1] > m[r]) { // m[r1] > m[r]
                // [m[r], m[r1] = [m[r1], m[r]];
                // Becomes:
                tempMR = m[r];
                m[r] = m[r1];
                m[r1] = tempMR;
                trinkle(p, b, c);
            }
        }

        function trinkle(p1, b1, c1) {
            // 'let scope' variables :
            var r2, r3, tempB1, tempMR1, tempC1;
            while (p1 > 0) {
                while (p1 && !p1%2) { // even(p1)
                    p1 = Math.floor(p1/2);
                    // up1
                    // [b1,c1] = [b1+ c1+1, b1];
                    // becomes
                    tempB1 = b1;
                    b1 = b1 + c1 + 1;
                    c1 = tempB1;
                    tempB1 = undefined;

                }
                r3 = r1 - b1;

                if (p1===1 || m[r3] <= m[r1]) { //p1===1 || m[r3] <= m[r1]
                    p1 = 0;
                } else {  // p1 > 1 && m[r3] > m[r1]
                    p1 -= 1;
                    if (b1 === 1) {
                        // [m[r1], m[r3]] = [m[r3], m[r1]];
                        // becomes
                        tempMR1 = m[r1];
                        m[r1] = m[r3];
                        m[r3] = tempMR1;
                        tempMR1 = undefined;

                    } else if (b1 >= 3) {
                        r2 = r1 - b1 + c1;

                        if (m[r2] >= m[r1 - 1]) { //m[r2] >= m[r1 - 1]
                            // skip
                        } else { // m[r2] <= m[r1 -1]
                            r2 = r1 -1;
                            // down1
                            // [b1, c1] = [c1, b1 - c1 - 1]
                            // becomes:
                            tempC1 = c1;
                            c1 = b1 - c1 - 1;
                            b1 = tempC1;
                            tempC1 = undefined;

                            p1 *= 2;
                        }

                        if (m[r3] >= m[r2]) { // m[r3] >= m[r2]
                            //[m[r1], m[r3]] = [m[r3], m[r1]];
                            tempMR1 = m[r1];
                            m[r1] = m[r3];
                            m[r3] = tempMR1;
                            tempMR1 = undefined;
                            r1 = r3;
                        } else { // m[r3] <= m[r2]
                            // [m[r1], m[r2]] = [m[r2], m[r1]];
                            tempMR1 = m[r1];
                            m[r1] = m[r2];
                            m[r2] = tempMR1;
                            tempMR1 = undefined;
                            r1 = r2;
                            // down1
                            // [b1, c1] = [c1, b1 - c1 - 1]
                            // becomes:
                            tempC1 = c1;
                            c1 = b1 - c1 - 1;
                            b1 = tempC1;
                            tempC1 = undefined;
                            p1 = 0;
                        }
                        r2 = undefined;
                    }
                }
                r3 = undefined;
            }

            sift(b1, c1);
        }
    };
})();
