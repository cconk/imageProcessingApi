import express from 'express';
import ImageUtilities from '../../utilities/utilities';

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response) => {
  res.send('base images url');
  console.log(req.params);
});

images.get('/testing', async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename?.toString();
  const height = req.query.height?.toString();
  const width = req.query.width?.toString();
  //check for query params
  if (!filename || !height || !width) {
    res.send('Please enter all necessary parameters for your file to be diplayed including filename, height and width.')
  } else {
    //check to see if file exists
    const thumbFileCheck = await ImageUtilities.checkForThumbFile(filename).then((value) => {
      return value;
    });
    if (!thumbFileCheck) {
      //if no file exists then create it based on imaged given and return it to browser compensating for processing delay
      await ImageUtilities.buildThumbFile(filename, Number(height), Number(width)).then(() => {
        res.setTimeout(4000, () => {
          res.sendFile(ImageUtilities.buildThumbFilePath(filename));
        });
      });
    } else {
        //if file is cached return it with no processing delay
        res.sendFile(ImageUtilities.buildThumbFilePath(filename));
    }
  }
});

export default images;
