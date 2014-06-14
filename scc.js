var fs   = require('fs'),
    colors = require('colors'),
    _ = require('underscore');

var log = console.log;
var ins = require('util').inspect;
var filename = process.argv[2];

if (filename == undefined) {
  log("filename missing".red);
  return;
}
if (!fs.existsSync(filename)) {
  log(("file '" + filename + "' not found").red);
  return;
}

var tStart = process.uptime();
var tDataEnd = null;
var tDataStart = null;
var tKosarajuFirstEnd = null;
var tKosarajuSecondEnd = null;
var tKosarajuEnd = null;

var g = {};
var gRev = {};

var stream = fs.createReadStream(filename, { 
  encoding: 'ascii',
  flags: 'r',
  bufferSize: fs.lstatSync(filename).size 
});

stream.on('open', function() {
  tDataStart = process.uptime();

  log('<<stream-open>>'.yellow);
}).on('error', function(err) {
  log(err);

}).on('end', function() { 
  tDataEnd = process.uptime();

  log('<<stream-end>>'.yellow); 
  // log('head: ' + ins(g.slice(0, 2)));
  // log('tail: ' + ins(g.slice(g.length-2)));

   // log('g: ' + ins(g));
   // log('gRev: ' + ins(gRev));

  log(('data-duration: ' + (tDataEnd - tDataStart) + '\n').grey);

  kosaraju(g, gRev);

  if (fs.existsSync(filename + '.ans')) {
    log('expect-ans: '.red + fs.readFileSync(filename + '.ans').toString().red);
  }

  log(('tKosarajuFirst-duration: ' + (tKosarajuFirstEnd - tDataEnd)).grey);
  log(('tKosarajuSecondEnd-duration: ' + (tKosarajuSecondEnd - tKosarajuFirstEnd)).grey);
  log(('kosaraju-duration: ' + (tKosarajuEnd - tDataEnd)).grey);
  log(('total-duration: ' + process.uptime()).grey);
  log(ins(process.memoryUsage()));
  log('\n');
});

stream.on("data", function(data){
  var start = 0;
  var prev = null;
  for(var i=0; i<data.length; i++){
    if(data[i] == '\n' || data[i] == ' '){
      if(i-start > 0) {
        var x = parseInt(data.slice(start, i), 10);
        if(prev !== null) {

          if(g[prev] == undefined) {
            g[prev] = [];
          }
          g[prev].push(x);

          if(gRev[x] == undefined) {
            gRev[x] = [];
          }
          gRev[x].push(prev);

          prev = null;
        } else {
          prev = x;
        }
      } 
      start = i+1;
    }
  }
});

// # of nodes processed so far. for finishing times in 1st pass
var t = 0;

// current source vertex. for leaderCounts in 2nd pass
var s = 0;

// SCCs
var leaderCount = [];
var leaders = [];

var explored = {};

var f = [];

var _g = null;

function kosaraju(g, gRev) {

  // compute 'magic' ordering of nodes
  var last = parseInt(_.last(_.keys(g)));
  dfsLoop(gRev, _.range(last, 0, -1)); 
  tKosarajuFirstEnd = process.uptime();

  // log('\nf: ' + ins(f));
  var fs = f.reverse();
  
  leaderCount = [];
  leaders = [];
  explored = {};
  f = [];

  dfsLoop(g, fs); 
  tKosarajuSecondEnd = process.uptime();

  var ans = leaderCount.sort(function(a,b) { 
    return b-a; 
  });
  // log(leaders);
  log('actual-ans: '.green + ans.slice(0,5).toString().green);

  tKosarajuEnd = process.uptime();
}

function dfsLoop(g, ord) {
  // log('\ng: \n' + ins(g));
  // log('ord: ' + ins(ord));
  _g = g;

  t = 0;
  s = null;

  for(var x = 0; x < ord.length; x++) {
    var i = ord[x];
    if(explored[i] == undefined) {
      s = i;
      dfs(i);
    }
  };
}

function dfs(i) {
  explored[i] = true;
  
  var ls = leaderCount[s];
  if (ls == undefined) {
    leaderCount[s] = 0;
  }
  leaderCount[s]++;
  leaders[i] = s;

  for(var x = 0;  _g[i] && x < _g[i].length; x++) {
    var j = _g[i][x];
    if(explored[j] == undefined) {
      dfs(j);
    }
  };

  t++;
  f[t-1] = i;
}
