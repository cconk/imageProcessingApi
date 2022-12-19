import { promises as fs } from 'fs';
import path from 'path';

const imagesPath = path.resolve(__dirname, '../../images');
const fileExtension = '.jpg'

export default class ImageUtilities {

  //seting up as a function so additional file types png gif etc. might be used in the future
  static buildFilePath(filename: string): string {
    return `${ imagesPath }\\${filename}${fileExtension}`;
  }
}