class RotN {
	constructor(n) {
		if (n>=1 && n<=26) {
			this.n = n;
		} else {
			this.n = (n % 26)
		}
	}

	encode(buffer) {
		var result = Buffer.alloc(buffer.length);
		for (var i = 0; i < buffer.length; i++) {
			if ((buffer[i]>=0x41) && (buffer[i]<=0x41+26)) {
				result[i] = buffer[i] + this.n;
				if (result[i] >= 0x41+26) {
					result[i] = result[i]-26;
				}
			} else if ((buffer[i]>=0x61) && (buffer[i]<=0x61+26)) {
				result[i] = buffer[i] + this.n;
				if (result[i] >= 0x61+26) {
					result[i] = result[i]-26;
				}
			} else {
				result[i] = buffer[i];
			}
		}
		return result;
	}

	decode(buffer) {
		var result = Buffer.alloc(buffer.length);
		for (var i = 0; i < buffer.length; i++) {
			if ((buffer[i]>=0x41) && (buffer[i]<=0x41+26)) {
				result[i] = buffer[i] - this.n;
				if (result[i] < 0x41) {
					result[i] = result[i]+26;
				}
			} else if ((buffer[i]>=0x61) && (buffer[i]<=0x61+26)) {
				result[i] = buffer[i] - this.n;
				if (result[i] < 0x61) {
					result[i] = result[i]+26;
				}
			} else {
				result[i] = buffer[i];
			}
		}
		return result;
	}
}

module.exports.RotN = RotN;