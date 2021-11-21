const { expect } = require("@jest/globals");
const { doesNotMatch } = require("assert");
const { exec } = require('child_process');
const { stderr } = require("process");

/*
test('', () => {
	expect().toBe();
})
*/

describe('Error scenarios', () => {
	/*test('User passes the same cli argument twice', (done) => {
		exec('node ./src/cipher-cli.js -c C1-C1-A-R0 -c C0', (stdin, stdout, stderr) => {
			console.log(stderr);
			done();
		})
		expect(1).toBe(1);
	})*/

	/*
	test('User doesn\'t pass -c or --config argument', (done) => {
		exec('node ./src/cipher-cli.js', (stdin, stdout, stderr) => {
			console.log(stderr.toString())
			expect(stderr.toString()).toBe("ERR: Invalid config.");
			done();
		})
	})
	*/

	test('atbash', (done) => {
		exec('node ./src/cipher-cli.js -i "./input.txt" -c "A"', (stdin, stdout, stderr) => {
			expect(stdout.toString()).toBe("zzzz");
			done();
		})
	})


})

describe('success scenarios', () => {
	test('hello', () => {
		expect(1).toBe(1);
	})
	test('hello 2', () => {
		expect(1).toBe(1);
	})
	
})