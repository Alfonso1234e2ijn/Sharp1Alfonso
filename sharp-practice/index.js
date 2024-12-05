import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const carpetaEntrada = 'images/';
const carpetaSortida = 'nouImages/';

function processarImatgesCarpeta(carpetaEntrada, carpetaSortida) {
  if (!fs.existsSync(carpetaSortida)) {
    fs.mkdirSync(carpetaSortida);
  }

  fs.readdirSync(carpetaEntrada).forEach((fitxer) => {
    const fitxerEntrada = path.join(carpetaEntrada, fitxer);
    
    if (fitxerEntrada.match(/\.(jpg|jpeg|png)$/)) {
      sharp(fitxerEntrada)
        .resize(150, 150)
        .toFormat('webp', { quality: 80 })
        .composite([{
          input: 'images/narutoWatermark.png',
          gravity: 'southeast',
        }])
        .toFile(path.join(carpetaSortida, fitxer.replace(path.extname(fitxer), '-thumbnail-watermarked.webp')), (err, info) => {
          if (err) {
            console.log(`Error processant la miniatura de ${fitxer}:`, err);
          } else {
            console.log(`Miniatura en WebP amb marca d’aigua processada per ${fitxer}!`);
          }
        });

      sharp(fitxerEntrada)
        .resize(800, 600)
        .toFormat('webp', { quality: 80 })
        .composite([{
          input: 'images/narutoWatermark.png',
          gravity: 'northwest',
        }])
        .toFile(path.join(carpetaSortida, fitxer.replace(path.extname(fitxer), '-medium-watermarked.webp')), (err, info) => {
          if (err) {
            console.log(`Error processant la mida mitjana de ${fitxer}:`, err);
          } else {
            console.log(`Mida mitjana en WebP amb marca d’aigua processada per ${fitxer}!`);
          }
        });

      sharp(fitxerEntrada)
        .toFormat('avif', { quality: 50 })
        .composite([{
          input: 'images/narutoWatermark.png',
          gravity: 'center',
        }])
        .toFile(path.join(carpetaSortida, fitxer.replace(path.extname(fitxer), '-full-watermarked.avif')), (err, info) => {
          if (err) {
            console.log(`Error processant la mida completa de ${fitxer}:`, err);
          } else {
            console.log(`Mida completa en AVIF amb marca d’aigua processada per ${fitxer}!`);
          }
        });
    }
  });
}

processarImatgesCarpeta(carpetaEntrada, carpetaSortida);
