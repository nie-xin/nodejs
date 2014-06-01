// read input file and transfer to adjacent list object
// adjacency list should like: { 1: [2, 3], 2: [1, 3], 3: [2, 1] }  
var fs = require("fs");

var f = fs.readFileSync("kargerMinCut.txt");
var graph = {};
var mincut = [];
for (var i = 0; i < 100; i ++) {
	f.toString().split('\n').forEach(function(line) {
		var line = line.split(/\s+/).map(function(elem) {
			return parseInt(elem, 10);
		});
		line.splice(line.length-1, 1);
		graph[line[0]] = line.slice(1);
	});
	mincut.push(minCut(graph));	
}
mincut.sort(function(a, b) { return a-b; });
console.log(mincut[0]);

// randomly pick an element in a given array
function pick(arr) {
	arr = arr.map(function(elem) {
		return parseInt(elem, 10);
	});
	var index = (arr.length * Math.random()) | 0;

	return arr[index];
}

// remove element in a given array
function remove(arr, e) {
	var index;
	while((index = arr.indexOf(e)) > -1) {
		arr.splice(index, 1);
	}	
}

function minCut(graph) {
	var u, v;

	// stop at 2 groups
	while(Object.keys(graph).length > 2) {

		u = pick(Object.keys(graph));
		v = pick(graph[u]);

		// merge 
		graph[u] = graph[u].concat(graph[v]);
		delete graph[v];
		// update graph
		Object.keys(graph).forEach(function(vertex) {
			var index;
			while((index = graph[vertex].indexOf(v)) > -1) {
				graph[vertex][index] = u;
			}
		});

		// turn to number
		graph[u] = graph[u].map(function(elem) {
			return parseInt(elem, 10);
		});

		// remove self-loops
		remove(graph[u], u);
	}
	// return the crossing edges of min-cut
	return graph[Object.keys(graph)[0]].length;
}