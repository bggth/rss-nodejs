const { Transform, pipeline, Readable, Writable} = require('stream')
const { UnhandledError } = require('./errors.js')
const { parse_cmdline, validate_config } = require('./parser-args.js')
const {CLIReader, CLIWriter, CLICipher} = require('./streams.js')


function main() {
	cli_config = parse_cmdline(process.argv.slice(2));
	validate_config(cli_config['config']);

	const reader = new CLIReader(cli_config['input']);
	const writer = new CLIWriter(cli_config['output']);
	const cipher =  new CLICipher(cli_config['config']);

	pipeline(reader,
		cipher,
		writer,
		err => {
			if (err) {
				throw new PipelineError('Pipeline error. ' + err.message);
			}
		});	
}
try {
	process.on('SIGINT', function() {
		console.log('SIGINT: Exit process.');
		process.exit(0);
	  });

	main();
} catch (err) {
	console.error('ERR:', err.message);
	process.exit(-1);
}
