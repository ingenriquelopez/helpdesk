import CryptoJS from 'crypto-js';

const { REACT_APP_KEY_CRYPTO_SECRET } = process.env;

export const superPassword = (encrypted)=> {
    return CryptoJS.AES.decrypt(encrypted.trim(), REACT_APP_KEY_CRYPTO_SECRET).toString(CryptoJS.enc.Utf8).replace(/['"]+/g, '');
}

