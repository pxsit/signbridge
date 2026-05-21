import fs from 'fs';
import path from 'path';

// 1x1 transparent pixel GIF base64
const BLANK_GIF_BASE64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const gifBuffer = Buffer.from(BLANK_GIF_BASE64, 'base64');

// Directory paths
const gifsDir = path.resolve('public', 'gifs');

// Create directory if not exists
if (!fs.existsSync(gifsDir)) {
  fs.mkdirSync(gifsDir, { recursive: true });
  console.log(`Created directory: ${gifsDir}`);
}

// List of words matching signs.ts
const words = [
  'Hello',
  'Bye',
  'Please',
  'Sorry',
  'Yes',
  'No',
  'More',
  'Finished',
  'Eat',
  'Drink Water',
  'Sleep',
  'Wake Up',
  'Brush Teeth',
  'Wash Hands',
  'Go to School',
  'Come Home',
  'Happy',
  'Sad',
  'Angry',
  'Scared',
  'Excited',
  'Tired',
  'Love',
  'Proud',
  'Mum',
  'Dad',
  'Sister',
  'Brother',
  'Friend',
  'Teacher',
  'Baby',
  'Grandparent',
  'Book',
  'Play',
  'Help',
  'Sit',
  'Stand',
  'Listen',
  'Good Job',
  'Thank You',
];

words.forEach((word) => {
  const filename =
    word
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '.gif';
  const filePath = path.join(gifsDir, filename);

  fs.writeFileSync(filePath, gifBuffer);
  console.log(`Generated blank GIF: public/gifs/${filename}`);
});

console.log('Successfully generated all blank GIFs!');
