// prototype
var N = 6;
var A = [1, 3, 5];
var B = [2, 4, 6];
var result = [];
var count = 0;

var i = 0,
    j = 0,
    k = 0;

while ( k < N ) {    
    if (A[i] <= B[j]) {
        result[k++] = A[i++];
    } else {
        count += A.length - i;
        result[k++] = B[j++];
    }
}

console.log("Sort result: ", result);
console.log("Nb of split inversions: ", count);
