import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Bcrypt Functions

export function hashData(data) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
}

export function compareHash(data, hashedData) {
  return bcrypt.compareSync(data, hashedData);
}

// AES Encryption Functions using CryptoJS with key and IV from .env

// Load the encryption key and IV from environment variables
const key = CryptoJS.enc.Base64.parse(process.env.ENCRYPTION_KEY);
const iv = CryptoJS.enc.Base64.parse(process.env.ENCRYPTION_IV);

if (!key || !iv) {
  console.error("Encryption key or IV is not properly loaded from .env file.");
}

// Function to encrypt data using AES with the loaded key and IV
export function encryptData(data) {
  if (!data) {
    console.error("No data provided for encryption.");
    return;
  }
  console.log("Encrypting data:", data);
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });
  const encryptedString = encrypted.toString();
  console.log("Encrypted data:", encryptedString);
  return encryptedString; // Encrypted data as a string
}

// Function to decrypt data using AES with the loaded key and IV
export function decryptData(encryptedData) {
  if (!encryptedData) {
    console.error("No encrypted data provided for decryption.");
    return;
  }
  console.log("Decrypting data:", encryptedData);
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv });
  const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
  console.log("Decrypted data:", decryptedString);
  return decryptedString; // Convert decrypted data to UTF-8 string
}
