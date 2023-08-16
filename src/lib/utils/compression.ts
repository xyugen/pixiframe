import pkg from 'jimp';
const { read } = pkg;

export async function compressImage(file: ArrayBuffer, fileExtension: string): Promise<Buffer> {
    switch (fileExtension.toLowerCase()) {
        case 'jpeg':
        case 'jpg':
            return compressJpeg(file, 80);
        case 'png':
            return compressPng(file, 9);
        case 'gif':
            return compressGif(file);
        default:
            throw new Error(`Unsupported file extension: ${fileExtension}`);
    }
}

async function compressJpeg(file: ArrayBuffer, quality: number): Promise<Buffer> {
    const image = await read(Buffer.from(file));
    image.quality(quality);

    return image.getBufferAsync(image.getMIME());
}

async function compressPng(file: ArrayBuffer, compressionLevel: number): Promise<Buffer> {
    const image = await read(Buffer.from(file));
    image.deflateLevel(compressionLevel);

    return image.getBufferAsync(image.getMIME());
}

async function compressGif(file: ArrayBuffer): Promise<Buffer> {
    const image = await read(Buffer.from(file));
    return image.getBufferAsync(image.getMIME());
}