import swaggerJSDoc from 'swagger-jsdoc';
import express from 'express';

const app = express();

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Amplify API',
            version: '1.0.0',
            description: 'API endpoints Documentation'
        },
    },
    apis: ['src/routes/*.ts', 'src/routes/users.router.ts'], // Rutas a los archivos donde están definidas las rutas de Express
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
