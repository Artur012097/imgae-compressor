const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// height ete chka, praporcianer@ pahpanum a

let image,
    transform = (format, quality, width, height = null) => {
        fs.readdir('./input', (err, files) => {
            for (let file of files) {
                image = sharp(path.join(__dirname, 'input', path.basename(file)));
                image.metadata((e, meta) => console.info(meta));
                image.withMetadata()
                    .resize({width, height})[format]({quality})
                    .toFile(`./output/${path.parse(file).name}.${format}`)
                    .then((info) => console.info(info))
                    .catch((err) => console.error(err));
            }
        });
    }

const format = ['jpeg', 'png', 'webp', 'tiff', 'avif', 'heif'];

transform(format[1], quality = 100, width = 1366);