import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src', 'data', 'signs.ts');
const content = fs.readFileSync(filePath, 'utf8');

const updatedContent = content.replace(
  /word:\s*'([^']+)',\s*category:\s*'[^']+',\s*gifUrl:\s*null/g,
  (match, word) => {
    const filename =
      word
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + '.gif';
    return match.replace('gifUrl: null', `gifUrl: '/signbridge/gifs/${filename}'`);
  }
);

fs.writeFileSync(filePath, updatedContent, 'utf8');
console.log('Successfully updated signs.ts with gifUrl paths!');
