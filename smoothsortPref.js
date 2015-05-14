/**
 * Created by RKGladson on 5/13/15.
 * Javascript is no excuse to write bad code.™
 */
var runTest = (function (smoothsort, performance, undefined) {
    'use strict';
    return function testRunner(times, beforeEach, comp) {
        var results = [];
        var repeat = times > 1 ? times : 1, repI;
        var length, m,
            nativeTime, mSorted, nativeSet,
            smoothSortTime, smoothM, smoothSet;
        for (var limit = 16; 0 < limit; limit -= 1) {
            length = Math.pow(2, limit) - 1;
            smoothSet = [];
            nativeSet = [];
            repI = repeat;
            while(repI) {
                repI -= 1;
                m = beforeEach(length);

                nativeTime = performance.now();
                mSorted = m.sort(comp);
                nativeTime = performance.now() - nativeTime;

                smoothM = m.slice();

                smoothSortTime = performance.now();
                smoothsort(smoothM);
                smoothSortTime = performance.now() - smoothSortTime;

                nativeSet.push(nativeTime.toFixed(4)*1000);
                smoothSet.push(smoothSortTime.toFixed(4)*1000);
            }

            results.push(
                {
                    elements: length,
                    nativeSet: nativeSet,
                    smoothSet: smoothSet
                }
            );
        }
        return results;
    }
})(smoothsort, performance);


var testResults = (function forScienceYouMonster() {
    var output;
    function newArray(length) {
        var r = [], i;
        for (i = length - 1; 0 <= i; i -= 1) {
            r[i] = undefined;
        }
        return r;
    }

    function comp(apple, orange) {
        return +(apple > orange) || -(apple < orange);
    }

    function completelyRandomString() {
        return Math.random().toString(36).replace(/0\./, '');
    }

    function semiSort(array) {
        // Poor Card shuffling method
        var rA, rB, r;
        // Started with a brand new deck.
        r = array.sort(comp);
        // split it in half.
        rA = r.slice(0, Math.floor(r.length / 2));
        rB = r.slice(Math.floor(r.length / 2), r.length);
        while (rB.length) {
            rA.splice(Math.floor(Math.random() * rB.length - 1), 0, rB[0]);
            rB.shift();
        }
        return rA;
    }


    function randomStringGen (length) {
        return newArray(length).map(completelyRandomString)
    }
    function reverseGen(length) {
        return randomStringGen(length).reverse()
    }

    function semiSortGen(length) {
        return semiSort(randomStringGen(length));
    }

    output = {
        reverseOrder: runTest(10, reverseGen, comp),
        randomOrder: runTest(10, randomStringGen, comp),
        semiSortedOrder: runTest(20, semiSortGen, comp)
    };
    return output;
})(runTest);
