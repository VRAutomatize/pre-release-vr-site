import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuração do __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Roteamento para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${port}`);
});