import express from 'express';
import ImageUtilities from '../../utilities/utilities';

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response) => {
  res.send(`<p>You can use this api to process images by supplying the query parameters to the following path. For Example
    /api/images/process?filename=sampleFile&height=200&width=200 will return a file resized to the height and width parameters given
    and with a filename of sampleFile.</p>`);
});

images.get('/process', async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename?.toString();
  const height = req.query.height?.toString();
  const width = req.query.width?.toString();
  //check for query params
  if (!filename || !height || !width) {
    res.send(
      'Please enter all necessary parameters for your file to be diplayed including filename, height and width.'
    );
  } else {
    //check to see if file exists
    const thumbFileCheck = await ImageUtilities.checkForThumbFile(
      filename
    ).then((value) => {
      return value;
    });
    if (!thumbFileCheck) {
      //if no file exists then create it based on imaged given and return it to browser compensating for processing delay
      await ImageUtilities.buildThumbFile(
        filename,
        Number(height),
        Number(width)
      ).then(() => {
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
