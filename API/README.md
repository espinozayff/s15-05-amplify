# DOCUMENTACIÓN DE LA API

Crea un archivo `.env` con las siguientes constantes, donde:

- `PORT` : es el puerto donde se ejecutará tu servidor.
- `DB` : es la URI de la base de datos de Mongo.
- `JWT_SECRET` : es la clave secreta utilizada para JWT.
- `SECRET`: es el secreto de la sesión.
- `CLOUDINARY_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Instala las dependencias con `npm i`.
Ejecuta el servidor con `npm run dev` (desarrollo) o `npm start` (producción).

## Referencia de la API

### Usuarios

#### Esquema de Usuario

| Clave       | Tipo            | Requerido |
| :---------- | :-------------- | :-------- |
| username    | string          | true      |
| email       | string          | true      |
| password    | string          | true      |
| avatar      | string          | false     |
| playlist    | array[ObjectId] | false     |
| music album | array[ObjectId] | false     |
| favorites   | array[ObjectId] | false     |
| events      | array[ObjectId] | false     |

### Música

#### Esquema de Música

| Clave   | Tipo    | Requerido |
| :------ | :------ | :-------- |
| title   | string  | true      |
| genre   | string  | true      |
| id_user | string  | true      |
| URL     | string  | true      |
| Likes   | array[] | false     |
| image   | string  | false     |
| date    | date    | true      |

### Lista de Reproducción

#### Esquema de Lista de Reproducción

| Clave   | Tipo            | Requerido |
| :------ | :-------------- | :-------- |
| Name    | string          | true      |
| Music   | array[ObjectId] | true      |
| id_user | string          | true      |

### Álbum de Música

#### Esquema de Álbum de Música

| Clave   | Tipo            | Requerido |
| :------ | :-------------- | :-------- |
| Name    | string          | true      |
| genre   | string          | true      |
| Music   | array[ObjectId] | true      |
| id_user | string          | true      |

### Eventos

#### Esquema de Eventos

| Clave   | Tipo   | Requerido |
| :------ | :----- | :-------- |
| Title   | string | true      |
| Text    | string | true      |
| id_user | string | true      |
| date    | date   | true      |
| image   | string | false     |