var cp = require('child_process');

module.exports = exports = function(dir, setSize, callback){
	if(callback == undefined){
		callback = setSize;
		setSize = 'h'; // default
	}
	dir = String(dir + '/*/').replace(/\/\//g, '/');
	var size;
	switch(String(setSize).toLowerCase()){
		case "pb":
		case "p":
		case "petabytes":
		case "petabyte":
			size = 'P';
		break;
		case "tb":
		case "t":
		case "terabytes":
		case "terabyte":
			size = 'T';
		break;
		case "gb":
		case "g":
		case "gigabytes":
		case "gigabyte":
			size = 'G';
		break;
		case "mb":
		case "m":
		case "megabytes":
		case "megabyte":
			size = 'm';
		break;
		case "k":
		case "kb":
		case "kilobtyes":
		case "kilobtye":
			size = 'k'
		break;
		case "h":
		case "human":
		case "auto":
		case "default":
		default:
			size = 'h';
		break;
	}
	cp.exec('du -s --block-size ' + size + ' ' + dir, function(err, stdout, stderr){
		stdout = stdout.toString('utf8');
		stderr = stderr.toString('utf8');
		if(err || stderr){
			return callback(stderr || err);
		}
		callback(null, parseGrid(stdout.trim()) || false);
	});
};

/*
	Modeled from function on
	https://github.com/UmbraEngineering/ps/
*/

function parseGrid(output){
	if(!output){return output;}
	return output.split('\n').map(function(line){
		var returnedOutput = [ ];
		line.split(/\s+/).map(function(item){
			if(item){
				returnedOutput.push(item);
			}
		});
		return returnedOutput;
	});
}