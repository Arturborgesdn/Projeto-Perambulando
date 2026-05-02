require('dotenv').config();
const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.log("CHAVE NÃO ENCONTRADA NO .ENV");
} else {
  console.log("CHAVE ENCONTRADA. COMEÇA COM:", key.substring(0, 5));
  console.log("TAMANHO DA CHAVE:", key.length);
}
