import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
const images = express.Router();
const imagesPath = path.resolve(__dirname, '../../../images');

images.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  res.send('base images url');
  console.log(imagesPath);
  console.log(req.params);
});

images.get('/:filename', async (req: express.Request, res: express.Response): Promise<void> => {
  console.log(imagesPath);
  console.log(req.params.filename);
  res.sendFile(imagesPath+`/${req.params.filename}`);
});

export default images;
