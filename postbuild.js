import fs from 'fs/promises';

const sourceFilePath = './src/package-dist.json';
const destinationFilePath = './dist/package.json';

await fs.copyFile(sourceFilePath, destinationFilePath)
