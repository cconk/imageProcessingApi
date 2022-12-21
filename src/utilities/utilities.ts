import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const imagesPath = path.resolve(__dirname, '../../images/normal');
const thumbImagesPath = path.resolve(__dirname, '../../images/thumbs')
const fileExtension = '.jpg'

export default class ImageUtilities {

  //seting up as a function so additional file types png gif etc. might be used in the future
  static buildFilePath(filename?: string): string {
    return `${ imagesPath }\\${filename}${fileExtension}`;
  }

  //builds the thumb file path to send to the route
  static buildThumbFilePath(filename?: string): string {
    return `${thumbImagesPath}\\${filename}${fileExtension}`;
  }

  //creates the new thumb file if it does not already exist
  static async buildThumbFile(filename?: string, height?: number, width?: number) {
    const thumbPath = this.buildThumbFilePath(filename);
    const path = this.buildFilePath(filename);
    await sharp(path).resize(height, width).toFile(thumbPath, (err: any, info: any) => {
      return;
    });
  }

  //checks to see if the file already exists
  static async checkForThumbFile(filename?: string): Promise<boolean> {
    const thumbPath = this.buildThumbFilePath(filename);
    try {
      await fs.access(thumbPath) 
        return true;
    } catch {
        return false;
    }
  }
}