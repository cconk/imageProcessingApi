import express from 'express';
import images from './api/images';

const routes: express.Router = express.Router();

routes.get('/', (req: express.Request, res:express.Response): void => {
    res.send('<h1>Welcome to the image processing api</h1>');
  }
);

routes.use('/api/images', images);

export default routes;