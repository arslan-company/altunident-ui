/**
 * @param {string} fileName
 * @param {string[]} extensions - example: ['.png', '.jpg', '.jpeg']...
*/
export default function isValidFileName(fileName, extensions) {
  if (!fileName && typeof fileName !== 'string') return false;

  return extensions.some((extension) => fileName.includes(extension));
}
