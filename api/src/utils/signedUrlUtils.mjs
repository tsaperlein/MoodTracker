import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// Load the encryption key from environment variables
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error("ENCRYPTION_KEY is not defined in the environment variables");
}

export function generateSignedUrl(url, expires) {
  const signature = CryptoJS.HmacSHA256(url + expires, ENCRYPTION_KEY).toString(
    CryptoJS.enc.Hex
  );
  return `${url}?expires=${expires}&signature=${signature}`;
}

export function validateSignedUrl(url, providedSignature, expirationTime) {
  const baseUrl = url.split("?")[0]; // Remove the query string from the URL
  const stringToValidate = baseUrl + expirationTime; // Concatenate the URL and expiration time
  const expectedSignature = CryptoJS.HmacSHA256(
    stringToValidate,
    ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Hex);

  if (expectedSignature !== providedSignature) {
    throw new Error("Invalid signature");
  }

  if (Math.floor(Date.now() / 1000) > expirationTime) {
    throw new Error("URL has expired");
  }

  return true;
}
