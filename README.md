# AnimalHotels - Frontend

Este é o frontend da aplicação **AnimalHotels**, desenvolvido com **React**, **TypeScript** e **Vite**. O sistema permite o gerenciamento de um hotel para animais, incluindo controle de usuários, tutores e os próprios animais hospedados.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* **Node.js** (versão 22 ou superior)
* **NPM** (gerenciador de pacotes padrão do Node)

**Importante:** Para que este frontend funcione, o **Backend** deve estar rodando localmente na porta `8080`. O frontend utiliza um Proxy configurado no Vite para se comunicar com o backend sem erros de CORS.

## Instalação

1.  Abra o terminal na pasta do projeto frontend:
    ```bash
    cd animalhotels
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

## Como Rodar

1.  Certifique-se de que o **Backend** já esteja rodando em outro terminal (`npm start` na pasta do backend).

2.  Inicie o servidor de desenvolvimento do frontend:
    ```bash
    npm run dev
    ```

3.  O terminal mostrará o endereço local (geralmente `http://localhost:5173`). Abra este endereço no seu navegador.

## Guia de Uso

### 1. Login Inicial
Ao abrir a aplicação, você verá a tela de login.
* O sistema valida o **Nome de Usuário** e a **Senha** cadastrados no banco de dados.
* Caso seja o primeiro acesso e o banco esteja vazio, certifique-se de ter criado um usuário via API/Insomnia (ex: `admin` / `123`).

### 2. Dashboard
Após o login, você será direcionado ao Painel de Controle. No topo, há um cabeçalho fixo com seu nome e o botão de **Sair**.
No centro, você tem acesso rápido aos módulos:
* **Gerenciar Tutores**
* **Gerenciar Animais**
* **Gerenciar Usuários**

### 3. Gerenciar Tutores
* **Listagem:** Veja todos os tutores cadastrados com nome, endereço e telefone.
* **Novo Tutor:** Clique no botão verde para cadastrar alguém.
* **Ações:** Use os botões "Editar" ou "Excluir" em cada linha.
    * *Nota:* O sistema impede a exclusão de um tutor caso ele possua animais vinculados.

### 4. Gerenciar Animais
* **Listagem:** Exibe o animal, espécie, raça e o nome do tutor responsável.
* **Novo Animal (Funcionalidade Especial):**
    * Ao cadastrar um animal, você pode selecionar um **Tutor Existente** na lista.
    * OU marcar a opção **"Cadastrar novo Tutor?"**. Isso abrirá campos extras para registrar o tutor e o animal de uma só vez.

### 5. Gerenciar Usuários
* Permite criar outros acessos ao sistema (ex: recepcionistas, administradores).
* **Proteção:** O sistema não permite que você exclua o seu próprio usuário logado.
