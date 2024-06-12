import { Router } from "express";
import {
    create,
    login,
    logout,
    read,
    readOne,
    update,
    destroy,
    like,
} from "../controllers/user.controller";

import { verifyToken, destroyToken } from "../middleware/auth";

const usersRouter = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints relacionados con usuarios
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario.
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades del cuerpo de la solicitud para crear un usuario
 *     responses:
 *       200:
 *         description: Usuario creado con éxito.
 */
usersRouter.post("/", create);

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Inicia sesión con las credenciales proporcionadas.
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Propiedades del cuerpo de la solicitud para iniciar sesión
 *     responses:
 *       200:
 *         description: Sesión iniciada con éxito.
 */
usersRouter.post("/login", login);

/**
 * @swagger
 * /api/v1/users/logout:
 *   post:
 *     summary: Cerrar sesión
 *     description: Cierra la sesión actual.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Sesión cerrada con éxito.
 */
usersRouter.post("/logout", destroyToken, logout);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Obtiene una lista de todos los usuarios.
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Lista de usuarios recuperada con éxito.
 */
usersRouter.get("/", verifyToken, read);

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     description: Obtiene un usuario específico mediante su ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario recuperado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 */
usersRouter.get("/:uid", readOne);

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     description: Actualiza un usuario existente utilizando su ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito.
 *       404:
 *         description: Usuario no encontrado.
 */
usersRouter.put("/:uid", update);

/**
 * @swagger
 * /api/v1/users/{uid}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario utilizando su ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado con éxito.
 */
usersRouter.delete("/:uid", destroy);

/**
 * @swagger
 * /api/v1/users/likes/{tid}:
 *   put:
 *     summary: Dar me gusta a una pista
 *     description: Da me gusta a una pista de audio específica utilizando su ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: tid
 *         required: true
 *         description: ID de la pista a la que se le dará me gusta.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Me gusta añadido con éxito.
 *       404:
 *         description: Pista no encontrada.
 */
usersRouter.put("/likes/:tid", verifyToken, like);

export default usersRouter;
