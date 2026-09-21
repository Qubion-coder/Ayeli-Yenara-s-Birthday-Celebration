import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dirs = ['public', 'public/pre'];

async function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) continue;
    
    if (fullPath.match(/\.(png|jpe?g)$/i)) {
      console.log(`Processing ${fullPath}`);
      const tempPath = fullPath + '.tmp';
      try {
         await sharp(fullPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .jpeg({ quality: 75, force: false })
          .png({ quality: 75, force: false })
          .toFile(tempPath);
         fs.renameSync(tempPath, fullPath);
      } catch (e) {
         console.error(`Failed ${fullPath}`, e);
      }
    }
  }
}

for (const dir of dirs) {
  await processDir(dir);
}
console.log('Done!');
