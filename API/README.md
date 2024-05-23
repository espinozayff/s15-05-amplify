# API DOCUMENTATION 

Create an .env file with the following constants, where:
   - PORT : is the port where you go to run your server.
   - DB : is the URI of the mongo database.
   - JWT_SECRET : is the secret key used for JWT
   - SECRET: is the session secret
   - CLOUDINARY_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - GMAIL_USER
   - GMAIL_PASS

Install the dependencies with npm i
Run the server with npm run dev (development) or npm start (production)

## API Reference

### Users

### User schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| username | string | true |
| email | string | true |
| password | string | true |
| avatar | string | false |
| playlist | array[ObjectId] | false |
| music album | array[ObjectId] | false |
| favorites | array[ObjectId] | false |
| events | array[ObjectId] | false |

### Music

### Music schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| title | string | true |
| genre | string | true |
| id_user | string | true |
| URL | string | true |
| Likes | array[] | false |
| image | string | false |
| date | date | true |

### Playlist

### Playlist schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| Name | string | true |
| Music | array[ObjectId] | true |
| id_user | string | true |

### Music album

### Music album schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| Name | string | true |
| genre | string | true |
| Music | array[ObjectId] | true |
| id_user | string | true |

### Events

### Events schema

| Key | Type |  Required |
| :-------- | :------- | :------------------------- |
| Title | string | true |
| Text | string | true |
| id_user | string | true |
| date | date | true |
| image | string | false |