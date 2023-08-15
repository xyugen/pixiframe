import sharp from 'sharp';

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
    // Define compression options
    const compressionOptions = {
        quality: quality, // Adjust the quality as needed (0-100)
    };

    const compressedImageBuffer = await sharp(file)
        .jpeg(compressionOptions)
        .toBuffer();
        
    return compressedImageBuffer
}

async function compressPng(file: ArrayBuffer, compressionLevel: number): Promise<Buffer> {
    // Define compression options
    const compressionOptions = {
        compressionLevel: compressionLevel, // Adjust the quality as needed [0(fastest, larger)-9(slowest, smallest)]
    };

    const compressedImageBuffer = await sharp(file)
        .png(compressionOptions)
        .toBuffer();

    return compressedImageBuffer;
}

async function compressGif(file: ArrayBuffer): Promise<Buffer> {
    const compressedImageBuffer = await sharp(file)
        .gif()
        .toBuffer();

    return compressedImageBuffer;
}