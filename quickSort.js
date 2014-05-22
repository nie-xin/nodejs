// quick sort - v1: choose first element as pivot
// reference: http://www.nczonline.net/blog/2012/11/27/computer-science-in-javascript-quicksort/
// Attention: modifications on partition part

var quickSort = function(array, left, right) {

    if (array.length > 1) {

        left = typeof left !== 'number' ? 0: left;
        right = typeof right !== 'number' ? array.length - 1 : right;

        var pivotIndex = partition(array, left, right);

        if (left < pivotIndex - 1) {
            quickSort(array, left, pivotIndex - 1);
        }

        if ( pivotIndex < right) {
            quickSort(array, pivotIndex + 1, right);
        }
    }

    return array;
};

var partition = function(array, left, right) {

    var pivot = array[left];
    console.log("Pivot: ", pivot);
    var i = left + 1;

    for (var j = left + 1; j <= right; j++) {
        if (array[j] < pivot) {
            swap(array, j, i);
            ++i;
       }
    }

    swap(array, left, i-1);
    console.log("Partitioned array: ", array);

    console.log('Pivot index: ', array.indexOf(pivot));
    return array.indexOf(pivot);
};

var swap = function(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};