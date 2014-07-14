'use strict';

const
	fs = require('fs'),
	zmq = require('zmq'),
	publiser = zmq.socket('pub'),
	filename = process.argv[2];

	fs.watch(filename, function() {
		publiser.send(JSON.stringify({
			type: 'changed',
			file: filename,
			timestamp: Date.now()
		}));
	});

	publiser.bind('tcp://*.5432', function(err) {
		console.log('Listening for zma subscribers');
	});
	