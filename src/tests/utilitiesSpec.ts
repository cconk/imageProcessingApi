import ImageUtilities from '../utilities/utilities';
import {
  imagesPath,
  thumbImagesPath,
  fileExtension,
} from '../utilities/utilities';

describe('utilities tests', () => {
  it('should return valid check for file names in project', () => {
    const filename = 'fjord';
    expect(ImageUtilities.checkValidFilename(filename)).toBeTruthy;
    const filename2 = 'test';
    expect(ImageUtilities.checkValidFilename(filename2)).toBeFalsy;
  });

  it('should check parameters are valid numbers', () => {
    expect(ImageUtilities.checkValidNumber('1')).toBeTruthy;
    expect(ImageUtilities.checkValidNumber('-1')).toBeFalsy;
    expect(ImageUtilities.checkValidNumber('a1')).toBeFalsy;
  });

  it('should return a path to a normal image named normal to be processed by api', () => {
    const string = ImageUtilities.buildFilePath('normal');
    expect(string).toBe(`${imagesPath}\\normal${fileExtension}`);
  });

  it('should return a path to a thumb image named thumb200200.jpg', () => {
    const string = ImageUtilities.buildThumbFilePath('thumb', '200', '200');
    expect(string).toBe(`${thumbImagesPath}\\thumb200200${fileExtension}`);
  });

  it('should complete processing a file', async () => {
    await expectAsync(
      ImageUtilities.buildThumbFile('testImage', '200', '200')
    ).toBeResolved();
  });

  it('should complete processing a file and return a message', async () => {
    const processingMessage: string = await ImageUtilities.buildThumbFile(
      'testImage',
      '200',
      '200'
    );
    expect(processingMessage).toEqual(
      `Your image file called testImage was resized to a height of 200 and a width of 200.`
    );
  });

  it('should return false', () => {
    expect(ImageUtilities.checkForThumbFile()).toBeFalsy;
  });
});
