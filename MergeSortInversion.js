var fs  = require("fs");
var nl = require('os').EOL;
fs.readFile('IntegerArray.txt', function(err, f){
    var array = f.toString().split(nl);
    var nb_array = array.map(function(elem) {
    	return parseInt(elem, 10);
    });
    console.log(nb_array);
    mergeSortInversion.init(nb_array);
});

var mergeSortInversion = {
	count: 0,

	init: function(array) {

		var result = this.mergeSort(array);
		console.log(result);

		console.log("Nb of split inversions: ", this.count);
	},

	mergeSort : function(items) {
		// Terminal case: 0 or 1 item arrays don't need sorting
		if (items.length < 2) {
		    return items;
		}

		var middle = Math.floor(items.length / 2),
		    left    = items.slice(0, middle),
		    right   = items.slice(middle);

		return this.merge(this.mergeSort(left), this.mergeSort(right));
	},

	merge: function(left, right) {
	    var result  = [],
	        il      = 0,
	        ir      = 0;

	    while (il < left.length && ir < right.length){
	        if (left[il] < right[ir]){
	            result.push(left[il++]);
	        } else {
	        	this.count += left.length - il;
	            result.push(right[ir++]);
	        }
	    }
	    // concat anything left
	    return result.concat(left.slice(il)).concat(right.slice(ir));
	}
};

// answer:2407905288

// prototype
/*	function mergeSort(items) {
	    // Terminal case: 0 or 1 item arrays don't need sorting
	    if (items.length < 2) {
	        return items;
	    }

	    var middle = Math.floor(items.length / 2),
	        left    = items.slice(0, middle),
	        right   = items.slice(middle);

	    return merge(mergeSort(left), mergeSort(right));
	}

	function merge(left, right) {
	    var result  = [],
	        il      = 0,
	        ir      = 0;

	    while (il < left.length && ir < right.length){
	        if (left[il] < right[ir]){
	            result.push(left[il++]);
	        } else {
	        	count += left.length - il;
	            result.push(right[ir++]);
	        }
	    }
	    // concat anything left
	    return result.concat(left.slice(il)).concat(right.slice(ir));
	}*/
