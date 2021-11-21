const { Transform } = require("stream");

class Atbash  {
    constructor() {
	}

    encode(buffer) {
		var result = Buffer.alloc(buffer.length);
		for (var i = 0; i < buffer.length; i++) {			
			const delta = (buffer[i]>=0x61) && (buffer[i]<=0x61+26)?219:(buffer[i]>=0x41) && (buffer[i]<=0x41+26)?155:0;
			result[i] = delta?delta-buffer[i]:buffer[i];
		}
		return result;
    }
}

module.exports.Atbash = Atbash;