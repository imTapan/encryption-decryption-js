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

    <div class="input-group" v-if="encryptedData" style="margin-top: 40px">
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
<style>
body {
  font-family: "Arial", sans-serif;
  background-color: #f4f7fa;
  color: #333;
  margin: 0;
  padding: 20px;
}

.container {
  max-width: 600px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

h1 {
  color: #0056b3;
  text-align: center;
}

h2 {
  color: #007bff;
}

h3 {
  color: #555;
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

textarea,
input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  width: 100%;
}

button:hover {
  background-color: #0056b3;
}

/* Result Section */
.result {
  background-color: #e9f7fe; /* Light blue background for results */
  border: 1px solid #b0e0ff; /* Light blue border */
  border-radius: 4px;
  padding: 15px;
  margin-top: 20px;
}

/* Responsive Design */
@media (max-width: 600px) {
  .container {
    padding: 15px;
  }
}
</style>
