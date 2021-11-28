import chai from 'chai';
import ArrayUtils from '../src/utils/arrayUtils.js';

const { expect } = chai;

describe('ArrayUtils', function() {
  describe('arrayChunks', function() {
    const inputArray = [1,2,3,4,5];
    const expectedOutput = [[1,2], [3, 4], [5]];
    const chunkSize = 2;
    const actualOutput = ArrayUtils.arrayChunks(inputArray, 2);
    const expectedChunks = Math.ceil(inputArray.length / chunkSize);
    it('should return chunks of array', () => {
      expect(actualOutput).to.eql(expectedOutput);
    });
    it(`should return ${expectedChunks} chunks of array`, () => {
      expect(actualOutput.length).to.be.equal(expectedChunks);
    });
    it(`should return same array nested on execution with chunk size greater than array size`, () => {
      expect(ArrayUtils.arrayChunks(inputArray, inputArray.length + 1)).to.eql([inputArray]);
    })
  });
});
