import { Attribute } from './types';
/**
 * Hashes a TLS DID Contract
 *
 * @param {string} domain - TLS DID domain
 * @param {string} address - TLS DID Contract address
 * @param {Attribute[]} attributes - Additional TLS DID Documents attributes
 * @param {Date} expiry - TLS DID Contract expiry
 * @param {string[][]} chains - TLS DID Contract certificate chains
 */
export declare function hashContract(domain: string, address: string, attributes?: Attribute[], expiry?: Date, chains?: string[][]): string;
/**
 * Signs data with pem private key
 * @param {string} key - Signing key in pem format
 * @param {string} data
 */
export declare function sign(key: string, data: string): string;
/**
 * Verifies if signature is correct
 *
 * @param {string} pemCert - public pem certificate
 * @param {string} signature - signature of data signed with private pem certificate
 * @param {string} data - data that has been signed
 */
export declare function verify(pemCert: string, signature: string, data: string): boolean;
