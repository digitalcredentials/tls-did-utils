import { createSign, createVerify } from 'crypto';
import hash from 'object-hash';
import { providers } from 'ethers';
import { Attribute, ProviderConfig } from './types';

/**
 * Hashes a TLS DID Contract
 *
 * @param {string} domain - TLS DID domain
 * @param {string} address - TLS DID Contract address
 * @param {Attribute[]} attributes - Additional TLS DID Documents attributes
 * @param {Date} expiry - TLS DID Contract expiry
 * @param {string[][]} chains - TLS DID Contract certificate chains
 */
export function hashContract(
  domain: string,
  attributes: Attribute[] = [],
  expiry: Date = null,
  chains: string[] = []
): string {
  return hash({ domain, attributes, expiry, chains });
}

/**
 * Signs data with pem private key
 * @param {string} key - Signing key in pem format
 * @param {string} data
 */
export function sign(key: string, data: string): string {
  const signer = createSign('sha256');
  signer.update(data);
  signer.end();
  const signature = signer.sign(key).toString('base64');
  return signature;
}

/**
 * Verifies if signature is correct
 *
 * @param {string} pemCert - public pem certificate
 * @param {string} signature - signature of data signed with private pem certificate
 * @param {string} data - data that has been signed
 */
export function verify(
  pemCert: string,
  signature: string,
  data: string
): boolean {
  const signatureBuffer = Buffer.from(signature, 'base64');
  const verifier = createVerify('sha256');
  verifier.update(data);
  verifier.end();
  const valid = verifier.verify(pemCert, signatureBuffer);
  return valid;
}

/**
 * Returns the configured provider
 * @param {ProviderConfig} conf - Configuration for provider
 */
export function configureProvider(
  conf: ProviderConfig = {}
): providers.Provider {
  if (conf?.provider) {
    return conf?.provider;
  } else if (conf?.rpcUrl) {
    return new providers.JsonRpcProvider(conf.rpcUrl);
  } else if (conf?.web3) {
    return new providers.Web3Provider(conf.web3.currentProvider);
  } else {
    return new providers.JsonRpcProvider('http://localhost:8545');
  }
}
