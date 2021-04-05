import { providers, Event } from 'ethers';
import { Attribute, ProviderConfig } from './types';
/**
 * Hashes a TLS DID Contract
 *
 * @param {string} domain - TLS DID domain
 * @param {string} address - TLS DID Contract address
 * @param {Attribute[]} attributes - Additional TLS DID Documents attributes
 * @param {Date} expiry - TLS DID Contract expiry
 * @param {string[][]} chains - TLS DID Contract certificate chains
 *
 * @returns {string}
 */
export declare function hashContract(domain: string, attributes?: Attribute[], expiry?: Date, chains?: string[]): string;
/**
 * Signs data with pem private key
 * @param {string} key - Signing key in pem format
 * @param {string} data
 *
 * @returns {string}
 */
export declare function sign(key: string, data: string): string;
/**
 * Verifies if signature is correct
 *
 * @param {string} pemCert - public pem certificate
 * @param {string} signature - signature of data signed with private pem certificate
 * @param {string} data - data that has been signed
 *
 * @returns {boolean}
 */
export declare function verify(pemCert: string, signature: string, data: string): boolean;
/**
 * Returns the configured provider
 * @param {ProviderConfig} conf - Configuration for provider
 *
 * @returns {providers.Provider}
 */
export declare function configureProvider(conf?: ProviderConfig): providers.Provider;
/**
 * Sorts events by descending previousChange previousChange block number
 * @param {Event[]} events - Ethers event array
 *
 * @returns {Event[]} Sorted ethers event array
 */
export declare function sortEvents(events: Event[]): Event[];
