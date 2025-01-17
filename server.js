const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve os arquivos estáticos (HTML, JS, CSS)
app.use(express.static(path.join(__dirname, '')));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
