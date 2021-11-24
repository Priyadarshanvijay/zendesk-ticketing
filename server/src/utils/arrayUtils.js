const arrayChunks = (array = [], chunkSize = 1) => Array(Math.ceil(array.length / chunkSize))
  .fill()
  .map((_, index) => index * chunkSize)
  .map(begin => array.slice(begin, begin + chunkSize));

export default {
  arrayChunks
};
