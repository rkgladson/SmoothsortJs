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

                mSorted = m.slice();
                smoothM = m.slice();

                nativeTime = performance.now();
                mSorted.sort(comp);
                nativeTime = performance.now() - nativeTime;

                smoothSortTime = performance.now();
                smoothsort(smoothM);
                smoothSortTime = performance.now() - smoothSortTime;

                nativeSet.push(Math.floor(nativeTime*1000));
                smoothSet.push(Math.floor(smoothSortTime*1000));
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


function forScienceYouMonster(runTest) {
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
}


function doScience(data) {
    'use strict';
    function sum(previousValue, currentValue) {
        return previousValue + currentValue;
    }

    function ascending (apple, orange) {
        return +(apple > orange) || -(apple < orange);
    }

    function analyze(value) {
        var sortNative = value.nativeSet.sort(ascending);
        var sortSmooth = value.smoothSet.sort(ascending);
        var nativeMean = Math.floor(value.nativeSet.reduceRight(sum)/value.nativeSet.length);
        var smoothMean = Math.floor(value.smoothSet.reduceRight(sum)/value.smoothSet.length);
        return {
            elements: value.elements,
            nativeMean: nativeMean,
            nativeMin: sortNative[0], nativeMax: sortNative[sortNative.length - 1],
            smoothMean: smoothMean,
            smoothMin: sortSmooth[0], smoothMax: sortSmooth[sortSmooth.length -1],
            winner: nativeMean < smoothMean ? 'Native' : 'Smooth sort',
            winnerBy: nativeMean < smoothMean ? smoothMean - nativeMean: nativeMean - smoothMean
        };
    }

    return {
        // Reverse the output so that the index will be 2^index-1 in length
        reverseOrder: data.reverseOrder.map(analyze).reverse(),
        randomOrder: data.randomOrder.map(analyze).reverse(),
        semiSorted: data.semiSortedOrder.map(analyze).reverse()
    };
}

var testResults = doScience(forScienceYouMonster(runTest));
function buildWinner(value) { return [value.elements, ": ", value.winner , ' by ' + value.winnerBy].join('');}

console.log("Reverse Order", testResults.reverseOrder.map(buildWinner));
console.log("Random Order", testResults.randomOrder.map(buildWinner));
console.log("Semi-Sorted Order", testResults.semiSorted.map(buildWinner));
