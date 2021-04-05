"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortEvents = exports.configureProvider = exports.verify = exports.sign = exports.hashContract = void 0;
var crypto_1 = require("crypto");
var object_hash_1 = __importDefault(require("object-hash"));
var ethers_1 = require("ethers");
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
function hashContract(domain, attributes, expiry, chains) {
    if (attributes === void 0) { attributes = []; }
    if (expiry === void 0) { expiry = null; }
    if (chains === void 0) { chains = []; }
    return object_hash_1.default({ domain: domain, attributes: attributes, expiry: expiry, chains: chains });
}
exports.hashContract = hashContract;
/**
 * Signs data with pem private key
 * @param {string} key - Signing key in pem format
 * @param {string} data
 *
 * @returns {string}
 */
function sign(key, data) {
    var signer = crypto_1.createSign('sha256');
    signer.update(data);
    signer.end();
    var signature = signer.sign(key).toString('base64');
    return signature;
}
exports.sign = sign;
/**
 * Verifies if signature is correct
 *
 * @param {string} pemCert - public pem certificate
 * @param {string} signature - signature of data signed with private pem certificate
 * @param {string} data - data that has been signed
 *
 * @returns {boolean}
 */
function verify(pemCert, signature, data) {
    var signatureBuffer = Buffer.from(signature, 'base64');
    var verifier = crypto_1.createVerify('sha256');
    verifier.update(data);
    verifier.end();
    var valid = verifier.verify(pemCert, signatureBuffer);
    return valid;
}
exports.verify = verify;
/**
 * Returns the configured provider
 * @param {ProviderConfig} conf - Configuration for provider
 *
 * @returns {providers.Provider}
 */
function configureProvider(conf) {
    if (conf === void 0) { conf = {}; }
    if (conf === null || conf === void 0 ? void 0 : conf.provider) {
        return conf === null || conf === void 0 ? void 0 : conf.provider;
    }
    else if (conf === null || conf === void 0 ? void 0 : conf.rpcUrl) {
        return new ethers_1.providers.JsonRpcProvider(conf.rpcUrl);
    }
    else if (conf === null || conf === void 0 ? void 0 : conf.web3) {
        return new ethers_1.providers.Web3Provider(conf.web3.currentProvider);
    }
    else {
        return new ethers_1.providers.JsonRpcProvider('http://localhost:8545');
    }
}
exports.configureProvider = configureProvider;
/**
 * Sorts events by descending previousChange previousChange block number
 * @param {Event[]} events - Ethers event array
 *
 * @returns {Event[]} Sorted ethers event array
 */
function sortEvents(events) {
    return events.sort(function (a, b) {
        return a.args.previousChange.toNumber() > b.args.previousChange.toNumber()
            ? -1
            : b.args.previousChange.toNumber() > a.args.previousChange.toNumber()
                ? 1
                : 0;
    });
}
exports.sortEvents = sortEvents;
//# sourceMappingURL=utils.js.map