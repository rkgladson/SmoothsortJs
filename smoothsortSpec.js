/**
 * Created by RKGladson on 5/13/15.
 * Javascript is no excuse to write bad code.™
 */

// unit test for smooth sort.
(function smoothSortUnitTest(smoothsort, undefined) {
    "use strict";
    function newArray(length, storeFn) {
        var r = [], i, store = typeof storeFn === 'function';
        for (i = length - 1; 0 <= i; i -= 1) {
            r[i] = store ? storeFn(i, length) : undefined;
        }
        return r;
    }

    function comp(apple, orange) {
        return +(apple > orange) || -(apple < orange);
    }

    function reversedIndex(index ,length) {
        return length - index;
    }

    var m = newArray(Math.pow(2, 16) - 1, reversedIndex),
        smoothM = smoothsort(m.slice()),
        mSorted = m.slice().sort(comp),
        ok = true,
        i;
    for (i = m.length - 1; 0 <= i && ok; i -= 1 ) {
        if (mSorted[i] !== smoothM[i]) {
            ok = false;
            console.error('Set', mSorted[i-1], mSorted[i], mSorted[i+1],
                ' does not equal ', smoothM[i-1], smoothM[i], smoothM[i+1]);
        }
    }
    if (ok) console.log('Sorts are identical');
    //console.log(smoothM);
}(smoothsort));