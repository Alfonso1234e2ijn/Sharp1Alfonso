Tasca 1: Redimensionar imatges, per fer-ho he agafat el codi original (a sota d'aquesta frase) i l'he anat copiant per a cada redimensió canvaint a més a més dels missatges el resize:

sharp(inputFile)
  .resize(150, 150)
  .toFile('output/example-thumbnail.jpg')
  .then(() => console.log('Miniatura processada!'))
  .catch(err => console.error('Error processant la miniatura:', err));

Tasca 2: Convertir formats i Tasca 3: Compressió, per fer-ho he fet servir la opcio .toFormat, amb aquesta opció podem assignar el nou format i en el cas de voler inclós la qualitat:

sharp(inputFile)
    .resize(800, 600)
    .toFormat('webp', { quality: 80 }) --> Opció per formatar
    .toFile('output/example-medium.webp')
    .then(() => console.log('Mida mitjana en WebP processada!'))
    .catch((err) =>
      console.error('Error processant la mida mitjana en WebP:', err)
    );

Tasca 4: Afegir marques d’aigua, per fer-ho hem fet servir la opcio composite a la qual l'hi pasem els parametres input(imatge per a la marca d'aigua) i el parametre gravity que ens servira per dir-li on volem que estigui la marca d'aigua:

.composite([
      {
        input: fitxerMarcaAigua,
        gravity: 'southeast', // Posició de la marca d’aigua
      },
    ])

Tasca 5: Processar diverses imatges automàticament, per fer-ho he fet servir els imports filesystem y path per tal d'accedir a la ruta, a més a més per fer-ho he fet servir les opcions que venen integrades amb fs com ara existSync o mkdirSync entre d'altres:

exemple:

if (!fs.existsSync(carpetaSortida)) {
    fs.mkdirSync(carpetaSortida);
  }

  fs.readdirSync(carpetaEntrada).forEach((fitxer) => {
    const fitxerEntrada = path.join(carpetaEntrada, fitxer);...})