var Heap = function() {

    var _heap_array = [null];    // start from index 1

    this.insert = function(key) {
        _heap_array.push(key);
        var newIndex = _heap_array.indexOf(key);

        var parentIndex = newIndex % 2 === 0 ? newIndex / 2 : Math.floor(newIndex/2);

        // bubble up
        
        while (newIndex !== 1 && _heap_array[newIndex] < _heap_array[parentIndex]) {
    			console.log("===> Bubble up: ", newIndex);
        	// console.log("parent i: ", parentIndex);
        	// console.log("before: ", _heap_array);
      		this.swap(newIndex, parentIndex);
      		// console.log("after: ", _heap_array);
      		newIndex = _heap_array.indexOf(key);
					parentIndex = newIndex % 2 === 0 ? newIndex / 2 : Math.floor(newIndex/2);
        }
    };

    this.swap = function(i1, i2) {
    	var tmp = _heap_array[i1];
    	_heap_array[i1] = _heap_array[i2];
    	_heap_array[i2] = tmp;
    }

    this.extractMin = function() {
    	var min = _heap_array[1];

    	// bubble down
    	var lastChild = _heap_array[_heap_array.length - 1];
    	_heap_array[1] = lastChild;
    	_heap_array.splice(_heap_array.length - 1, 1);


    	var i = _heap_array.indexOf(lastChild);
    	var leftChild = 2;
    	var rightChild = 3;
    	while (_heap_array[i] > _heap_array[leftChild] || _heap_array[i] > _heap_array[rightChild]) {
    		console.log("===> Bubble down: ", i);
    		_heap_array[leftChild] < _heap_array[rightChild] ? swap(i, leftChild) : swap(i, rightChild);
    		i = indexOf(lastChild);
    		leftChild = i * 2;
    		rightChild = i * 2 + 1;
    	}
    };

    this.getHeap = function() {
    	return _heap_array;
    }
};

// test
var heap = new Heap();
heap.insert(4);
heap.insert(5);
heap.insert(3);
//heap.extractMin();

console.log("result: ", heap.getHeap());

