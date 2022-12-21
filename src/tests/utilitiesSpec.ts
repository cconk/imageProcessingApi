import ImageUtilities from "../utilities/utilities"

describe('utilities tests', () => {
  it('should return a string', () => {
    const string = ImageUtilities.buildFilePath('test');
    expect(string).toContain('');
  })
})