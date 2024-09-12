# Bravi Avaliação

Este projeto é um aplicativo React que exibe uma lista de pessoas e seus contatos. A página de detalhes de cada pessoa permite a adição, edição e exclusão de contatos. O aplicativo consome uma API para buscar e gerenciar os dados.

## Requisitos

- Node.js (versão 14 ou superior)
- npm
- Docker (opcional, para executar a API)

## Instalação

### 1. Clone o repositório

```
git clone https://github.com/Gustaft86/bravi-avaliacao-3.git
cd bravi-avaliacao-3
```

### 2. Instale as dependências

Use npm ou yarn para instalar as dependências do projeto:

```
npm install
```

### 3. Configuração da API

O aplicativo depende da API para funcionar corretamente. Você pode usar a API fornecida neste repositório: bravi-avaliacao-2. Para subir a API:

- Clone o repositório da API:

```
git clone https://github.com/Gustaft86/bravi-avaliacao-2.git
cd bravi-avaliacao-2
```

- Suba a API usando Docker (opcional):

Se você tem Docker instalado, você pode subir a API com o comando:

```
docker-compose up
```

- Caso contrário, instale as dependências e inicie a API manualmente:

```
npm install
npm start
```

A API deve estar disponível em http://localhost:3001/api.

### 4. Executando o aplicativo

Após configurar a API, você pode iniciar o aplicativo com o comando:

```
npm start
```

O aplicativo será iniciado e estará disponível em http://localhost:3000.

## Estrutura do Projeto

- **src/components/PersonList.js:** Componente que exibe a lista de pessoas.
- **src/components/PersonDetails.js:** Componente que exibe os detalhes de uma pessoa e seus contatos.
- **src/redux/ContactSlice.js:** Gerencia o estado dos contatos usando Redux Toolkit.
- **src/api/ContactsApi.js:** Define as funções para interagir com a API.

## Scripts

- **npm start:** Inicia o servidor de desenvolvimento.
- **npm run build:** Cria uma versão otimizada do aplicativo para produção.
- **npm test:** Executa os testes.
