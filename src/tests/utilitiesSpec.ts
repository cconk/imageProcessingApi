import ImageUtilities from "../utilities/utilities";
import { imagesPath, thumbImagesPath, fileExtension  } from "../utilities/utilities";



describe('utilities tests', () => {
  
  it('should return a path to a normal image named normal', () => {
    const string = ImageUtilities.buildFilePath('normal');
    expect(string).toBe(`${ imagesPath }\\normal${ fileExtension }`);
  });

  it('should return a path to a thumb image named thumb', () => {
    const string = ImageUtilities.buildThumbFilePath('thumb');
    expect(string).toBe(`${ thumbImagesPath }\\thumb${ fileExtension }`);
  });

  it('should complete processing a file', async () => {
    await expectAsync(ImageUtilities.buildThumbFile('testImage', 200, 200)).toBeResolved();
  });

  it('should complete processing a file and return a message', async () => {
    const processingMessage: string = await ImageUtilities.buildThumbFile('testImage', 200, 200);
    expect(processingMessage).toEqual(`Your image file called testImage was resized to a height of 200 and a width of 200.`);
  });

  it('should return false', async () => {
    await expectAsync(ImageUtilities.checkForThumbFile()).toBeResolvedTo(false);
  });

})