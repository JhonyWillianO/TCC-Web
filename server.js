const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); // Importando o pacote cors

// Criar a aplicação Express
const app = express();

// Habilitar o CORS para todas as rotas
app.use(cors());  // Isso permitirá qualquer origem 

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do banco de dados
  user: 'root', // Usuário MySQL
  password: '1265', // Senha MySQL
  database: 'lanchonete', // Nome do banco de dados
});

// Testar a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados MySQL!');
});

// Rota para obter dados
app.get('/api/dados', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      res.status(500).send('Erro ao consultar os dados');
      return;
    }
    res.json(results); // Retorna os dados no formato JSON
  });
});

// Definir porta e iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

const path = require('path');

// Servir arquivos estáticos da pasta onde está o index.html e scripts.js
app.use(express.static(path.join(__dirname, 'public')));

// Configurar uma rota para a página inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});