<template>
  <div class="container">
    <h1>Text Encryption Tool</h1>

    <div class="input-group">
      <label for="textInput">Enter Text:</label>
      <textarea
        id="textInput"
        v-model="rawData"
        placeholder="Enter text to encrypt..."
      ></textarea>
    </div>

    <div class="input-group">
      <label for="keyInput">Enter Encryption Key:</label>
      <input
        type="text"
        id="keyInput"
        v-model="encryptionKey"
        placeholder="Enter your key..."
      />
    </div>

    <button @click="encryptText">Encrypt</button>

    <div v-if="encryptedData" class="result">
      <h2>Encrypted Data:</h2>
      <p>{{ encryptedData }}</p>
      <button @click="copyToClipboard(encryptedData)">
        Copy Encrypted Data
      </button>
      <h3>Decryption Instructions:</h3>
      <p>
        To decrypt the data, use the same key:
        <strong>{{ encryptionKey }}</strong>
      </p>
    </div>

    <div class="input-group" v-if="encryptedData">
      <label for="decryptionKeyInput">Enter Decryption Key:</label>
      <input
        type="text"
        id="decryptionKeyInput"
        v-model="decryptionKey"
        placeholder="Enter your key to decrypt..."
      />
    </div>

    <button v-if="encryptedData" @click="decryptText">Decrypt</button>

    <div v-if="decryptedData" class="result">
      <h2>Decrypted Data:</h2>
      <p>{{ decryptedData }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import encryptionMethods from "./utils/methods.js";

const { easyEncryption, easyDecryption } = encryptionMethods();
const rawData = ref("");
const encryptionKey = ref("");
const encryptedData = ref("");
const decryptionKey = ref("");
const decryptedData = ref("");

function encryptText() {
  if (rawData.value && encryptionKey.value) {
    encryptedData.value = easyEncryption(rawData.value, encryptionKey.value);
    decryptedData.value = ""; // Reset decrypted data
    decryptionKey.value = ""; // Reset decryption key
  } else {
    alert("Please enter both text and a key.");
  }
}

function decryptText() {
  if (decryptionKey.value) {
    decryptedData.value = easyDecryption(
      encryptedData.value,
      decryptionKey.value
    );
  } else {
    alert("Please enter the decryption key.");
  }
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Encrypted data copied to clipboard!");
    })
    .catch((err) => {
      console.error("Could not copy text: ", err);
    });
}
</script>
