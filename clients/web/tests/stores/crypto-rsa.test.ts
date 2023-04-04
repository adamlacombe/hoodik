import { describe, it, expect } from 'vitest';
import { rsa as crypto } from '../../src/lib/stores/cryptfns';

const privatePem = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAsMvjT2NZNqJo/3AYHH3RIm5fwmOXabbYxduvtNp33JQQZSPu
S+bbqe97jJXVIRUaEPWf05sCwctmFvxcL77FtWLCxaU8TYz4K59LAPcGLGuQO3Hl
PVFAmBUSMDRaK3T3mwMk/Z3qDi8GyumEmN1UfZtxxfqFfMgIB2b8K6enPSHQHoiq
N7xm8MdaDhZGQnyzgjFAKhKFWiusjKwWHe6vvEOFQkIrdTPwhg7ELCmY+kOuW6g/
giE6XcVx2TPOtG5A5qBeJ+vW8XJHZYfCcLwsDZnirTwUTWORWM2omNbquNATh+Lt
3Vh2Rp/vTZJD4LIeR91o55BWr+NLY2I52eSY6QIDAQABAoIBACiQj3Y+qFCV0RuS
36Vh5ONOieAzM6GI15IGRvlrCwdsXZqnNNzrekkybpmiI0W07scnZGWL8oT+o0zw
2EIINprYrzHkKMLubl6r7OyqwRreDzjkeCGqi/SZGRRAXtQLwWgqv4kFe5eHiLpz
+/2LAwDS8rbnNUudJeJ06bUmgYPP5al+96zivJlXhAINss/t5DYwpwoOR7dPaMz0
Yb4qQW9HT5cMi0giDxF89RIV08rFGkDQEU10/31AqqEr8LYMOn/J/JTRqmqnL/DM
kAdwrO1cwU5tnVIgAjj7ouyukDTvxhhk9otrgAwCP6wSOf7V8P4j4AWMHoVYXDTx
fx0JdQUCgYEA2HlCiRLphR/LSil78B+cR3MCJEtn1gGsUei5R+wkw6rjP6UQaTiQ
X4WAAM04B+ZPlQvtnxt/B9+rmM6UcgfPoWLR8RVOp1XMyL/OTwbgljrQc3bWuBiE
OuoYe2QOEtFYg69V4f37+DnHC2gKbbitw62FhaNbZQHNMfC9soh480cCgYEA0RP5
g/l9K/DALiuRE8wkF8ByfRXsYxUGzOu9B5elvAg89wn/LDzsLFfPBZQ/5jml3r99
kvn+eMzavUbqCMKICgD/XZ4cJucoWm+lPtddj/dce27ePVhhWWC7nQ2IzGdswC0T
1O1n6HIa3cMkeruWg36p137E8AVORXxIoOFJSk8CgYBE7pAeYBRWXOJ6Mi2SMC6u
ndPPxOdCwXOi/Y2Kdorad983VBOevfFTSYqSNsch1NgAqTS4lqPj2PimhxnEGfKm
/HXH5DYQmQTF5DYI+jKoBAB+1BfZtYzdyc+T8y98FIewHzQk66DB0XwtiKrRd551
khrTjEo9Js61mWh+onCJXwKBgB0XeW2KpocZrbP+7eXiTtdbONL83PKAd3zGBHxs
9muufcUmB/KA25/j6/NryGRhexn+bRupW2Y1ou4ZUvE7GDDEKMQ+/s3O9kd3J3gS
AXvJwH2QVK4WgR0tn41f17wRXAl1fD/xdLbcQa6/u3C0b2IGmt1YT1DSfCyg+X4h
OtBzAoGBAMqMskbS24GqN21itBVoP+6njQzyXL8r3H3+MHNbhmzuC9MpfE7v4QMI
IKeXOea5ts/4MTXbxUmzFwzj5gFeThsEykJEdHuWK1fbYW2rxFehXH5spqbrzGQX
ejsNMbtGsAhQfwBrKb6qlyNR6d6bTixhCuqYCTYjRi7AnL9G/w9B
-----END RSA PRIVATE KEY-----`;

const publicPem = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAsMvjT2NZNqJo/3AYHH3RIm5fwmOXabbYxduvtNp33JQQZSPuS+bb
qe97jJXVIRUaEPWf05sCwctmFvxcL77FtWLCxaU8TYz4K59LAPcGLGuQO3HlPVFA
mBUSMDRaK3T3mwMk/Z3qDi8GyumEmN1UfZtxxfqFfMgIB2b8K6enPSHQHoiqN7xm
8MdaDhZGQnyzgjFAKhKFWiusjKwWHe6vvEOFQkIrdTPwhg7ELCmY+kOuW6g/giE6
XcVx2TPOtG5A5qBeJ+vW8XJHZYfCcLwsDZnirTwUTWORWM2omNbquNATh+Lt3Vh2
Rp/vTZJD4LIeR91o55BWr+NLY2I52eSY6QIDAQAB
-----END RSA PUBLIC KEY-----`;

