import CryptoJS from 'crypto-js';
import { ENCRYPTION_KEY, ENCRYPTION_IV } from '@env';

// AES Encryption Functions using CryptoJS with a fixed IV

// Define encryption key (ensure the key is stored securely in a real application)
const key = CryptoJS.enc.Base64.parse(ENCRYPTION_KEY); // 256-bit key
const iv = CryptoJS.enc.Base64.parse(ENCRYPTION_IV); // 128-bit IV

// Function to encrypt data using AES with a fixed IV
export function encryptData(data) {
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
  return encrypted.toString(); // Encrypted data as a string
}

// Function to decrypt data using AES with a fixed IV
export function decryptData(encryptedData) {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });
  return decrypted.toString(CryptoJS.enc.Utf8); // Convert decrypted data to UTF-8 string
}
