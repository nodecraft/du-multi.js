du-multi.js
===========

Node.js wrapper for linux "du" command. Used to list usage of folders of a directory.

## Install

```bash
$ npm install du-multi
```

## Usage

Pass a directory as the first argument, a size type as an optional second argument, and then a callback function. Size type can be 'kb', 'mb', 'gb', etc. or simply 'h' for human readable. The default size type is 'h', and can be emitted entirely if needed.
```javascript
var ps = require('du-multi');

// A simple pid lookup
du('/home', 'm', function(err, output) {
    if (err) {throw err;}
    console.log(output);  // array returned containing size info and dirs
});
```

