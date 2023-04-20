import { describe, it, expect, assert } from 'vitest'
import * as crypto from '../../../src/stores/cryptfns'

describe('Crypto test', () => {
  it('UNIT: AES: can encrypt and decrypt string with provided pin using AES', async () => {
    const secret = 'little secret'
    const pin = '123456'
    const encrypted = crypto.aes.encryptString(secret, pin)

    assert(encrypted !== secret, 'Encrypted value is the same as provided value')

    const decrypted = crypto.aes.decryptString(encrypted, pin)

    expect(decrypted).toBe(secret)
  })
})
