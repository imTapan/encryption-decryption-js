<template>Hello World</template>
<script setup>
import encryptionMethods from "./utils/methods.js";

const { easyEncryption } = encryptionMethods();
const rawData = "#Rfui*&F^W763437ffdfew";

const getEncrypted = easyEncryption(rawData);
console.log(getEncrypted);
</script>
