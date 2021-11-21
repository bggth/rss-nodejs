const { InvalidConfigError, InvalidCipherError, InvalidArgumentsError } = require("./errors.js");

function read_argument(cmdline, arg) {
	var index = cmdline.indexOf(arg);
	if (index != -1) {
		if (cmdline.length > index+1) {
			if (cmdline[index+1][0]=='-') {
				return null;
			} else {
				return cmdline[index+1];
			}
		} else {
			throw new InvalidArgumentsError('Invalid argument ' + arg + '.')
		}
	}
	return null;
}

function parse_cmdline(cmdline) {
	var cli_config = {
		input: null,
		output: null,
		config: null,
	}

	cli_config['input'] = cli_config['input']?cli_config['input']:read_argument(cmdline, "-i");
	cli_config['input'] = cli_config['input']?cli_config['input']:read_argument(cmdline, "--input");
	cli_config['output'] = cli_config['output']?cli_config['output']:read_argument(cmdline, "-o");
	cli_config['output'] = cli_config['output']?cli_config['output']:read_argument(cmdline, "--output");
	cli_config['config'] = cli_config['config']?cli_config['config']:read_argument(cmdline, "-c");
	cli_config['config'] = cli_config['config']?cli_config['config']:read_argument(cmdline, "--config");

	if (cli_config['config'])
		cli_config['config'] = cli_config['config'].replaceAll('"', '');
	if (cli_config['input'])
		cli_config['input'] = cli_config['input'].replaceAll('"', '');
	if (cli_config['output'])
		cli_config['output'] = cli_config['output'].replaceAll('"', '');

	return cli_config;
}

function validate_config(config) {
	if (config===null) {
		throw new InvalidConfigError('Invalid config.')
	}
	var ciphers = config.split('-');
	ciphers.forEach(cipher => {
		if (cipher.length > 2) {
			throw new InvalidCipherError('Invalid cipher ' + cipher + '.')
		} else if(cipher.length == 1) {
			if (cipher != 'A') {
				throw new InvalidCipherError('Invalid cipher ' + cipher + '.')
			}
		} else {
			if ((cipher[0] != 'C') && (cipher[0] != 'R')) {
				throw new InvalidCipherError('Invalid cipher ' + cipher + '.')
			}
			if ((cipher[1] != '0') && (cipher[1] != '1')) {
				throw new InvalidCipherError('Invalid cipher ' + cipher + '.')
			}
		}
	})
}


module.exports.parse_cmdline = parse_cmdline;
module.exports.validate_config = validate_config;