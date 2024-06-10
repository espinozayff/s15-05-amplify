# DOCUMENTACIÓN DE LA API

Crea un archivo `.env` con las siguientes constantes, donde:

- `PORT` : es el puerto donde se ejecutará tu servidor.
- `DB` : es la URI de la base de datos de Mongo.
- `JWT_SECRET` : es la clave secreta utilizada para JWT.
- `JWT_KEY` : es la clave secreta para JWT que se usa para verificar el token.
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

#### Rutas de Usuarios

| Método | Ruta       | Descripción                       | Parámetros en el cuerpo          | Parámetros en la URL |
|--------|------------|-----------------------------------|----------------------------------|----------------------|
| POST   | http:/localhost:PORT/api/users     | Crea un usuario           | `username`, `email`, `password`  |                      |
| GET    | http:/localhost:PORT/api/users     | Obtener todos los usuarios        |                                  |                      |
| GET    | http:/localhost:PORT/api/users/:id | Obtener usuario por ID         |                                  | `id`                 |
| PUT    | http:/localhost:PORT/api/users/:id | Actualizar usuario por ID      | `username`, `email`, `password`  | `id`                 |
| DELETE | http:/localhost:PORT/api/users/:id | Eliminar usuario por ID        |                                  | `id`                 |

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

#### Rutas de Música

| Método | Ruta       | Descripción                       | Parámetros en el cuerpo       | Parámetros en la URL |
|--------|------------|-----------------------------------|-------------------------------|----------------------|
| POST   | http:/localhost:PORT/api/tracks     | Crea una canción           | `title`, `genre: {name, id}`, `id_user`, `songData`, `date`, `image` |                      |
| GET    | http:/localhost:PORT/api/tracks     | Obtener canción por ID       |       `query: Busqueda por parametro `                        |                      |
| GET    | http:/localhost:PORT/api/tracks/:id | Obtener canción por ID        |                               | `id`                 |
| PUT    | http:/localhost:PORT/api/tracks/:id | Actualizasr canción por ID     | `title`, `genre: {name, id}`, `image`, `date` | `id`                 |
| DELETE | http:/localhost:PORT/api/tracks/:id | Eliminar canción por ID       |                               | `id`                 |


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

#### Rutas de Álbum de Música

| Método | Ruta           | Descripción                       | Parámetros en el cuerpo  | Parámetros en la URL |
|--------|----------------|-----------------------------------|--------------------------|----------------------|
| POST   | http:/localhost:PORT/api/albums        | Crear un nuevo álbum de música    | `Name`, `genre`, `Music`, `id_user` |                      |
| GET    | http:/localhost:PORT/api/albums        | Obtener todos los álbumes         |                          |                      |
| GET    | http:/localhost:PORT/api/albums/:id    | Obtener un álbum por ID           |                          | `id`                 |
| PUT    | http:/localhost:PORT/api/albums/:id    | Actualizar un álbum por ID        | `Name`, `genre`, `Music` | `id`                 |
| DELETE | http:/localhost:PORT/api/albums/:id    | Eliminar un álbum por ID          |                          | `id`                 |


### Eventos

#### Esquema de Eventos

| Clave   | Tipo   | Requerido |
| :------ | :----- | :-------- |
| Title   | string | true      |
| Text    | string | true      |
| id_user | string | true      |
| date    | date   | true      |
| image   | string | false     |

### Genero

#### Esquema de Genero

| Clave   | Tipo   | Requerido |
| :------ | :----- | :-------- |
| name   | string | true      |
| soundTracks    | array[ObjectId] | false      |
| image   | string | false     |

#### Rutas de Genero

| Método | Ruta       | Descripción                       | Parámetros en el cuerpo       | Parámetros en la URL |
|--------|------------|-----------------------------------|-------------------------------|----------------------|
| POST   | http:/localhost:PORT/api/genrer     | Crea una canción           | `name`, `image` |                      |
| GET    | http:/localhost:PORT/api/genrer     | Obtener canción por ID       |                               |                      |
| GET    | http:/localhost:PORT/api/genrer/:id | Obtener canción por ID        |                               | `id`                 |
| PUT    | http:/localhost:PORT/api/genrer/:id | Actualizasr canción por ID     | `soundTracks` | `id`                 |
| PUT    | http:/localhost:PORT/api/genrer/image/:id | Actualizasr canción por ID     |`image` | `id`                 |
| DELETE | http:/localhost:PORT/api/genrer/:id | Eliminar canción por ID       |                               | `id`                 |