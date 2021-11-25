const arrayChunks = (chunkSize = 1) => (array = []) => Array(Math.ceil(array.length / chunkSize))
  .fill()
  .map((_, index) => index * chunkSize)
  .map(begin => array.slice(begin, begin + chunkSize));

export default {
  arrayChunks
};
