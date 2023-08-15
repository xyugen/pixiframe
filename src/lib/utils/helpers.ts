export const getFileExtention = (filename: string) => {
    return filename.split('.').pop() || '';
}