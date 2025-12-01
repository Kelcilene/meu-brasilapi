# 🇧🇷 Meu Brasil API: Sistema Fullstack Seguro e Otimizado

Este é um projeto Fullstack desenvolvido para o teste de avaliação, demonstrando a criação de uma API RESTful segura e com foco em performance, utilizando Node.js/Express no Back-end e React/Vite no Front-end.

O Back-end simula um sistema de gerenciamento de dados com autenticação JWT e consultas à API externa Brasil API (CEP).

## ✨ Funcionalidades Principais

| Categoria | Funcionalidade | Implementação |
| :--- | :--- | :--- |
| **Autenticação** | Login de Usuário | Geração e validação de **Token JWT** para rotas protegidas. |
| **Segurança** | Proteção de Senhas | **`bcrypt`** para hash e comparação de senhas. |
| **CRUD** | Inserção de Dados | Rota `POST /api/inserir` (protegida). |
| **Busca** | Consulta de Dados Internos | Rota `GET /api/buscar?q=` (protegida). |
| **API Externa** | Consulta de CEP | Rota `GET /api/cep/:cep` (integração com **Brasil API**). |

---

## 🛡️ Segurança e Otimização de Performance

Este projeto foi construído seguindo as melhores práticas de segurança e performance, atendendo aos requisitos avançados:

### 1. Prevenção de Falhas de Injeção (Injection)
A principal defesa contra **SQL Injection** é implementada em todas as consultas ao banco de dados (SQLite) através do uso de **Prepared Statements / Placeholders (`?`)** no `DataModel.js`.

### 2. Prevenção de XSS (Cross-Site Scripting)
A defesa contra XSS é garantida pela aplicação do *middleware* **`helmet`** no Back-end (`server.js`), que configura cabeçalhos HTTP de segurança para mitigar ataques no navegador.

### 3. Estratégia de Cache
Para otimizar a performance, foi implementado um **Middleware de Cache In-Memory** (`utils/cache.js`) que:
* Armazena respostas de requisições **`GET`** por um período (ex: 1 hora para CEP, 5 minutos para Busca Interna).
* Reduz a latência e a carga no banco de dados, servindo dados imediatamente do cache.

---

## ⚙️ Como Rodar o Projeto (Fullstack)

### Pré-requisitos
* Node.js (versão 18+)
* npm (ou yarn)
* **Postman** (recomendado para testes da API)

### 1. Configuração Inicial

1.  Clone o repositório.
2.  Navegue para a pasta raiz do projeto.

### 2. Configuração do Back-end

Navegue para a pasta `backend` e instale as dependências:

```bash
cd backend
npm install


Arquivo de Variáveis de Ambiente (.env): Crie um arquivo chamado .env na pasta backend com a sua chave secreta JWT:

JWT_SECRET="sua_chave_secreta_aqui"

Inicialização do Banco de Dados (SQLite): Execute o script de seed para criar o banco de dados e um usuário padrão:
Bash

node seed-user.js

    Usuário de Teste: admin

    Senha de Teste: senha123

Iniciar o Servidor:
Bash

node server.js

O Back-end rodará em http://localhost:3001.

3. Configuração do Front-end (React)

Abra um novo terminal, navegue para a pasta frontend e instale as dependências:
Bash

cd frontend
npm install

Iniciar a Aplicação React:
Bash

npm run dev

O Front-end rodará em http://localhost:5173.

🧪 Teste de Autenticação (Login)

    Acesse o Front-end (http://localhost:5173).

    Use as credenciais: admin / senha123.

    O sucesso redirecionará para a Dashboard, onde você pode testar a Inserção, Busca e o consumo da API de CEP.