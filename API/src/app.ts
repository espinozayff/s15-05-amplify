import express, { Request, Response, NextFunction } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerSpec from './swagger';
import apiRouter from './routes/index.router';
import { errorHandler } from './middleware/ErrorHandler';
import { httpResponse } from './utils/EnumsError';

const app = express();
const HttpResponse = new httpResponse();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/example', async (req: Request, res: Response, next: NextFunction) => {
    try {
      return HttpResponse.NotFound(res, 'No existe ningun dato');
    } catch (error) {
      return HttpResponse.NotFound(res, error);
    }
  }
  );
  app.use(errorHandler);
  
  app.use(express.json())
  
  app.use(express.urlencoded({extended: true}))

app.use('/', apiRouter);

export default app;