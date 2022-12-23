import * as fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const imagesPath = path.resolve(__dirname, '../../images/normal');
export const thumbImagesPath = path.resolve(__dirname, '../../images/thumbs');
export const fileExtension = '.jpg';

export default class ImageUtilities {
  //check filename to ensure it is valid and matches available image files
  static checkValidFilename(filename: string | undefined): boolean {
    const availableImageFilenames: string[] = [];
    if (!filename) {
      return false;
    } else {
      fs.readdirSync(imagesPath).forEach((file) => {
        const filenameWithoutTypeExt = file.substring(0, file.indexOf('.'));
        availableImageFilenames.push(filenameWithoutTypeExt);
      });
      return availableImageFilenames.includes(filename);
    }
  }

  //check if parameter enteried is a valid number
  static checkValidNumber(parameter: string | undefined): boolean {
    return Number(parameter) > 0;
  }

  //seting up as a function so additional file types png gif etc. might be used in the future
  static buildFilePath(filename?: string): string {
    return `${imagesPath}\\${filename}${fileExtension}`;
  }

  //builds the thumb file path to send to the route
  static buildThumbFilePath(
    filename?: string,
    height?: string,
    width?: string
  ): string {
    const newFileName: string | undefined =
      filename && height && width ? filename + height + width : undefined;
    return `${thumbImagesPath}\\${newFileName}${fileExtension}`;
  }

  //creates the new thumb file if it does not already exist
  static async buildThumbFile(
    filename?: string,
    height?: string,
    width?: string
  ): Promise<string> {
    const thumbPath = this.buildThumbFilePath(filename, height, width);
    const path = this.buildFilePath(filename);
    await sharp(path)
      .resize(Number(height), Number(width))
      .toFile(thumbPath, () => {
        return;
      });
    return `Your image file called ${filename} was resized to a height of ${height} and a width of ${width}.`;
  }

  //checks to see if the file already exists
  static checkForThumbFile(
    filename?: string,
    height?: string,
    width?: string
  ): boolean {
    const thumbPath = this.buildThumbFilePath(filename, height, width);
    try {
      fs.accessSync(thumbPath);
      return true;
    } catch {
      return false;
    }
  }
}
