import crypto from 'crypto';
import * as url from 'url';
import fs from 'fs';
import sharp from 'sharp';
const dirname = url.fileURLToPath(new URL('.', import.meta.url));
export function createRandomName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
}
export function resizeImage(buffer, height, width) {
    const resizedBuffer = sharp(buffer).resize({
        height,
        width,
    }).toBuffer();
    return resizedBuffer;
}
export async function getExtension(buffer) {
    try {
        const extension = await sharp(buffer).metadata().then((metadata) => metadata.format);
        return extension;
    }
    catch (error) {
        throw new Error('Could not get extension');
    }
}
export async function writeFile(buffer) {
    try {
        const extension = await getExtension(buffer);
        const name = createRandomName();
        const relativePath = `/images/${name}.${extension}`;
        fs.writeFileSync(`${dirname}/../../public/images/${name}.${extension}`, buffer);
        return { relativePath, name };
    }
    catch (error) {
        throw new Error('Could not write file');
    }
}
export async function saveImageOnServer({ buffer, height, width }) {
    if (height && width) {
        const resizedBuffer = await resizeImage(buffer, height, width);
        const { relativePath, name } = await writeFile(resizedBuffer);
        return { relativePath, name };
    }
    const { relativePath, name } = await writeFile(buffer);
    return { relativePath, name };
}
export async function deleteImageFromServer(relativePath) {
    try {
        fs.rmSync(`${dirname}/../../public${relativePath}`);
    }
    catch (error) {
        console.log(error);
        throw new Error('Could not delete file');
    }
}
