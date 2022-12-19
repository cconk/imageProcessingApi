import express from 'express';
import ImageUtilities from '../../utilities/utilities';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  res.send('base images url');
  console.log(req.params);
});

images.get('/:filename', async (req: express.Request, res: express.Response): Promise<void> => {
  console.log(ImageUtilities.buildFilePath(req.params.filename));
  res.sendFile(ImageUtilities.buildFilePath(req.params.filename));
});

export default images;