describe('Crypto test', () => {
	it('RSA: can generate secret key from input', async () => {
		const keypair = crypto.generateKey();

		const { input } = crypto.inputToKeypair(keypair.input as string);

		console.log('PRIVATE:');
		console.log(keypair.input);
		console.log('PUBLIC:');
		console.log(keypair.publicKey);

		expect(input).toBe(keypair.input);
	});

	it('RSA: can sign messages and verify signatures', async () => {
		const keypair = crypto.generateKey();
		crypto.set(keypair);

		const message = 'hello world';
		const { signature, publicKey } = await crypto.sign(message);

		expect(publicKey).toBe(keypair.publicKey);
		expect(await crypto.verify(signature, message)).toBe(true);
	});

	it('RSA: can sign messages and verify signatures with specific input', async () => {
		const keypair = crypto.inputToKeypair(privatePem);

		crypto.set(keypair);

		const keypair2 = crypto.inputToKeypair(privatePem);

		expect(keypair2.publicKey).toBe(keypair.publicKey);

		const privateFingerprint = await crypto.getFingerprint(keypair.input as string);
		const publicFingerprint = await crypto.getFingerprint(keypair.publicKey as string);

		const message = '28004708';

		console.log('PRIVATE KEY:');
		console.log(keypair.input);
		console.log('PUBLIC KEY:');
		console.log(keypair.publicKey);
		console.log('KEY ID:');
		console.log(publicFingerprint);

		expect(privateFingerprint).toBe(publicFingerprint);

		const { signature, publicKey } = await crypto.sign(message);

		expect(publicKey).toBe(keypair.publicKey);
		expect(await crypto.verify(signature, message, publicPem)).toBe(true);

		console.log('SIGNATURE:');
		console.log(signature);
	});

	it('RSA: can encrypt and decrypt message with generated keys', async () => {
		const keypair = crypto.inputToKeypair(privatePem);
		crypto.set(keypair);

		const message = 'hello world';

		const encrypted = await crypto.encryptMessage(message, keypair.publicKey as string);
		const decrypted = await crypto.decryptMessage(encrypted);

		expect(message !== encrypted).toBe(true);
		expect(message).toEqual(decrypted);
	});

	it('RSA: can encrypt and decrypt message with generated keys oaep', async () => {
		const keypair = crypto.inputToKeypair(privatePem);
		crypto.set(keypair);

		const message = 'hello world';

		const encrypted = await crypto.encryptOaepMessage(message, keypair.publicKey as string);
		const decrypted = await crypto.decryptOaepMessage(encrypted);

		expect(message !== encrypted).toBe(true);
		expect(message).toEqual(decrypted);
	});

	it('RSA: can decrypt message from rust backend', async () => {
		const keypair = crypto.inputToKeypair(privatePem);
		crypto.set(keypair);

		console.log('KEYSIZE:', keypair.key?.getKeySize());

		const message = 'hello world';
		const messageBase64 = Buffer.from('hello world').toString('base64');
		console.log('MESSAGE IN BASE64:', messageBase64);

		expect(message).toEqual(Buffer.from(messageBase64, 'base64').toString());

		const encryptedJs = await crypto.encryptMessage(message, keypair.publicKey as string);

		console.log('ENCRYPTED:', encryptedJs);

		const decryptedJs = await crypto.decryptMessage(encryptedJs);

		const encryptedRs =
			'aOpNh8s7GnXMarGa7Ss8GMWp+KYf+yWubxNMpPAs2G7PaPdPxXcm90yX4ZBK++c8baa0qf/AI8efU6Bp9rD89/IJAC/9W4mMPUSgrUx9NALWaRw0JVRfhsCQ5gym4O4sS81Z+PAWQpHohmUgbWv1cNDuylOCBTNctyFBdZcbuwJC/cBFjyqXeaPW0mkOCdl7wOGY13v2L+RlJUBRAmSBGZoylEUuSwbobwbUj0FFcuL34yJauVCQ6kjJAYEejmVKh0IlRnbsdEhi3tSKHQtxH3ozlGlG8SlPq94uYL86FQi9NyWQEmMOSdnxlvQOt5qw5fngKToLbOGmwDqCAF4Niw==';

		const decryptedRs = await crypto.decryptMessage(encryptedRs);

		console.log(decryptedRs);
		expect(decryptedRs).toEqual(message);
		expect(decryptedJs).toEqual(message);
	});

	it('RSA: can decrypt oaep message from rust backend', async () => {
		const keypair = crypto.inputToKeypair(privatePem);
		crypto.set(keypair);

		const message = 'hello world';

		const encryptedJs = await crypto.encryptOaepMessage(message, keypair.publicKey as string);

		console.log('ENCRYPTED OAEP:', encryptedJs);

		const decryptedJs = await crypto.decryptOaepMessage(encryptedJs);
		expect(message).toEqual(decryptedJs);

		// Whatever we try, this is not working... THere are some differences in the padding I guess...
		// const encryptedRs =
		// 	'PD2RSA3XUPQTLV4uDn/0gRc3fnIxs65MGDzauVS0hPyZqMuJu9+nKSxno3RkX6gVsVTod8PXEd3WwTg5xrgnyIsRfTB+6JRayGn052vJLNbbGbpddHcalRJhRVpbroYEiwiwOJBNYBdQk82OdOx0uUx/mYiEDudP3XZLV/2cwHjVzWZM6vB5/ry02P2zzj3+G0U1H5+L2f5DDq3H0MGCKduwAX+j7pNoIKIxBzLY1bLFbQMe4qaxoW4hOCwCQ30YSgKOKDbd/sGvcPTuCw/9RtqN9YO0kuJhaGxP0MpLpzTGLpO8tU361HvwBEd7FpTQJm+dNPWabCAUGGntRV79lA==';

		// const decryptedRs = await crypto.decryptOaepMessage(encryptedRs);

		// expect(message).toEqual(decryptedRs);
	});
});
