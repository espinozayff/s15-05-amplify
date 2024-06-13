import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /api/v1/example:
 *   get:
 *     summary: Example endpoint
 *     description: This is an example endpoint
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get('/api/v1/example', (req, res) => {
  res.send('Hello, this is an example route!');
});

export default router;
