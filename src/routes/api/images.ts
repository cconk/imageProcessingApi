import express from 'express';
import ImageUtilities from '../../utilities/utilities';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  // res.send(`<p>You can use this api to process images by supplying the query parameters to the following path. For Example
  //   /api/images/process?filename=sampleFile&height=200&width=200 will return a file resized to the height and width parameters given
  //   and with a filename of sampleFile.</p>`);
  const filename = req.query.filename?.toString();
  const height = req.query.height?.toString();
  const width = req.query.width?.toString();
  //check for query params
  const validFilename = ImageUtilities.checkValidFilename(filename);
  const validHeight = ImageUtilities.checkValidNumber(height);
  const validWidth = ImageUtilities.checkValidNumber(width);
  if (!validFilename) {
    res.send(
      `Please enter all necessary parameters for your file to be diplayed including filename, height and width. Acceptable image filenames include:
        encenadaport, fjord, icelandwaterfall, palmtunnel, and santamonica. If you would like to use another image file please manually add it to the images
        folder in this project.`
    );
  } else if (!validHeight) {
    res.send(
      'Please enter a valid height parameter. The height parameter is require to be a number greater than 0.'
    );
  } else if (!validWidth) {
    res.send(
      'Please enter a valid width parameter. The width parameter is require to be a number greater than 0.'
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
      await ImageUtilities.buildThumbFile(filename, height, width).then(() => {
        res.setTimeout(4000, () => {
          res.sendFile(
            ImageUtilities.buildThumbFilePath(filename, height, width)
          );
        });
      });
    } else {
      //if file is cached return it with no processing delay
      res.sendFile(ImageUtilities.buildThumbFilePath(filename, height, width));
    }
  }
});

export default images;
