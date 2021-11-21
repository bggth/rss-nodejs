const { expect } = require("@jest/globals")
const { Atbash } = require("../src/atbash")
const {RotN} = require("../src/rotn")


/*
test('', () => {
	expect().toBe();
})
*/

test('atbash a -> z', () => {
	var atbashEncoder = new Atbash()
	var bufferA = new Buffer.from('aamn ZZMN');
	var bufferZ = new Buffer.from('zznm AANM');
	expect(atbashEncoder.encode(bufferA).toString()).toBe(bufferZ.toString())
})

test('caesar (rot1) encode', () => {
	var caesarEncode = new RotN(1);
	var buffer = new Buffer.from('Aa Zz');
	var expectBuffer = new Buffer.from('Bb Aa');
	expect(caesarEncode.encode(buffer).toString()).toBe(expectBuffer.toString());
})

test('caesar (rot1) decode', () => {
	var caesarEncode = new RotN(1);
	var buffer = new Buffer.from('Bb Aa');
	var expectBuffer = new Buffer.from('Aa Zz');
	expect(caesarEncode.decode(buffer).toString()).toBe(expectBuffer.toString());
})

test('rot8 encode', () => {
	var caesarEncode = new RotN(8);
	var buffer = new Buffer.from('Aa Zz');
	var expectBuffer = new Buffer.from('Ii Hh');
	expect(caesarEncode.encode(buffer).toString()).toBe(expectBuffer.toString());
})

test('rot8 decode', () => {
	var caesarEncode = new RotN(8);
	var buffer = new Buffer.from('Ii Hh');
	var expectBuffer = new Buffer.from('Aa Zz');
	expect(caesarEncode.decode(buffer).toString()).toBe(expectBuffer.toString());
})

test('rotn27', () => {
	var caesarEncode = new RotN(27);
	var buffer = new Buffer.from('Aa Zz');
	var expectBuffer = new Buffer.from('Bb Aa');
	expect(caesarEncode.encode(buffer).toString()).toBe(expectBuffer.toString());
})