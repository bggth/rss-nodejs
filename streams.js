const { Transform, Readable, Writable} = require('stream')
const { createWriteStream, createReadStream } = require('fs')
const { Atbash } = require('./atbash.js')
const { RotN } = require('./rotn.js')

class CLICipher extends Transform {
	constructor(config) {
		super(config);
		this.config = config.split('-');
		this.caesar = new RotN(1);
		this.rot8 = new RotN(8);
		this.atbash = new Atbash();
	}

	_transform(chunk, encoding, callback) {
		var result = Buffer.from(chunk);
		this.config.forEach(elem => {
			switch(elem)			 
			{
				case 'C0':
					result = this.caesar.decode(result);
					break;
				case 'C1':
					result = this.caesar.encode(result);
					break;
				case 'R0':
					result = this.rot8.decode(result);
					break;
				case 'R1':
					result = this.rot8.encode(result);
					break;
				case 'A':
					result = this.atbash.encode(result);
					break;								
			}

		});
		callback(null, result);
	}
}

class CLIReader extends Readable {
	constructor(opt) {
		super(opt);
		if (opt) {
			this.stream = createReadStream(opt)
		} else {
			this.stream = process.stdin;
		}
		this.stream.on('data', (chunk) => {
			this.push(chunk);
		});
	}

	_read() {
	}

}

class CLIWriter extends Writable {
	constructor(opt) {
		super(opt)
		if (opt) {
			//this.stream = createWriteStream(opt, {flags: 'a'});
			this.stream = createWriteStream(opt);
		} else {
			this.stream = process.stdout;
		}
	}
	_write(chunk, encoding, callback) {
		this.stream.write(chunk);
		callback();
	}
}

module.exports.CLICipher = CLICipher;
module.exports.CLIReader = CLIReader;
module.exports.CLIWriter = CLIWriter;