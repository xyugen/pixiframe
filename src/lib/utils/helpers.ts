export const getFileExtention = (filename: string) => {
    return filename.split('.').pop() || '';
}

export const getFileMimeType = (extension: string) => {
    const mimeTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        // Add more mappings as needed
    };

    return mimeTypes[extension.toLowerCase()] || 'application/octet-stream';
}
