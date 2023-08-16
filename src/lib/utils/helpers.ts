export const getFileExtention = (filename: string) => {
    return filename.split('.').pop() || '';
}

export const removeFileExtension = (filename: string) => {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex !== -1) {
        return filename.substring(0, lastDotIndex);
    }
    return filename;
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

export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

export const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
}

export const escapeFileName = (fileName: string) => {
    // Replace any characters that are not alphanumeric, underscore, or hyphen with an empty string
    return fileName.replace(/[^\w-]/g, '');
}

export const toTitleCase = (input: string): string => {
    return input
        .split(/\s+/)
        .map(word => {
            if (word.match(/^[A-Z]+$/)) { // Handle acronyms
                return word;
            } else {
                const firstChar = word.charAt(0).toUpperCase();
                const rest = word.slice(1).toLowerCase();
                return firstChar + rest;
            }
        })
        .join(' ');
}