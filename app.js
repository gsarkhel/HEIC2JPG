const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const files = fs.readdirSync(path.resolve('./src'));
files.forEach((item) => {
    convertAll(item);
});

function convertAll(file) {
    const destFile = file.replace('.heic','.jpg');
    (async () => {
        const inputBuffer = await promisify(fs.readFile)(`./src/${file}`);
        const outputBuffer = await convert({
            buffer: inputBuffer, // the HEIC file buffer
            format: 'JPEG',      // output format
            quality: 0.95           // the jpeg compression quality, between 0 and 1
        });

        await promisify(fs.writeFile)(`./dest/${destFile}`, outputBuffer);
    })();
}