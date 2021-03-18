import { rootCertificates } from 'tls';
import { readFileSync } from 'fs';
import { sign, hashContract, verify } from '../utils';

const keyPath = '/ssl/private/privKey.pem';
const certPath = '/ssl/certs/cert.pem';
const certRevokedPath = '/ssl/certs/certRevoked.pem';
const intermediateCertPath = '/ssl/certs/intermediateCert.pem';
const intermediateRevokedCertPath = '/ssl/certs/intermediateRevokedCert.pem';
let privKey: string;
let cert: string;
let certRevoked: string;
let intermediateCert: string;
let intermediateRevokedCert: string;

describe('Utils', () => {
  beforeAll(() => {
    privKey = readFileSync(__dirname + keyPath, 'utf8');
    cert = readFileSync(__dirname + certPath, 'utf8');
    certRevoked = readFileSync(__dirname + certRevokedPath, 'utf8');
    intermediateCert = readFileSync(__dirname + intermediateCertPath, 'utf8');
    intermediateRevokedCert = readFileSync(
      __dirname + intermediateRevokedCertPath,
      'utf8'
    );
  });

  it('should encrypt and decrypt object with undefined values', async () => {
    const hash = hashContract('example.org');
    const signature = sign(privKey, hash);
    const valid = verify(cert, signature, hash);
    expect(valid).toBeTruthy();
  });

  it('should encrypt and decrypt full object', async () => {
    const hash = hashContract(
      'example.org',
      [{ path: 'parent/child', value: 'value' }],
      new Date(),
      [cert, intermediateCert]
    );
    const signature = sign(privKey, hash);
    const valid = verify(cert, signature, hash);
    expect(valid).toBeTruthy();
  });
});
