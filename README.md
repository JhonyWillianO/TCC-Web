# Projeto TCC - Sistema de Vendas Online para Lanchonete Espaço Jasmim

Este repositório contém o código-fonte do projeto de **TCC** desenvolvido para o sistema de **vendas online** da **Lanchonete Espaço Jasmim**. O objetivo deste projeto é criar uma plataforma de e-commerce eficiente, permitindo que os clientes façam pedidos online e que a administração da lanchonete gerencie os produtos e pedidos de forma simples e eficaz.

## Tecnologias Utilizadas

- **Frontend:** HTML, CSS e JavaScript
- **Backend:** Node.js
- **Banco de Dados:** MySQL
- **Hospedagem:**Netlify 

## Pré-requisitos

Antes de rodar o projeto, você precisa ter algumas ferramentas instaladas no seu computador.

### 1. Visual Studio Code

Recomendamos o **Visual Studio Code** como editor de código para o projeto.

- **Link para download:** [Visual Studio Code](https://code.visualstudio.com/)

### 2. MySQL

O projeto utiliza **MySQL** como banco de dados. Você pode instalar o MySQL seguindo os passos abaixo.

- **Link para download:** [MySQL Installer](https://dev.mysql.com/downloads/installer/)

#### Como criar o banco de dados:
Após instalar o MySQL, crie o banco de dados para o projeto com o comando SQL:

```sql CREATE DATABASE lanchonete;

3. Instalando o Node.js
O Node.js é uma plataforma necessária para rodar o backend deste projeto. Para instalá-lo:

Acesse o site oficial do Node.js: https://nodejs.org/
Faça o download da versão recomendada para seu sistema operacional.
Siga as instruções de instalação.
4. Instalando Dependências
Após instalar as ferramentas acima, clone este repositório para sua máquina local:

bash
Copiar código
git clone https://github.com/usuario/repo-tcc.git
cd repo-tcc
Agora, instale as dependências do projeto backend (Node.js) e frontend (React):

Para o backend (Node.js):
bash
Copiar código
cd backend
npm install
Para o frontend (React):
bash
Copiar código
cd frontend
npm install
5. Configurando o Banco de Dados no Projeto
Crie um arquivo .env na pasta do backend e adicione a configuração do banco de dados:
env
Copiar código
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=espacojasmim
Execute as migrações do banco de dados (se necessário):
bash
Copiar código
cd backend
npm run migrate
6. Rodando o Projeto Localmente
Após as configurações, inicie o servidor backend e o frontend:

Backend:
bash
Copiar código
cd backend
npm start
Frontend:
bash
Copiar código
cd frontend
npm start
Agora, o projeto estará rodando localmente em http://localhost:3000.

Links Importantes
World do TCC - Documentação Completa
Site da Lanchonete Espaço Jasmim - Acesso ao Sistema
markdown
Copiar código

### Dicas para o GitHub:

1. **Markdown:** O arquivo deve ser salvo como `README.md` para ser renderizado corretamente no GitHub.
2. **Links:** Substitua `https://linkdadoworlddotcc.com` e `https://linkdositehospedado.com` pelos links reais do seu projeto.
3. **GitHub:** Caso o repositório seja privado, recomende que os usuários usem chaves SSH para clonar o repositório, ou forneça as instruções para acesso privado, se necessário.

Esse modelo estará bem estruturado e profissional para ser usado no GitHub.
















