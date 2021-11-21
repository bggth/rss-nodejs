class UnhandledError extends Error {
	constructor(message) {
		super(message);
	};
};

class InvalidArgumentsError extends Error {
	constructor(message) {
		super(message);
	};
};

class InvalidConfigError extends Error {
	constructor(message) {
		super(message);
	};
};

class InvalidCipherError extends Error {
	constructor(message) {
		super(message);
	};
};


module.exports.UnhandledError = UnhandledError;
module.exports.InvalidConfigError = InvalidConfigError;
module.exports.InvalidCipherError = InvalidCipherError;
module.exports.InvalidArgumentsError = InvalidArgumentsError;
