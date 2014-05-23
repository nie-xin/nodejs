// quick sort - v1: choose first element as pivot
// reference: http://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
// Attention: modifications on partition part

// read test file and run quick sort
var fs  = require("fs");
var nl = require('os').EOL;
fs.readFile('QuickSort.txt', function(err, f){
//fs.readFile('1000.txt', function(err, f){
    var array = f.toString().split(nl);
    var nb_array = array.map(function(elem) {
        return parseInt(elem, 10);
    });
    //console.log(nb_array);
    var result = quickSort(nb_array);
    // console.log("Sorted array: ");
    //console.log(nb_array);
    console.log("Comparison total: " + result);
});

var total = 0;

var quickSort = function(array, left, right) {

    if (array.length > 1) {

        left = typeof left !== 'number' ? 0: left;
        right = typeof right !== 'number' ? array.length - 1 : right;

        var pivotIndex = partition(array, left, right);

        if (left < pivotIndex - 1) {
            //console.log("left sort: " + array.slice(left, pivotIndex));
            quickSort(array, left, pivotIndex - 1);
        }

        if ( pivotIndex < right) {
            //console.log("right sort: " + array.slice(pivotIndex+1, right));
            quickSort(array, pivotIndex + 1, right);
        }
    }

    return total;
    //return array;
};

var partition = function(array, left, right) {
    // console.log("sub left: ", left);
    // console.log("sub right: ", right);
    // console.log("sub arr length: ", array.slice(left, right+1).length-1);
    total += array.slice(left, right+1).length - 1;

    // v1 - choose first element as pivot
    //var pivot = array[left];
    //
    // v2 - choose last element as pivot: should exchange the pivot with the first element
    // var pivot = array[right];
    // console.log("pivot ", pivot);
    // swap(array, left, right);
    // 
    // V3 - median of three: consider first, last and middle, take the median of the three as pivot
    var medianCandidates = [];
    medianCandidates.push(array[left]);
    medianCandidates.push(array[right]);
    medianCandidates.push(array[Math.floor((right+left)/2)]);
  
    var pivot = findMedian(medianCandidates);
    swap(array, left, array.indexOf(pivot));

    // end of chosen pivot
    var i = left + 1;

    for (var j = left + 1; j <= right; j++) {
        if (array[j] < pivot) {
            swap(array, j, i);
            ++i;
       }
    }

    swap(array, left, i-1);
    //console.log("Partitioned array: ", array);

    // console.log('Pivot index: ', array.indexOf(pivot));
    return array.indexOf(pivot);
};

var swap = function(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};

var findMedian = function(array) {
    array.sort(function(a, b) {
        return a - b;
    });

    var median = Math.floor(array.length / 2);

    return array[median];
};