# Sistema de Hotel para Animais - API

Este documento detalha a instalação, execução e uso da API do sistema de hotel para animais.

## Requisitos

- Node.js
- TypeScript
- PostgreSQL

## Instalação

### 1. Instalando dependências

```bash
npm install express typeorm reflect-metadata pg body-parser
npm install -D typescript ts-node @types/node @types/express @types/body-parser
```

### 2. Criando o arquivo tsconfig.json

Se ainda não existir, crie com:

```bash
npx tsc --init
```

Certifique-se de que as configurações estejam compatíveis, por exemplo:

```json
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "strict": false,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### 3. Configure o Banco de Dados

* Arquivo: `src/application/data-source.ts`
* O projeto está configurado para se conectar a um banco de dados PostgreSQL local. Ajuste o usuário (`username`) e a senha (`password`) conforme sua instalação local.
* Certifique-se de que exista um banco de dados com o nome `animalsHotel`.

```typescript
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "sua_senha_aqui", // Altere conforme necessário
    database: "animalsHotel",
    synchronize: true,
    logging: true,
    entities: [__dirname + "/entity/*.{ts,js}"],
    migrations: [],
    subscribers: [],
})
```

## Executando o Projeto

### Instalar dependências

```bash
npm install
```

### Modo Desenvolvimento

```bash
npm run dev
```

### Modo Produção

```bash
npm run build
npm start
```

O servidor estará rodando em `http://localhost:8080`

## Endpoints da API

### Usuários

#### Criar Usuário

```bash
POST http://localhost:8080/users
Content-Type: application/json

{
  "nome": "Admin",
  "senha": "123"
}
```

#### Listar Usuários

```bash
GET http://localhost:8080/users
```

#### Buscar Usuário por ID

```bash
GET http://localhost:8080/users/1
```

#### Buscar Usuário por Nome

```bash
GET http://localhost:8080/users/name/Admin
```

#### Editar Usuário

```bash
PUT http://localhost:8080/users/1
Content-Type: application/json

{
  "nome": "Admin Atualizado"
}
```

#### Deletar Usuário

```bash
DELETE http://localhost:8080/users/1
```

### Tutores

#### Criar Tutor

```bash
POST http://localhost:8080/tutores
Content-Type: application/json

{
  "nome": "João da Silva",
  "sexo": "M",
  "nascimento": "1990-01-01",
  "telefone": "99999-9999",
  "endereco": "Rua das Flores, 123",
  "usuarioCadastroId": 1
}
```

#### Listar Tutores

```bash
GET http://localhost:8080/tutores
```

#### Buscar Tutor por ID

```bash
GET http://localhost:8080/tutores/1
```

#### Buscar Tutor por Nome

```bash
GET http://localhost:8080/tutores/name/João da Silva
```

#### Editar Tutor

```bash
PUT http://localhost:8080/tutores/1
Content-Type: application/json

{
  "telefone": "88888-8888",
  "endereco": "Nova Rua, 456"
}
```

#### Deletar Tutor

```bash
DELETE http://localhost:8080/tutores/1
```

### Animais

#### Criar Animal

```bash
POST http://localhost:8080/animais
Content-Type: application/json

{
  "especie": "Cachorro",
  "nome": "Rex",
  "raca": "Labrador",
  "tutorId": 1,
  "usuarioCadastroId": 1
}
```

#### Listar Animais

```bash
GET http://localhost:8080/animais
```

#### Buscar Animal por ID

```bash
GET http://localhost:8080/animais/1
```

#### Buscar Animal por Nome

```bash
GET http://localhost:8080/animais/name/Rex
```

#### Editar Animal

```bash
PUT http://localhost:8080/animais/1
Content-Type: application/json

{
  "nome": "Rex Junior",
  "raca": "Vira-lata"
}
```

#### Deletar Animal

```bash
DELETE http://localhost:8080/animais/1
```

## No Insomnia

#### Importando arquivo de requisições

1. Faça login no Inisomnia
2. Importe o arquivo *.yaml* em **Collections > Import** disponível no projeto **/animalhotels/backend/insomnia_collection_file**

A collection **ANIMALS HOTEL** deve aparecer

