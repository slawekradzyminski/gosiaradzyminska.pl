const fs = require('fs');
const sharp = require('sharp');
const path = require('path');

const directoryPath = path.join(__dirname, '');
const outputDirectory = path.join(directoryPath, 'optimized');

// Create the output directory if it does not exist
if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log('Error getting directory information.', err);
    return;
  }

  files.forEach(file => {
    if (!file.match(/\.(jpg|jpeg|png)$/i)) {
      console.log('Skipping non-image file:', file);
      return;
    }

    const filePath = path.join(directoryPath, file);
    const outputFilePath = path.join(outputDirectory, file);

    sharp(filePath)
      .resize(1920, 1080, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .jpeg({ quality: 80 })
      .toFile(outputFilePath)
      .then(() => {
        console.log(`${file} has been processed and saved as ${outputFilePath}`);
      })
      .catch(err => {
        console.log('Error processing file:', file, err);
      });
  });
});