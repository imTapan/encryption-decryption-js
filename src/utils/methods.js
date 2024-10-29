export default function encryptionMethods() {
  function easyEncryption(text, key) {
    let encryptedText = "";
    for (let i = 0; i < text.length; i++) {
      const textCharCode = text.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length); // Loop through key
      const shift = keyCharCode % 256; // Use key's char code for shifting
      const encryptedCharCode = textCharCode + shift; // Shift character code
      encryptedText += String.fromCharCode(encryptedCharCode); // Convert back to character
    }
    return encryptedText;
  }

  function easyDecryption(encryptedText, key) {
    let decryptedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
      const encryptedCharCode = encryptedText.charCodeAt(i);
      const keyCharCode = key.charCodeAt(i % key.length); // Loop through key
      const shift = keyCharCode % 256; // Use key's char code for shifting
      const decryptedCharCode = encryptedCharCode - shift; // Reverse the shift
      decryptedText += String.fromCharCode(decryptedCharCode); // Convert back to character
    }
    return decryptedText;
  }

  return {
    easyEncryption,
    easyDecryption,
  };
}
